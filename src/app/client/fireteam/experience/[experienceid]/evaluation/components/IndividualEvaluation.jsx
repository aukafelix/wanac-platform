import React, { useState } from 'react';
import { bloomTaxonomyColors } from '../../../../../../../types/evaluation';

export default function IndividualEvaluation({ individualEvaluations, userRole = 'client' }) {
  const [expandedEvaluation, setExpandedEvaluation] = useState(null);

  if (!individualEvaluations || individualEvaluations.length === 0) return null;

  // Filter evaluations based on user role
  const filteredEvaluations = individualEvaluations.filter(evaluation => {
    if (userRole === 'client') {
      // Show only the current user's evaluation
      const currentUserId = localStorage.getItem('user_id') || 'clarence';
      return evaluation.participantId === currentUserId;
    }
    return true; // Show all for coach/admin
  });

  const toggleExpanded = (evaluationId, rubricId) => {
    const key = `${evaluationId}-${rubricId}`;
    setExpandedEvaluation(expandedEvaluation === key ? null : key);
  };

  return (
    <div className="space-y-6">
      {filteredEvaluations.map((evaluation) => (
        <div key={evaluation.participantId} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              Individual Evaluation
              {userRole === 'client' ? '' : ` - ${evaluation.participantName}`}
            </h3>
            <p className="text-sm text-gray-600">
              Our system monitored your discussion throughout the experience and analyzed it against the experience rubrics.
            </p>
          </div>

          <div className="space-y-4">
            {evaluation.evaluations.map((rubricEvaluation) => (
              <div key={rubricEvaluation.rubricId} className="border border-gray-100 rounded-lg p-4">
                {/* Rubric Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">
                      {rubricEvaluation.rubricTitle}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {rubricEvaluation.rubricDescription}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span 
                      className="px-3 py-1 rounded-full text-sm font-medium text-white"
                      style={{ backgroundColor: bloomTaxonomyColors[rubricEvaluation.bloomLevel.level] }}
                    >
                      {rubricEvaluation.bloomLevel.level}
                    </span>
                    <button
                      onClick={() => toggleExpanded(evaluation.participantId, rubricEvaluation.rubricId)}
                      className="text-sm text-blue-600 hover:text-blue-800 underline"
                    >
                      More Details →
                    </button>
                  </div>
                </div>

                {/* Contributions */}
                <div className="mb-3">
                  <ul className="space-y-2">
                    {rubricEvaluation.contributions.map((contribution, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="text-blue-500 mt-1">•</span>
                        <span>{contribution}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Summary */}
                <div className="bg-blue-50 p-3 rounded-lg mb-3">
                  <p className="text-sm text-gray-700">{rubricEvaluation.summary}</p>
                </div>

                {/* Expanded Details */}
                {expandedEvaluation === `${evaluation.participantId}-${rubricEvaluation.rubricId}` && (
                  <div className="border-t border-gray-200 pt-3">
                    <h5 className="font-medium text-gray-900 mb-2">What does this mean?</h5>
                    <p className="text-sm text-gray-700">{rubricEvaluation.explanation}</p>
                    
                    {/* Bloom's Taxonomy Score */}
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">Bloom's Taxonomy Score</span>
                        <span className="text-sm font-bold text-gray-900">
                          {rubricEvaluation.bloomLevel.score}/6
                        </span>
                      </div>
                      <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full"
                          style={{ 
                            width: `${(rubricEvaluation.bloomLevel.score / 6) * 100}%`,
                            backgroundColor: bloomTaxonomyColors[rubricEvaluation.bloomLevel.level]
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
