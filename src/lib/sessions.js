/**
 * Normalize API session response to a consistent list shape with date/time strings.
 * Handles multiple response shapes: array, { sessions: { data } }, { data }.
 */
export function normalizeSessions(raw) {
  const list = Array.isArray(raw) ? raw : raw?.sessions?.data ?? raw?.data ?? [];
  if (!Array.isArray(list)) return [];
  return list.map((session) => {
    const at = session.scheduled_at || session.date;
    const d = at ? new Date(at) : new Date();
    const pad = (n) => n.toString().padStart(2, "0");
    const date = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
    const time = `${pad(d.getHours())}:${pad(d.getMinutes())}`;
    return {
      ...session,
      time,
      date,
      link: session.session_link || session.meeting_link || "",
      resources: session.resources || "",
      notes: session.description || "",
      status: session.status || "Scheduled",
    };
  });
}
