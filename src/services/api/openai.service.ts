import axios from 'axios';

// Create a separate client for OpenAI API calls
const openaiClient = axios.create({
  baseURL: 'https://api.openai.com/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to add API key
openaiClient.interceptors.request.use((config) => {
  const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
  if (apiKey) {
    config.headers.Authorization = `Bearer ${apiKey}`;
  }
  return config;
});

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

export const openaiService = {
  /**
   * Transcribe audio using OpenAI Whisper API
   */
  async transcribeAudio(audioFile: File | Blob): Promise<TranscriptionResult> {
    try {
      const formData = new FormData();
      formData.append('file', audioFile);
      formData.append('model', 'whisper-1');
      formData.append('response_format', 'verbose_json');

      const response = await openaiClient.post('/audio/transcriptions', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return {
        text: response.data.text,
        duration: response.data.duration,
        language: response.data.language,
      };
    } catch (error: any) {
      console.error('Error transcribing audio:', error);
      throw new Error('Failed to transcribe audio: ' + (error.response?.data?.error?.message || error.message));
    }
  },

  /**
   * Generate meeting summaries for different user roles using GPT-4
   */
  async generateMeetingSummaries(
    transcript: string,
    meetingData: {
      experienceTitle: string;
      experienceDescription: string;
      agenda: Array<{ title: string; duration: string }>;
      participants: Array<{ id: string; name: string; role?: string }>;
      duration: string;
      userId: string;
      userName: string;
    }
  ): Promise<MeetingSummary> {
    try {
      // Generate all three summaries in parallel
      const [participantSummary, coachSummary, adminSummary] = await Promise.all([
        this.generateParticipantSummary(transcript, meetingData),
        this.generateCoachSummary(transcript, meetingData),
        this.generateAdminSummary(transcript, meetingData),
      ]);

      return {
        participantSummary,
        coachSummary,
        adminSummary,
      };
    } catch (error: any) {
      console.error('Error generating meeting summaries:', error);
      throw new Error('Failed to generate summaries: ' + (error.response?.data?.error?.message || error.message));
    }
  },

  /**
   * Generate participant-specific summary
   */
  async generateParticipantSummary(transcript: string, meetingData: any) {
    const prompt = `You are an AI assistant analyzing a Fireteam learning experience meeting transcript for a participant.

Meeting Details:
- Title: ${meetingData.experienceTitle}
- Description: ${meetingData.experienceDescription}
- Duration: ${meetingData.duration}
- Participant Name: ${meetingData.userName}

Agenda:
${meetingData.agenda.map((item: any, idx: number) => `${idx + 1}. ${item.title} (${item.duration})`).join('\n')}

Meeting Transcript:
${transcript}

Please analyze this transcript and provide a personalized summary for ${meetingData.userName}. Focus on:
1. Their key contributions and insights shared during the meeting
2. Action items and commitments they made
3. Areas where they engaged most actively
4. Key learnings and takeaways relevant to them
5. Assessment of their engagement level (high/medium/low)

Respond in JSON format with the following structure:
{
  "engagementLevel": "high|medium|low",
  "keyContributions": ["contribution 1", "contribution 2", ...],
  "actionItems": ["action 1", "action 2", ...],
  "overallSummary": "A comprehensive 2-3 paragraph summary...",
  "speakingTime": "estimated percentage or duration",
  "questionsAsked": number
}`;

    const response = await openaiClient.post('/chat/completions', {
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'You are an expert at analyzing meeting transcripts and providing personalized insights for participants.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.7,
    });

    const result = JSON.parse(response.data.choices[0].message.content);
    return {
      userId: meetingData.userId,
      userName: meetingData.userName,
      ...result,
    };
  },

  /**
   * Generate coach/facilitator summary
   */
  async generateCoachSummary(transcript: string, meetingData: any) {
    const prompt = `You are an AI assistant analyzing a Fireteam learning experience meeting transcript for the coach/facilitator.

Meeting Details:
- Title: ${meetingData.experienceTitle}
- Description: ${meetingData.experienceDescription}
- Duration: ${meetingData.duration}
- Participants: ${meetingData.participants.map((p: any) => p.name).join(', ')}

Agenda:
${meetingData.agenda.map((item: any, idx: number) => `${idx + 1}. ${item.title} (${item.duration})`).join('\n')}

Meeting Transcript:
${transcript}

Please analyze this transcript from a coach's perspective. Provide insights on:
1. Overall team engagement and dynamics
2. Individual participant engagement levels and specific insights
3. Whether session objectives were met based on the agenda
4. Areas of concern or participants who may need additional support
5. Recommendations for future sessions
6. Key takeaways and wins from the session

Respond in JSON format with the following structure:
{
  "overallEngagement": "detailed assessment of group dynamics...",
  "participantInsights": [
    {
      "userName": "participant name",
      "engagementLevel": "high|medium|low",
      "notes": "specific observations about this participant..."
    }
  ],
  "sessionObjectivesMet": true/false,
  "areasOfConcern": ["concern 1", "concern 2", ...],
  "recommendations": ["recommendation 1", "recommendation 2", ...],
  "keyTakeaways": ["takeaway 1", "takeaway 2", ...]
}`;

    const response = await openaiClient.post('/chat/completions', {
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'You are an expert coach and facilitator analyzing group learning experiences.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.7,
    });

    const result = JSON.parse(response.data.choices[0].message.content);
    
    // Map participant insights to include userId
    const participantInsights = result.participantInsights.map((insight: any) => {
      const participant = meetingData.participants.find(
        (p: any) => p.name.toLowerCase() === insight.userName.toLowerCase()
      );
      return {
        userId: participant?.id || '',
        ...insight,
      };
    });

    return {
      ...result,
      participantInsights,
    };
  },

  /**
   * Generate admin/system summary
   */
  async generateAdminSummary(transcript: string, meetingData: any) {
    const prompt = `You are an AI assistant analyzing a Fireteam learning experience meeting transcript for system administrators.

Meeting Details:
- Title: ${meetingData.experienceTitle}
- Description: ${meetingData.experienceDescription}
- Duration: ${meetingData.duration}
- Total Participants: ${meetingData.participants.length}

Agenda:
${meetingData.agenda.map((item: any, idx: number) => `${idx + 1}. ${item.title} (${item.duration})`).join('\n')}

Meeting Transcript:
${transcript}

Please analyze this transcript from an administrative/system perspective. Focus on:
1. High-level metrics (participant count, estimated engagement rates, completion)
2. Facilitator performance and effectiveness
3. Content/curriculum effectiveness
4. Any technical issues mentioned
5. System-level recommendations for improvement
6. Strategic next steps

Respond in JSON format with the following structure:
{
  "sessionMetrics": {
    "totalParticipants": number,
    "averageEngagement": "percentage or qualitative assessment",
    "completionRate": "percentage or assessment",
    "technicalIssues": ["issue 1", "issue 2", ...]
  },
  "facilitatorPerformance": "assessment of facilitator effectiveness...",
  "contentEffectiveness": "assessment of curriculum/content quality...",
  "systemRecommendations": ["recommendation 1", "recommendation 2", ...],
  "nextSteps": ["step 1", "step 2", ...]
}`;

    const response = await openaiClient.post('/chat/completions', {
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'You are an expert at analyzing educational programs and providing strategic insights for administrators.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.7,
    });

    return JSON.parse(response.data.choices[0].message.content);
  },

  /**
   * Generate a quick summary without full analysis (faster, cheaper)
   */
  async generateQuickSummary(transcript: string, meetingTitle: string): Promise<string> {
    try {
      const response = await openaiClient.post('/chat/completions', {
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are an AI assistant that summarizes meeting transcripts concisely.',
          },
          {
            role: 'user',
            content: `Summarize this meeting transcript for "${meetingTitle}" in 3-4 sentences, focusing on key discussion points and outcomes:\n\n${transcript}`,
          },
        ],
        temperature: 0.5,
        max_tokens: 200,
      });

      return response.data.choices[0].message.content;
    } catch (error: any) {
      console.error('Error generating quick summary:', error);
      throw new Error('Failed to generate summary: ' + (error.response?.data?.error?.message || error.message));
    }
  },
};


