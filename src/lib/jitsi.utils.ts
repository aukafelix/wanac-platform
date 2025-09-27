/**
 * Jitsi Meet utility functions for generating meeting links
 */

const JITSI_APP_ID = 'vpaas-magic-cookie-4a5aa7e03de14f9c8301e925ead7a2d5';
const JITSI_DOMAIN = '8x8.vc';

/**
 * Generate a unique room name for the meeting
 * @param fireteamId - The fireteam ID
 * @param experienceId - The experience ID
 * @param adminId - The admin user ID
 * @returns A unique room name
 */
export function generateRoomName(fireteamId: string | number, experienceId: string | number, adminId: string | number): string {
  const timestamp = Date.now();
  return `wanac-fireteam-${fireteamId}-exp-${experienceId}-admin-${adminId}-${timestamp}`;
}

/**
 * Generate a Jitsi Meet meeting link
 * @param roomName - The room name for the meeting
 * @param displayName - Optional display name for the user
 * @returns A complete Jitsi Meet URL
 */
export function generateJitsiMeetingLink(roomName: string, displayName?: string): string {
  const baseUrl = `https://${JITSI_DOMAIN}/${roomName}`;
  const params = new URLSearchParams();
  
  if (displayName) {
    params.append('userInfo.displayName', displayName);
  }
  
  // Add app_id parameter for Jitsi configuration
  params.append('app_id', JITSI_APP_ID);
  
  // Optional: Add additional Jitsi configuration
  params.append('config.startWithAudioMuted', 'true');
  params.append('config.startWithVideoMuted', 'true');
  params.append('config.enableWelcomePage', 'false');
  
  return params.toString() ? `${baseUrl}?${params.toString()}` : baseUrl;
}

/**
 * Generate a complete meeting link for a fireteam experience
 * @param fireteamId - The fireteam ID
 * @param experienceId - The experience ID
 * @param adminId - The admin user ID
 * @param adminName - The admin display name
 * @returns A complete Jitsi Meet URL
 */
export function generateFireteamMeetingLink(
  fireteamId: string | number,
  experienceId: string | number,
  adminId: string | number,
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
    if (urlObj.hostname === JITSI_DOMAIN) {
      const pathParts = urlObj.pathname.split('/');
      return pathParts[pathParts.length - 1] || null;
    }
    return null;
  } catch {
    return null;
  }
}
