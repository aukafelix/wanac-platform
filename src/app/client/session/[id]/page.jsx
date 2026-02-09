import SessionDetailsClient from "../../../coach/sessions/fullviewsession/[id]/SessionDetailsClient";

export default async function ClientSessionDetailPage({ params }) {
  const { id } = await params;
  return (
    <SessionDetailsClient
      sessionId={id}
      readOnly
      useClientLayout
    />
  );
}
