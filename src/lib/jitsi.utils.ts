/**
 * Jitsi Meet utility functions for generating meeting links
 * Updated to use FREE meet.jit.si instead of JaaS
 */

// Use free Jitsi domain from environment or default
const JITSI_DOMAIN = process.env.NEXT_PUBLIC_JITSI_DOMAIN || 'meet.jit.si';

/**
 * Generate a unique room name for the meeting
 * @param fireteamId - The fireteam ID
 * @param experienceId - The experience ID
 * @param adminId - The admin user ID (optional)
 * @returns A unique room name
 */
export function generateRoomName(
  fireteamId: string | number, 
  experienceId: string | number, 
  adminId?: string | number
): string {
  // Generate secure random token for free Jitsi
  const secureToken = typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID().substring(0, 8) // Short UUID
    : Date.now().toString(36); // Fallback
  
  // Format: wanac-exp-{experienceId}-{token}
  return `wanac-exp-${experienceId}-${secureToken}`;
}

/**
 * Generate a Jitsi Meet meeting link
 * @param roomName - The room name for the meeting
 * @param displayName - Optional display name for the user
 * @returns A complete Jitsi Meet URL for free meet.jit.si
 */
export function generateJitsiMeetingLink(roomName: string, displayName?: string): string {
  const baseUrl = `https://${JITSI_DOMAIN}/${roomName}`;
  
  if (displayName) {
    const params = new URLSearchParams();
    params.append('userInfo.displayName', displayName);
    return `${baseUrl}?${params.toString()}`;
  }
  
  return baseUrl;
}

/**
 * Generate a complete meeting link for a fireteam experience
 * @param fireteamId - The fireteam ID
 * @param experienceId - The experience ID
 * @param adminId - The admin user ID (optional)
 * @param adminName - The admin display name (optional)
 * @returns A complete Jitsi Meet URL for free meet.jit.si
 */
export function generateFireteamMeetingLink(
  fireteamId: string | number,
  experienceId: string | number,
  adminId?: string | number,
  adminName?: string
): string {
  const roomName = generateRoomName(fireteamId, experienceId, adminId);
  return generateJitsiMeetingLink(roomName, adminName);
}

/**
 * Extract room name from a Jitsi Meet URL
 * @param url - The Jitsi Meet URL
 * @returns The room name or null if invalid
 */
export function extractRoomNameFromUrl(url: string): string | null {
  try {
    const urlObj = new URL(url);
    // Support both free Jitsi and JaaS domains
    if (urlObj.hostname === 'meet.jit.si' || urlObj.hostname === '8x8.vc') {
      const pathParts = urlObj.pathname.split('/').filter(Boolean);
      return pathParts[pathParts.length - 1] || null;
    }
    return null;
  } catch {
    return null;
  }
}






