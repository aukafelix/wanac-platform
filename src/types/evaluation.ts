export interface Participant {
  id: string;
  name: string;
  color: string;
  talkTimeMinutes: number;
  engagementLevel: 'high' | 'medium' | 'low';
}

export interface ConversationBubble {
  id: string;
  participantId: string;
  timestamp: number; // seconds from start
  comment: string;
  understandingDepth: number; // 1-5 scale for bubble size
  rubric?: string;
}

export interface ConversationMap {
  bubbles: ConversationBubble[];
  timeline: {
    startTime: string;
    endTime: string;
    duration: number;
  };
}

export interface GroupBalanceScore {
  participants: Participant[];
  averageTalkTime: number;
  isBalanced: boolean;
  message: string;
}

export interface BloomTaxonomyLevel {
  level: 'Remembering' | 'Understanding' | 'Applying' | 'Analyzing' | 'Evaluating' | 'Creating';
  score: number; // 1-6 scale
  color: string;
}

export interface RubricEvaluation {
  rubricId: string;
  rubricTitle: string;
  rubricDescription: string;
  bloomLevel: BloomTaxonomyLevel;
  contributions: string[];
  summary: string;
  explanation: string;
}

export interface IndividualEvaluation {
  participantId: string;
  participantName: string;
  evaluations: RubricEvaluation[];
}

export interface EvaluationData {
  conversationMap: ConversationMap;
  groupBalanceScore: GroupBalanceScore;
  individualEvaluations: IndividualEvaluation[];
  sessionInfo: {
    experienceTitle: string;
    duration: string;
    totalParticipants: number;
    startTime: string;
    endTime: string;
  };
}

