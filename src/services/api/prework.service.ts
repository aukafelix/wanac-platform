import { apiClient } from './config';

function unwrapItem(payload: any): any {
  if (payload?.data && typeof payload.data === 'object') return payload.data;
  return payload;
}

export interface QuizQuestion {
  id: string | number;
  question: string;
  answers: string[];
  questionType: string;
}

export interface Quiz {
  id: string | number;
  title: string;
  timeLimit?: number;
  questions: QuizQuestion[];
}

export interface QuizCheckResponse {
  passed: boolean;
  quizzes: Array<{
    id: string | number;
    title: string;
    questionCount: number;
    passingScore: number;
    maxAttempts: number;
    attempts: number;
    bestScore: number;
    passed: boolean;
  }>;
}

export interface QuizSubmissionResult {
  passed: boolean;
  score: number;
  totalQuestions: number;
  results: Array<{
    questionId: string | number;
    correct: boolean;
    correctAnswer: number;
    explanation?: string;
  }>;
}

export const preworkService = {
  async checkCompletion(experienceId: string | number): Promise<QuizCheckResponse> {
    try {
      const res = await apiClient.get(`/api/v1/pre-work/check`, {
        params: { experienceId },
      });
      return unwrapItem(res.data);
    } catch (error: any) {
      console.error('Error checking pre-work completion:', error.response?.data ?? error.message);
      throw error;
    }
  },

  async getQuiz(quizId: string | number): Promise<Quiz> {
    try {
      const res = await apiClient.get(`/api/v1/pre-work/quizzes/${quizId}`);
      return unwrapItem(res.data);
    } catch (error: any) {
      console.error('Error fetching quiz:', error.response?.data ?? error.message);
      throw error;
    }
  },

  async submitQuiz(
    quizId: string | number,
    answers: Record<string | number, number>
  ): Promise<QuizSubmissionResult> {
    try {
      const res = await apiClient.post(`/api/v1/pre-work/submissions`, {
        quiz_id: quizId,
        answers,
      });
      return unwrapItem(res.data);
    } catch (error: any) {
      console.error('Error submitting quiz:', error.response?.data ?? error.message);
      throw error;
    }
  },
};
