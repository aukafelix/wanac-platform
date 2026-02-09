/**
 * Jitsi JWT Token Generation API
 *
 * POST /api/jitsi/generate-token
 *
 * Generates JWT tokens for authenticated users to join Jitsi meetings.
 * Uses JITSI_API_KEY (or JAAS_APP_ID) as the JaaS App ID when using JaaS.
 *
 * Env: JITSI_API_KEY or JAAS_APP_ID, and for JaaS: JAAS_PRIVATE_KEY, JAAS_KID.
 * Optional: JITSI_AUTH_TYPE=jaas | self-hosted (default: jaas if JAAS_* set, else self-hosted if secret set).
 */

import { NextResponse } from "next/server";

function getJwtSigner() {
  try {
    return require("jsonwebtoken");
  } catch (e) {
    return null;
  }
}

/**
 * Build JaaS (8x8) JWT payload per https://developer.8x8.com/jaas/docs/api-keys-jwt
 */
function buildJaaSPayload({
  roomName,
  userId,
  userName,
  userEmail,
  userAvatar,
  moderator,
  expiresIn,
}) {
  const now = Math.floor(Date.now() / 1000);

  return {
    aud: "jitsi",
    iss: "chat",
    sub: process.env.JAAS_APP_ID || process.env.JITSI_API_KEY,
    room: roomName || "*",
    exp: now + (expiresIn || 7200),
    nbf: now,
    context: {
      user: {
        id: userId,
        name: userName,
        email: userEmail || "",
        avatar: userAvatar || "",
        moderator: moderator ? "true" : "false",
      },
      features: {
        livestreaming: false,
        "outbound-call": false,
        transcription: false,
        recording: false,
      },
      room: { regex: false },
    },
  };
}

/**
 * Build self-hosted Jitsi JWT payload (HS256)
 */
function buildSelfHostedPayload({
  roomName,
  userId,
  userName,
  userEmail,
  moderator,
  expiresIn,
}) {
  const now = Math.floor(Date.now() / 1000);
  return {
    aud: "jitsi",
    iss: process.env.JITSI_APP_ID || process.env.JITSI_API_KEY,
    sub: process.env.JITSI_APP_ID || process.env.JITSI_API_KEY,
    room: roomName || "*",
    exp: now + (expiresIn || 7200),
    nbf: now,
    context: {
      user: {
        id: userId,
        name: userName,
        email: userEmail || "",
        moderator: moderator ? "true" : "false",
      },
    },
  };
}

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      roomName,
      userId,
      userName,
      userEmail = "",
      userAvatar = "",
      moderator = false,
      expiresIn = 7200,
    } = body;

    if (!roomName || !userId || !userName) {
      return NextResponse.json(
        {
          error: "Missing required fields",
          required: ["roomName", "userId", "userName"],
        },
        { status: 400 },
      );
    }

    const jwt = getJwtSigner();
    if (!jwt) {
      return NextResponse.json(
        {
          error: "JWT signing not available",
          message: "Install jsonwebtoken: npm install jsonwebtoken",
        },
        { status: 503 },
      );
    }

    const appId = process.env.JAAS_APP_ID || process.env.JITSI_API_KEY;
    const jaasPrivateKey = process.env.JAAS_PRIVATE_KEY;
    const jaasKid = process.env.JAAS_KID;
    const selfHostedSecret =
      process.env.JITSI_APP_SECRET || process.env.JITSI_API_KEY;
    const authType =
      process.env.JITSI_AUTH_TYPE ||
      (jaasPrivateKey && jaasKid
        ? "jaas"
        : selfHostedSecret
          ? "self-hosted"
          : "none");

    let token;

    if (authType === "jaas") {
      if (!appId) {
        return NextResponse.json(
          {
            error: "JaaS not configured",
            message:
              "Set JITSI_API_KEY or JAAS_APP_ID (your Jitsi/8x8 App ID).",
          },
          { status: 503 },
        );
      }
      if (!jaasPrivateKey || !jaasKid) {
        return NextResponse.json(
          {
            error: "JaaS signing not configured",
            message:
              "Set JAAS_PRIVATE_KEY (PEM) and JAAS_KID (key id from 8x8 dashboard).",
          },
          { status: 503 },
        );
      }
      const payload = buildJaaSPayload({
        roomName,
        userId,
        userName,
        userEmail,
        userAvatar,
        moderator,
        expiresIn,
      });
      token = jwt.sign(payload, jaasPrivateKey.replace(/\\n/g, "\n"), {
        algorithm: "RS256",
        header: { kid: jaasKid },
      });
    } else if (authType === "self-hosted") {
      if (!selfHostedSecret) {
        return NextResponse.json(
          {
            error: "Self-hosted Jitsi not configured",
            message: "Set JITSI_APP_SECRET or JITSI_API_KEY.",
          },
          { status: 503 },
        );
      }
      const payload = buildSelfHostedPayload({
        roomName,
        userId,
        userName,
        userEmail,
        moderator,
        expiresIn,
      });
      token = jwt.sign(payload, selfHostedSecret, { algorithm: "HS256" });
    } else {
      return NextResponse.json(
        {
          error: "JWT authentication not configured",
          message:
            'Set JITSI_API_KEY (App ID or secret). For JaaS also set JAAS_PRIVATE_KEY and JAAS_KID. Optionally set JITSI_AUTH_TYPE to "jaas" or "self-hosted".',
        },
        { status: 503 },
      );
    }

    return NextResponse.json({
      token,
      expiresAt: new Date(
        Date.now() + (expiresIn || 7200) * 1000,
      ).toISOString(),
      authType,
    });
  } catch (error) {
    console.error("Error in Jitsi JWT generation:", error);
    return NextResponse.json(
      { error: "Failed to generate JWT token", message: error.message },
      { status: 500 },
    );
  }
}

export async function GET() {
  const appId = process.env.JAAS_APP_ID || process.env.JITSI_API_KEY;
  const hasJaaS = appId && process.env.JAAS_PRIVATE_KEY && process.env.JAAS_KID;
  const hasSelfHosted =
    (process.env.JITSI_APP_SECRET || process.env.JITSI_API_KEY) &&
    (process.env.JITSI_APP_ID || process.env.JITSI_API_KEY);

  return NextResponse.json({
    endpoint: "/api/jitsi/generate-token",
    method: "POST",
    description: "Generate JWT tokens for Jitsi Meet authentication",
    configured: hasJaaS || hasSelfHosted,
    authType:
      process.env.JITSI_AUTH_TYPE ||
      (hasJaaS ? "jaas" : hasSelfHosted ? "self-hosted" : "none"),
    requiredBody: {
      roomName: "string (required)",
      userId: "string (required)",
      userName: "string (required)",
      userEmail: "string (optional)",
      userAvatar: "string (optional)",
      moderator: "boolean (optional)",
      expiresIn: "number (optional, default 7200)",
    },
    example: {
      roomName: "wanac-session-123",
      userId: "user-456",
      userName: "Jane Doe",
      userEmail: "jane@example.com",
      moderator: false,
      expiresIn: 3600,
    },
  });
}
