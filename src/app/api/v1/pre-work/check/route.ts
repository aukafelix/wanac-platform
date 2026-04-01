import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/v1/pre-work/check
 * 
 * Checks the completion status of pre-work quizzes for a given experience.
 * 
 * Query parameters:
 *   - experienceId: The ID of the experience to check pre-work for
 * 
 * Returns mock data for development. Later this will proxy to the Laravel backend.
 * 
 * Response:
 * {
 *   "passed": boolean,
 *   "quizzes": [
 *     {
 *       "id": number,
 *       "title": string,
 *       "questionCount": number,
 *       "passingScore": number,
 *       "maxAttempts": number,
 *       "attempts": number,
 *       "bestScore": number,
 *       "passed": boolean
 *     }
 *   ]
 * }
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const experienceId = searchParams.get('experienceId');

    if (!experienceId) {
      return NextResponse.json(
        { error: 'experienceId is required' },
        { status: 400 }
      );
    }

    // TODO: Replace with actual Laravel backend call
    // For now, return mock data for development/testing
    // const apiResponse = await fetch(
    //   `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/pre-work/check?experienceId=${experienceId}`,
    //   {
    //     headers: {
    //       Authorization: `Bearer ${request.headers.get('authorization')?.split(' ')[1]}`,
    //     },
    //   }
    // );
    // return NextResponse.json(await apiResponse.json());

    // Mock data - remove when backend is ready
    const mockData = {
      passed: false,
      quizzes: [
        {
          id: 1,
          title: 'Course Fundamentals',
          questionCount: 10,
          passingScore: 80,
          maxAttempts: 3,
          attempts: 0,
          bestScore: 0,
          passed: false,
        },
        {
          id: 2,
          title: 'Safety Guidelines',
          questionCount: 8,
          passingScore: 90,
          maxAttempts: 2,
          attempts: 1,
          bestScore: 75,
          passed: false,
        },
        {
          id: 3,
          title: 'Platform Overview',
          questionCount: 12,
          passingScore: 75,
          maxAttempts: 3,
          attempts: 2,
          bestScore: 92,
          passed: true,
        },
      ],
    };

    return NextResponse.json(mockData, { status: 200 });
  } catch (error: any) {
    console.error('Error checking pre-work status:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to check pre-work status' },
      { status: 500 }
    );
  }
}
