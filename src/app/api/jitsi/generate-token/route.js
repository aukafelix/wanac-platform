/**
 * Jitsi JWT Token Generation API
 * 
 * POST /api/jitsi/generate-token
 * 
 * Generates JWT tokens for authenticated users to join Jitsi meetings.
 * 
 * Supports two options:
 * 1. JaaS (Jitsi as a Service) - Managed by 8x8, uses RS256
 * 2. Self-Hosted Jitsi - Your own server, uses HS256
 * 
 * Set JITSI_AUTH_TYPE environment variable to 'jaas' or 'self-hosted'
 */

import { NextResponse } from 'next/server';

// NOTE: These imports will fail until you install jsonwebtoken
// Run: npm install jsonwebtoken
// Uncomment when you're ready to use JWT authentication
// const jaasService = require('../../../../services/jitsi-jaas.service');
// const selfHostedService = require('../../../../services/jitsi-jwt.service');

export async function POST(request) {
  try {
    const body = await request.json();
    const { 
      roomName, 
      userId, 
      userName, 
      userEmail = '',
      userAvatar = '',
      moderator = false,
      expiresIn = 7200, // 2 hours
    } = body;

    // Validate required fields
    if (!roomName || !userId || !userName) {
      return NextResponse.json(
        { 
          error: 'Missing required fields',
          required: ['roomName', 'userId', 'userName'],
        },
        { status: 400 }
      );
    }

    // TODO: Add authentication middleware
    // You should verify that the request is coming from an authenticated user
    // Example:
    // const session = await getServerSession(authOptions);
    // if (!session) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    // TODO: Add authorization check
    // Verify the user has permission to access this specific room
    // Example:
    // const hasAccess = await checkUserAccess(session.user.id, roomName);
    // if (!hasAccess) {
    //   return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    // }

    // Determine authentication type from environment
    const authType = process.env.JITSI_AUTH_TYPE || 'none';

    // TODO: Uncomment when ready to use JWT
    /*
    let token;
    let service;

    if (authType === 'jaas') {
      // Use JaaS (Jitsi as a Service)
      service = jaasService;
      token = service.generateToken({
        roomName,
        userId,
        userName,
        userEmail,
        userAvatar,
        moderator,
        expiresIn,
      });
    } else if (authType === 'self-hosted') {
      // Use self-hosted Jitsi
      service = selfHostedService;
      token = service.generateToken({
        roomName,
        userId,
        userName,
        userEmail,
        userAvatar,
        moderator,
        expiresIn,
      });
    } else {
      return NextResponse.json({
        error: 'JWT authentication not configured',
        message: 'Set JITSI_AUTH_TYPE to either "jaas" or "self-hosted"',
      }, { status: 500 });
    }

    return NextResponse.json({
      token,
      expiresAt: new Date(Date.now() + expiresIn * 1000).toISOString(),
      authType,
    });
    */

    // Temporary response for development
    return NextResponse.json({
      message: 'JWT generation not enabled yet',
      currentAuthType: authType,
      instructions: {
        option1: {
          name: 'JaaS (Jitsi as a Service) - RECOMMENDED',
          steps: [
            '1. Sign up at https://jaas.8x8.vc/',
            '2. Get your AppID, Private Key, and kid',
            '3. Install jsonwebtoken: npm install jsonwebtoken',
            '4. Set environment variables: JITSI_AUTH_TYPE=jaas, JAAS_APP_ID, JAAS_PRIVATE_KEY, JAAS_KID',
            '5. Uncomment JWT code in this file',
            '6. See JITSI_ALL_OPTIONS.md',
          ],
          cost: '~$0.09 per participant-minute',
          pros: 'Managed, secure, no server maintenance',
        },
        option2: {
          name: 'Self-Hosted Jitsi',
          steps: [
            '1. Set up your own Jitsi server',
            '2. Configure JWT authentication',
            '3. Install jsonwebtoken: npm install jsonwebtoken',
            '4. Set environment variables: JITSI_AUTH_TYPE=self-hosted, JITSI_APP_ID, JITSI_APP_SECRET',
            '5. Uncomment JWT code in this file',
            '6. See JITSI_JWT_GUIDE.md',
          ],
          cost: '$20-100/month for server',
          pros: 'Full control, own your data',
        },
      },
    });

  } catch (error) {
    console.error('Error in JWT generation endpoint:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to generate JWT token',
        message: error.message,
      },
      { status: 500 }
    );
  }
}

// Handle GET requests with helpful information
export async function GET() {
  return NextResponse.json({
    endpoint: '/api/jitsi/generate-token',
    method: 'POST',
    description: 'Generate JWT tokens for Jitsi Meet authentication',
    documentation: 'See JITSI_JWT_GUIDE.md',
    status: 'Not configured - requires self-hosted Jitsi server',
    requiredBody: {
      roomName: 'string (required) - Meeting room name',
      userId: 'string (required) - User ID',
      userName: 'string (required) - User display name',
      userEmail: 'string (optional) - User email',
      userAvatar: 'string (optional) - User avatar URL',
      moderator: 'boolean (optional) - Whether user is moderator',
      expiresIn: 'number (optional) - Token expiration in seconds (default: 7200)',
    },
    example: {
      roomName: 'fireteam-exp-123',
      userId: 'user-456',
      userName: 'John Doe',
      userEmail: 'john@example.com',
      moderator: true,
      expiresIn: 3600,
    },
  });
}

