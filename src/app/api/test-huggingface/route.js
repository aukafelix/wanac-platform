/**
 * One-off test route for Hugging Face recording service.
 * POST /api/test-huggingface with body: { transcript, meetingData }
 * Remove or restrict in production.
 */

import { huggingfaceService } from '../../../../services/api/huggingface.service';

export async function POST(req) {
  try {
    const key = process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY || process.env.HUGGINGFACE_API_KEY;
    if (!key) {
      return Response.json(
        { ok: false, error: 'Missing NEXT_PUBLIC_HUGGINGFACE_API_KEY or HUGGINGFACE_API_KEY in .env.local' },
        { status: 500 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const { transcript, meetingData } = body;
    if (!transcript || !meetingData) {
      return Response.json(
        { ok: false, error: 'Request body must include transcript and meetingData' },
        { status: 400 }
      );
    }

    const summaries = await huggingfaceService.generateMeetingSummaries(transcript, meetingData);

    return Response.json({
      ok: true,
      message: 'Hugging Face summary generation works.',
      participantSummary: summaries.participantSummary?.overallSummary ? '[present]' : '[missing]',
      coachSummary: summaries.coachSummary?.overallEngagement ? '[present]' : '[missing]',
      adminSummary: summaries.adminSummary?.sessionMetrics ? '[present]' : '[missing]',
      fullSummaries: summaries,
    });
  } catch (err) {
    console.error('Test Hugging Face error:', err);
    return Response.json(
      { ok: false, error: err.message || 'Unknown error' },
      { status: 500 }
    );
  }
}
