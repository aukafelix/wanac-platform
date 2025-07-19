import { sessionsService } from '../../../../../services/api/sessions.service';
import SessionDetailsClient from './SessionDetailsClient';

export default async function FullViewSessionPage({ params }) {
  const { id } = params;
  const session = await sessionsService.getSession(id);

  return <SessionDetailsClient session={session} />;
}

export async function generateStaticParams() {
  // Fetch all sessions from the backend
  const sessions = await sessionsService.getSessions();
  // Return an array of params: { id }
  return sessions.map(session => ({ id: session.id }));
} 