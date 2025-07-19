import { sessionsService } from '../../../../../services/api/sessions.service';
import SessionDetailsClient from './SessionDetailsClient';


export default function FullViewSessionPage({ params }) {
  const { id } = params;

  return <SessionDetailsClient sessionId={id} />;
}