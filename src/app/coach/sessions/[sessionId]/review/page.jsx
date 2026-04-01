'use client';

import { useState, useEffect } from 'react';
import { apiClient } from '@/services/api/config';

const BLOOM_LEVELS = {
  0: 'Did Not Discuss',
  1: 'Remembering',
  2: 'Understanding',
  3: 'Applying',
  4: 'Analyzing',
  5: 'Evaluating',
  6: 'Creating'
};

const getScoreColor = (score) => {
  if (score <= 1) return 'bg-red-600';
  if (score === 2) return 'bg-orange-600';
  if (score === 3) return 'bg-yellow-600';
  if (score <= 5) return 'bg-green-600';
  return 'bg-blue-600';
};

function ScoreBadge({ score }) {
  return (
    <div className={`${getScoreColor(score)} text-white px-3 py-1 rounded-full text-sm font-bold min-w-[100px] text-center`}>
      {score}/6 - {BLOOM_LEVELS[score]}
    </div>
  );
}

function RubricItem({ participant, rubric, sessionId, onUpdate }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [overrideScore, setOverrideScore] = useState('use-ai');
  const [feedback, setFeedback] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const aiScore = rubric.aiScore ?? 0;

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const payload = {
        participantId: participant.id,
        rubricId: rubric.id,
        score: overrideScore === 'use-ai' ? null : parseInt(overrideScore),
        feedback: feedback || null,
      };

      await apiClient.post(
        `/api/v1/sessions/${sessionId}/feedback`,
        payload
      );

      onUpdate && onUpdate();
    } catch (error) {
      console.error('Error saving rubric feedback:', error);
      alert('Failed to save feedback. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-[#1a1d27] border border-[#30363d] rounded-lg p-4 mb-3">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h4 className="text-white font-semibold mb-2">{rubric.name}</h4>
          <div className="flex items-center gap-3 mb-3">
            <ScoreBadge score={aiScore} />
            <span className="text-[#8b949e] text-xs">AI Generated Score</span>
          </div>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-[#8b949e] hover:text-white transition ml-4"
        >
          {isExpanded ? '▼' : '▶'}
        </button>
      </div>

      {isExpanded && (
        <div className="mt-4 space-y-4 border-t border-[#30363d] pt-4">
          {rubric.justification && (
            <div>
              <p className="text-[#8b949e] text-xs uppercase tracking-wider mb-2">AI Justification</p>
              <p className="text-[#c9d1d9] text-sm leading-relaxed">{rubric.justification}</p>
            </div>
          )}

          {rubric.keyContributions && rubric.keyContributions.length > 0 && (
            <div>
              <p className="text-[#8b949e] text-xs uppercase tracking-wider mb-2">Key Contributions</p>
              <ul className="space-y-1">
                {rubric.keyContributions.map((contribution, idx) => (
                  <li key={idx} className="text-[#c9d1d9] text-sm flex items-start gap-2">
                    <span className="text-[#58a6ff] mt-0.5">•</span>
                    <span>{contribution}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <label className="text-[#8b949e] text-xs uppercase tracking-wider mb-2 block">
              Override AI Score
            </label>
            <select
              value={overrideScore}
              onChange={(e) => setOverrideScore(e.target.value)}
              className="bg-[#0f1117] border border-[#30363d] text-white rounded px-3 py-2 w-full mb-3 text-sm"
            >
              <option value="use-ai">Use AI Score</option>
              {Object.entries(BLOOM_LEVELS).map(([score, label]) => (
                <option key={score} value={score}>
                  {score} - {label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[#8b949e] text-xs uppercase tracking-wider mb-2 block">
              Coach Feedback/Comments
            </label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Add your feedback for this rubric..."
              className="bg-[#0f1117] border border-[#30363d] text-white rounded px-3 py-2 w-full text-sm resize-none focus:outline-none focus:border-[#58a6ff]"
              rows={3}
            />
          </div>

          <button
            onClick={handleSave}
            disabled={isSaving}
            className="bg-[#238636] hover:bg-[#2ea043] text-white px-4 py-2 rounded text-sm font-medium transition disabled:opacity-50"
          >
            {isSaving ? 'Saving...' : 'Save'}
          </button>
        </div>
      )}
    </div>
  );
}

function ParticipantCard({ participant, sessionId, rubrics, onUpdate }) {
  return (
    <div className="bg-[#1a1d27] border border-[#30363d] rounded-xl p-6 mb-6">
      <div className="flex items-center gap-4 mb-6 pb-6 border-b border-[#30363d]">
        {participant.avatar && (
          <img
            src={participant.avatar}
            alt={participant.name}
            className="w-12 h-12 rounded-full object-cover"
          />
        )}
        <div>
          <h3 className="text-white font-bold text-lg">{participant.name}</h3>
          <p className="text-[#8b949e] text-sm">{participant.email || 'No email'}</p>
        </div>
      </div>

      <div className="space-y-0">
        {rubrics.map((rubric) => (
          <RubricItem
            key={rubric.id}
            participant={participant}
            rubric={rubric}
            sessionId={sessionId}
            onUpdate={onUpdate}
          />
        ))}
      </div>
    </div>
  );
}

export default function CoachScoreReviewPage({ params }) {
  const { sessionId } = params;
  const [feedbackData, setFeedbackData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSavingAll, setIsSavingAll] = useState(false);
  const [isReleasing, setIsReleasing] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  useEffect(() => {
    const loadFeedback = async () => {
      try {
        const response = await apiClient.get(`/api/v1/sessions/${sessionId}/feedback`);
        setFeedbackData(response.data || []);
      } catch (error) {
        console.error('Error loading feedback:', error);
        setFeedbackData(MOCK_FEEDBACK_DATA);
      } finally {
        setLoading(false);
      }
    };

    loadFeedback();
  }, [sessionId]);

  const handleReleaseConfirm = async () => {
    try {
      setIsReleasing(true);
      await apiClient.patch(`/api/v1/sessions/${sessionId}/feedback`, {
        action: 'release'
      });
      setShowConfirmDialog(false);
      alert('Feedback released to all students!');
      const response = await apiClient.get(`/api/v1/sessions/${sessionId}/feedback`);
      setFeedbackData(response.data || []);
    } catch (error) {
      console.error('Error releasing feedback:', error);
      alert('Failed to release feedback. Please try again.');
    } finally {
      setIsReleasing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f1117] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
          <p className="text-[#8b949e]">Loading feedback data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f1117] text-white p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-2">Session Score Review</h1>
          <p className="text-[#8b949e]">Review and adjust AI-generated scores for all participants</p>
        </div>

        <div className="space-y-6 mb-10">
          {feedbackData.length === 0 ? (
            <div className="bg-[#1a1d27] border border-[#30363d] rounded-lg p-10 text-center">
              <p className="text-[#8b949e]">No participants found for this session</p>
            </div>
          ) : (
            feedbackData.map((participantFeedback) => (
              <ParticipantCard
                key={participantFeedback.participant.id}
                participant={participantFeedback.participant}
                rubrics={participantFeedback.rubrics}
                sessionId={sessionId}
                onUpdate={() => {}}
              />
            ))
          )}
        </div>

        <div className="flex gap-4 sticky bottom-6">
          <button
            onClick={() => setIsSavingAll(true)}
            disabled={isSavingAll || feedbackData.length === 0}
            className="flex-1 bg-[#1f6feb] hover:bg-[#388bfd] text-white px-6 py-3 rounded-lg font-semibold transition disabled:opacity-50"
          >
            {isSavingAll ? 'Saving...' : 'Save All Adjustments'}
          </button>

          <button
            onClick={() => setShowConfirmDialog(true)}
            disabled={isReleasing || feedbackData.length === 0}
            className="flex-1 bg-[#238636] hover:bg-[#2ea043] text-white px-6 py-3 rounded-lg font-semibold transition disabled:opacity-50"
          >
            {isReleasing ? 'Releasing...' : 'Release Feedback to Students'}
          </button>
        </div>

        {showConfirmDialog && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-[#1a1d27] border border-[#30363d] rounded-xl p-8 max-w-md">
              <h2 className="text-xl font-bold text-white mb-4">Release Feedback?</h2>
              <p className="text-[#8b949e] mb-6">
                This will release all scores and feedback to students. This action cannot be undone.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => setShowConfirmDialog(false)}
                  className="flex-1 bg-[#30363d] hover:bg-[#424752] text-white px-4 py-2 rounded font-medium transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReleaseConfirm}
                  className="flex-1 bg-[#238636] hover:bg-[#2ea043] text-white px-4 py-2 rounded font-medium transition"
                >
                  Release
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const MOCK_FEEDBACK_DATA = [
  {
    participant: {
      id: '1',
      name: 'Alex Johnson',
      email: 'alex.johnson@example.com',
      avatar: 'https://ui-avatars.com/api/?name=Alex+Johnson'
    },
    rubrics: [
      {
        id: 'rubric-1',
        name: 'Critical Thinking',
        aiScore: 4,
        justification: 'Participant demonstrated strong analytical skills by questioning assumptions and synthesizing information from multiple perspectives.',
        keyContributions: [
          'Identified gaps in the proposed solution',
          'Connected concepts across different domains',
          'Challenged team assumptions constructively'
        ]
      },
      {
        id: 'rubric-2',
        name: 'Communication',
        aiScore: 5,
        justification: 'Clear articulation of ideas with excellent listening skills. Adapted communication style to match audience understanding.',
        keyContributions: [
          'Provided clear explanations of complex ideas',
          'Asked clarifying questions',
          'Summarized key points for the group'
        ]
      }
    ]
  },
  {
    participant: {
      id: '2',
      name: 'Jordan Smith',
      email: 'jordan.smith@example.com',
      avatar: 'https://ui-avatars.com/api/?name=Jordan+Smith'
    },
    rubrics: [
      {
        id: 'rubric-3',
        name: 'Critical Thinking',
        aiScore: 3,
        justification: 'Participant followed most discussion but limited original insights. Mostly responded to others rather than initiating.',
        keyContributions: [
          'Agreed with valid points',
          'Answered direct questions',
          'Participated in final group decision'
        ]
      },
      {
        id: 'rubric-4',
        name: 'Communication',
        aiScore: 3,
        justification: 'Adequate communication but somewhat reserved. Spoke when prompted but did not volunteer contributions.',
        keyContributions: [
          'Shared relevant experience when asked',
          'Nodded in agreement on key points',
          'Did not interrupt others'
        ]
      }
    ]
  }
];
