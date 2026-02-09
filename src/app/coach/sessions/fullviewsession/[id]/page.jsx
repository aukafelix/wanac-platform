import { sessionsService } from '../../../../../services/api/sessions.service';
import SessionDetailsClient from './SessionDetailsClient';


export default async function FullViewSessionPage({ params }) {
  const { id } = await params;
  return <SessionDetailsClient sessionId={id} />;
}