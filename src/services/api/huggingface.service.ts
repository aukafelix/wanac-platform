/**
 * Hugging Face Inference API service for transcription and meeting summaries.
 * Replaces OpenAI for recording processing (free tier).
 *
 * Set NEXT_PUBLIC_HUGGINGFACE_API_KEY or HUGGINGFACE_API_KEY in .env.local
 * Get a token at https://huggingface.co/settings/tokens (Read access).
 */

const HF_BASE = 'https://api-inference.huggingface.co/models';
const WHISPER_MODEL = 'openai/whisper-large-v3';
const TEXT_MODEL = 'mistralai/Mistral-7B-Instruct-v0.2';

function getToken(): string {
  const token =
    typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_HUGGINGFACE_API_KEY ||
    typeof process !== 'undefined' && process.env?.HUGGINGFACE_API_KEY ||
    '';
  if (!token) {
    throw new Error('Missing Hugging Face API key. Set NEXT_PUBLIC_HUGGINGFACE_API_KEY or HUGGINGFACE_API_KEY in .env.local');
  }
  return token;
}

async function hfFetch<T>(url: string, options: RequestInit): Promise<T> {
  const token = getToken();
  const res = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = data?.error || data?.message || res.statusText;
    if (res.status === 503 && (msg.includes('loading') || msg.includes('Loading'))) {
      throw new Error('Model is loading. Please retry in 20–30 seconds.');
    }
    throw new Error(msg || `Hugging Face API error: ${res.status}`);
  }
  return data as T;
}

/** Extract JSON from model output (may be wrapped in markdown code block). */
function parseJsonFromText(text: string): any {
  const raw = (text || '').trim();
  const jsonMatch = raw.match(/```(?:json)?\s*([\s\S]*?)```/) || raw.match(/(\{[\s\S]*\})/);
  const toParse = jsonMatch ? (jsonMatch[1] || jsonMatch[0]).trim() : raw;
  return JSON.parse(toParse);
}

export interface TranscriptionResult {
  text: string;
  duration?: number;
  language?: string;
}

export interface MeetingSummary {
  participantSummary: {
    userId: string;
    userName: string;
    engagementLevel: 'high' | 'medium' | 'low';
    keyContributions: string[];
    actionItems: string[];
    overallSummary: string;
    speakingTime?: string;
    questionsAsked?: number;
  };
  coachSummary: {
    overallEngagement: string;
    participantInsights: Array<{
      userId: string;
      userName: string;
      engagementLevel: 'high' | 'medium' | 'low';
      notes: string;
    }>;
    sessionObjectivesMet: boolean;
    areasOfConcern: string[];
    recommendations: string[];
    keyTakeaways: string[];
  };
  adminSummary: {
    sessionMetrics: {
      totalParticipants: number;
      averageEngagement: string;
      completionRate: string;
      technicalIssues: string[];
    };
    facilitatorPerformance: string;
    contentEffectiveness: string;
    systemRecommendations: string[];
    nextSteps: string[];
  };
}

type MeetingData = {
  experienceTitle: string;
  experienceDescription: string;
  agenda: Array<{ title: string; duration: string }>;
  participants: Array<{ id: string; name: string; role?: string }>;
  duration: string;
  userId: string;
  userName: string;
};