// Mock data for development
export const mockEvaluationData: EvaluationData = {
  conversationMap: {
    bubbles: [
      {
        id: '1',
        participantId: 'clarence',
        timestamp: 307, // 5:07
        comment: 'Customer surveys help confirm market needs',
        understandingDepth: 3,
        rubric: 'Demand Validation'
      },
      {
        id: '2',
        participantId: 'clarence',
        timestamp: 923, // 15:23
        comment: 'Surveys have limitations like bias and inaccuracy',
        understandingDepth: 4,
        rubric: 'Demand Validation'
      },
      {
        id: '3',
        participantId: 'takumi',
        timestamp: 1538, // 25:38
        comment: 'User pain points are crucial for planning',
        understandingDepth: 2,
        rubric: 'Performing Market Research'
      },
      {
        id: '4',
        participantId: 'clarence',
        timestamp: 2153, // 35:53
        comment: 'Networking and structured learning are key advantages',
        understandingDepth: 4,
        rubric: 'Performing Market Research'
      },
      {
        id: '5',
        participantId: 'yanson',
        timestamp: 2769, // 46:09
        comment: 'Time savings through simplified processes',
        understandingDepth: 3,
        rubric: 'Performing Market Research'
      }
    ],
    timeline: {
      startTime: '5:07',
      endTime: '46:09',
      duration: 2769
    }
  },
  groupBalanceScore: {
    participants: [
      {
        id: 'clarence',
        name: 'Clarence',
        color: '#FCD34D', // yellow
        talkTimeMinutes: 25.3,
        engagementLevel: 'high'
      },
      {
        id: 'takumi',
        name: 'Takumi',
        color: '#D1D5DB', // light gray
        talkTimeMinutes: 8.7,
        engagementLevel: 'medium'
      },
      {
        id: 'yanson',
        name: 'Yanson',
        color: '#4B5563', // dark gray
        talkTimeMinutes: 11.3,
        engagementLevel: 'medium'
      },
      {
        id: 'zihan',
        name: 'Zihan Wang',
        color: '#000000', // black
        talkTimeMinutes: 11.3,
        engagementLevel: 'low'
      }
    ],
    averageTalkTime: 14.15,
    isBalanced: false,
    message: 'Your group had an asymmetric discussion. Group members did not participate equally in the discussion. Next time, try to work with your group to have a balanced discussion.'
  },
  individualEvaluations: [
    {
      participantId: 'clarence',
      participantName: 'Clarence',
      evaluations: [
        {
          rubricId: 'demand-validation',
          rubricTitle: 'Demand Validation',
          rubricDescription: 'Understand various demand validation techniques to determine which methods are most appropriate for a specific business model and stage.',
          bloomLevel: {
            level: 'Analyzing',
            score: 4,
            color: '#F59E0B' // orange
          },
          contributions: [
            'Clarence discussed customer surveys as a means to confirm market needs and gauge interest, while recognizing limitations like potential bias and inaccuracy.',
            'Clarence mentioned the limitations of customer surveys, noting the potential discrepancy between survey responses and actual user behavior, and how surveys are prone to bias.',
            'Clarence highlighted challenges in gathering meaningful survey data, acknowledging biases and the difficulty in getting accurate insights.'
          ],
          summary: "Clarence achieved an Analyze level on Bloom's Taxonomy. He broke down the issues with customer surveys, analyzing their potential drawbacks and how these could affect data reliability. This level of detail shows his ability to critically examine survey methods, though he did not propose alternative solutions.",
          explanation: "Your contributions were insightful and demonstrated a high level of critical thinking, including analysis, evaluation, and creative problem-solving. This depth of response significantly enhances the quality of the discussion and provides valuable perspectives."
        },
        {
          rubricId: 'market-research',
          rubricTitle: 'Performing Market Research',
          rubricDescription: 'Understand a practical method to perform market research.',
          bloomLevel: {
            level: 'Applying',
            score: 3,
            color: '#FCD34D' // yellow
          },
          contributions: [
            'Clarence recognized the importance of understanding user pain points, especially around learning resources and social networking within the educational framework, emphasizing needs assessment in strategic planning.',
            'Clarence saw value beyond utility, suggesting networking and structured learning as key advantages, demonstrating understanding of emotional and social impact.',
            'Clarence deeply explored different elements of value, including self-transcendence, illustrating how the product simplifies processes and saves time, emphasizing higher-order emotional and social benefits.',
            'Clarence shared a personal example about learning difficulties, underscoring the significance of addressing unmet needs.',
            'Clarence expressed a personal issue regarding the lack of accessible expertise in a way that connects to how their platform addresses similar core problems.',
            'Clarence explored specific examples of how their app could deliver functional, emotional, and life-changing benefits, highlighting the value in terms of time savings and emotional impact through social interactions.',
            'Clarence talked about the inefficiencies of existing educational solutions and envisioned their startup as a structured and flexible platform that caters to user-specific needs.',
            'Clarence articulated the importance of addressing the core problem of students who lack resources but wish to gain instant access to expertise, linking this to broader context.'
          ],
          summary: "Clarence's argument specifically explores the unmet needs and resource gaps faced by students, indicating his understanding of addressing core problems within the application's solution offerings, reflected a Bloom's score of 3 due to applied knowledge toward identifying customer needs.",
          explanation: "Your contributions were insightful and demonstrated a high level of critical thinking, including analysis, evaluation, and creative problem-solving. This depth of response significantly enhances the quality of the discussion and provides valuable perspectives."
        }
      ]
    }
  ],
  sessionInfo: {
    experienceTitle: 'Fireteam Experience',
    duration: '46:09',
    totalParticipants: 4,
    startTime: '2024-01-15T10:00:00Z',
    endTime: '2024-01-15T10:46:09Z'
  }
};

export const bloomTaxonomyColors = {
  'Creating': '#10B981', // emerald
  'Evaluating': '#F59E0B', // amber
  'Analyzing': '#FCD34D', // yellow
  'Applying': '#FCD34D', // yellow
  'Understanding': '#3B82F6', // blue
  'Remembering': '#06B6D4' // cyan
};
