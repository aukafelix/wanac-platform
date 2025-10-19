import { useState, useEffect } from 'react';
import { meetingService } from '../../../../../../../services/api/meeting.service';
import { mockEvaluationData } from '../../../../../../../types/evaluation';

/**
 * Custom hook to fetch and manage evaluation data
 */
export function useEvaluationData(recordingId, fireteamId, hasAI, userRole = 'client') {
  const [evaluationData, setEvaluationData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadEvaluationData() {
      try {
        setLoading(true);
        setError(null);

        if (hasAI && recordingId) {
          // Fetch AI-generated evaluation data from API
          console.log('Fetching AI evaluation data for recording:', recordingId);
          
          try {
            const apiData = await meetingService.getRecordingSummaryByRole(
              recordingId,
              userRole,
              fireteamId
            );
            
            // Transform API data to our evaluation format
            const transformedData = transformApiDataToEvaluationFormat(apiData);
            setEvaluationData(transformedData);
          } catch (apiError) {
            console.warn('Failed to fetch AI evaluation data, using mock data:', apiError);
            setEvaluationData(mockEvaluationData);
          }
        } else {
          // Generate basic metrics from available data
          console.log('Generating basic evaluation metrics');
          const basicData = generateBasicEvaluationData();
          setEvaluationData(basicData);
        }
      } catch (err) {
        console.error('Error loading evaluation data:', err);
        setError(err.message);
        // Fallback to mock data
        setEvaluationData(mockEvaluationData);
      } finally {
        setLoading(false);
      }
    }

    loadEvaluationData();
  }, [recordingId, fireteamId, hasAI, userRole]);

  return {
    evaluationData,
    loading,
    error
  };
}

/**
 * Transform API data to our evaluation format
 */
function transformApiDataToEvaluationFormat(apiData) {
  // This function would transform the actual API response
  // to match our evaluation data structure
  // For now, return mock data as placeholder
  return mockEvaluationData;
}

/**
 * Generate basic evaluation data without AI processing
 */
function generateBasicEvaluationData() {
  return {
    ...mockEvaluationData,
    sessionInfo: {
      ...mockEvaluationData.sessionInfo,
      experienceTitle: 'Basic Session Analysis'
    },
    individualEvaluations: mockEvaluationData.individualEvaluations.map(individualEval => ({
      ...individualEval,
      evaluations: individualEval.evaluations.map(evaluation => ({
        ...evaluation,
        summary: 'Basic session analysis - AI insights not available',
        explanation: 'This evaluation shows basic participation metrics. For detailed AI analysis, please process the recording with AI summary generation.',
        contributions: evaluation.contributions.slice(0, 2) // Limit contributions for basic view
      }))
    }))
  };
}