export const huggingfaceService = {
  /**
   * Transcribe audio using Hugging Face Whisper (openai/whisper-large-v3).
   */
  async transcribeAudio(audioFile: File | Blob): Promise<TranscriptionResult> {
    try {
      const token = getToken();
      const res = await fetch(`${HF_BASE}/${WHISPER_MODEL}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: audioFile,
      });
      const data = await res.json();
      if (!res.ok) {
        const msg = data?.error || data?.message || res.statusText;
        throw new Error(msg || `Transcription failed: ${res.status}`);
      }
      const text = typeof data?.text === 'string' ? data.text : (data?.generated_text ?? '');
      return { text };
    } catch (error: any) {
      console.error('Error transcribing audio:', error);
      throw new Error('Failed to transcribe audio: ' + (error.message || 'Unknown error'));
    }
  },

  /**
   * Generate meeting summaries for participant, coach, and admin using HF text-generation.
   */
  async generateMeetingSummaries(transcript: string, meetingData: MeetingData): Promise<MeetingSummary> {
    try {
      const [participantSummary, coachSummary, adminSummary] = await Promise.all([
        this.generateParticipantSummary(transcript, meetingData),
        this.generateCoachSummary(transcript, meetingData),
        this.generateAdminSummary(transcript, meetingData),
      ]);
      return { participantSummary, coachSummary, adminSummary };
    } catch (error: any) {
      console.error('Error generating meeting summaries:', error);
      throw new Error('Failed to generate summaries: ' + (error.message || 'Unknown error'));
    }
  },

  async generateParticipantSummary(transcript: string, meetingData: MeetingData) {
    const prompt = `You are an AI assistant analyzing a Fireteam learning experience meeting transcript for a participant.

Meeting Details:
- Title: ${meetingData.experienceTitle}
- Description: ${meetingData.experienceDescription}
- Duration: ${meetingData.duration}
- Participant Name: ${meetingData.userName}

Agenda:
${meetingData.agenda.map((item: any, idx: number) => `${idx + 1}. ${item.title} (${item.duration})`).join('\n')}

Meeting Transcript:
${transcript.slice(-30000)}

Please analyze this transcript and provide a personalized summary for ${meetingData.userName}. Focus on:
1. Their key contributions and insights shared during the meeting
2. Action items and commitments they made
3. Areas where they engaged most actively
4. Key learnings and takeaways relevant to them
5. Assessment of their engagement level (high/medium/low)

Respond with ONLY a valid JSON object, no other text, with this exact structure:
{"engagementLevel":"high|medium|low","keyContributions":["..."],"actionItems":["..."],"overallSummary":"...","speakingTime":"...","questionsAsked":0}`;

    const out = await this.textGeneration(prompt);
    const result = parseJsonFromText(out);
    return {
      userId: meetingData.userId,
      userName: meetingData.userName,
      engagementLevel: result.engagementLevel || 'medium',
      keyContributions: Array.isArray(result.keyContributions) ? result.keyContributions : [],
      actionItems: Array.isArray(result.actionItems) ? result.actionItems : [],
      overallSummary: result.overallSummary || '',
      speakingTime: result.speakingTime,
      questionsAsked: result.questionsAsked,
    };
  },

  async generateCoachSummary(transcript: string, meetingData: MeetingData) {
    const prompt = `You are an AI assistant analyzing a Fireteam learning experience meeting transcript for the coach/facilitator.

Meeting Details:
- Title: ${meetingData.experienceTitle}
- Description: ${meetingData.experienceDescription}
- Duration: ${meetingData.duration}
- Participants: ${meetingData.participants.map((p: any) => p.name).join(', ')}

Agenda:
${meetingData.agenda.map((item: any, idx: number) => `${idx + 1}. ${item.title} (${item.duration})`).join('\n')}

Meeting Transcript:
${transcript.slice(-30000)}

Analyze from a coach's perspective. Respond with ONLY a valid JSON object, no other text:
{"overallEngagement":"...","participantInsights":[{"userName":"...","engagementLevel":"high|medium|low","notes":"..."}],"sessionObjectivesMet":true|false,"areasOfConcern":["..."],"recommendations":["..."],"keyTakeaways":["..."]}`;

    const out = await this.textGeneration(prompt);
    const result = parseJsonFromText(out);
    const participantInsights = (result.participantInsights || []).map((insight: any) => {
      const participant = meetingData.participants.find(
        (p: any) => p.name.toLowerCase() === (insight.userName || '').toLowerCase()
      );
      return {
        userId: participant?.id || '',
        userName: insight.userName || '',
        engagementLevel: insight.engagementLevel || 'medium',
        notes: insight.notes || '',
      };
    });
    return {
      overallEngagement: result.overallEngagement || '',
      participantInsights,
      sessionObjectivesMet: Boolean(result.sessionObjectivesMet),
      areasOfConcern: Array.isArray(result.areasOfConcern) ? result.areasOfConcern : [],
      recommendations: Array.isArray(result.recommendations) ? result.recommendations : [],
      keyTakeaways: Array.isArray(result.keyTakeaways) ? result.keyTakeaways : [],
    };
  },

  async generateAdminSummary(transcript: string, meetingData: MeetingData) {
    const prompt = `You are an AI assistant analyzing a Fireteam learning experience meeting transcript for system administrators.

Meeting Details:
- Title: ${meetingData.experienceTitle}
- Description: ${meetingData.experienceDescription}
- Duration: ${meetingData.duration}
- Total Participants: ${meetingData.participants.length}

Agenda:
${meetingData.agenda.map((item: any, idx: number) => `${idx + 1}. ${item.title} (${item.duration})`).join('\n')}

Meeting Transcript:
${transcript.slice(-30000)}

Analyze from an administrative perspective. Respond with ONLY a valid JSON object, no other text:
{"sessionMetrics":{"totalParticipants":0,"averageEngagement":"...","completionRate":"...","technicalIssues":["..."]},"facilitatorPerformance":"...","contentEffectiveness":"...","systemRecommendations":["..."],"nextSteps":["..."]}`;

    const out = await this.textGeneration(prompt);
    const result = parseJsonFromText(out);
    const sm = result.sessionMetrics || {};
    return {
      sessionMetrics: {
        totalParticipants: typeof sm.totalParticipants === 'number' ? sm.totalParticipants : meetingData.participants.length,
        averageEngagement: sm.averageEngagement || '',
        completionRate: sm.completionRate || '',
        technicalIssues: Array.isArray(sm.technicalIssues) ? sm.technicalIssues : [],
      },
      facilitatorPerformance: result.facilitatorPerformance || '',
      contentEffectiveness: result.contentEffectiveness || '',
      systemRecommendations: Array.isArray(result.systemRecommendations) ? result.systemRecommendations : [],
      nextSteps: Array.isArray(result.nextSteps) ? result.nextSteps : [],
    };
  },

  async textGeneration(inputs: string, maxNewTokens = 1024): Promise<string> {
    const data = await hfFetch<{ generated_text?: string } | Array<{ generated_text?: string }>>(
      `${HF_BASE}/${TEXT_MODEL}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          inputs,
          parameters: {
            max_new_tokens: maxNewTokens,
            temperature: 0.7,
            return_full_text: false,
          },
        }),
      }
    );
    if (Array.isArray(data) && data[0]?.generated_text) return data[0].generated_text;
    if (data && typeof (data as any).generated_text === 'string') return (data as any).generated_text;
    return '';
  },

  /**
   * Quick summary (short text). Optional parity with openai.service.
   */
  async generateQuickSummary(transcript: string, meetingTitle: string): Promise<string> {
    const prompt = `Summarize this meeting transcript for "${meetingTitle}" in 3-4 sentences, focusing on key discussion points and outcomes:\n\n${transcript.slice(-8000)}`;
    return this.textGeneration(prompt, 200);
  },
};
