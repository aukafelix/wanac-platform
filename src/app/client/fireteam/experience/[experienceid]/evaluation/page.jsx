"use client";

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { useEvaluationData } from './hooks/useEvaluationData';
import ConversationMap from './components/ConversationMap';
import GroupBalanceScore from './components/GroupBalanceScore';
import IndividualEvaluation from './components/IndividualEvaluation';
import RoleTabView from './components/RoleTabView';
import Sidebar from '../../../../../../../components/dashboardcomponents/sidebar';
import AdminSidebar from '../../../../../../../components/dashboardcomponents/adminsidebar';

export default function EvaluationPage() {
  const searchParams = useSearchParams();
  const experienceId = searchParams?.get('experienceId');
  const fireteamId = searchParams?.get('fireteamId');
  const recordingId = searchParams?.get('recordingId');
  const hasAI = searchParams?.get('hasAI') === 'true';
  const isAdmin = searchParams?.get('admin') === 'true';

  // Determine user role
  const userRole = isAdmin ? 'admin' : 'client';

  const { evaluationData, loading, error } = useEvaluationData(
    recordingId,
    fireteamId,
    hasAI,
    userRole
  );

  // Loading state
  if (loading) {
    return (
      <div className="h-screen flex bg-gray-50">
        <Sidebar collapsed={true} setCollapsed={() => {}} />
        <div className="flex-1 flex flex-col">
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading evaluation data...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="h-screen flex bg-gray-50">
        <Sidebar collapsed={true} setCollapsed={() => {}} />
        <div className="flex-1 flex flex-col">
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="text-red-500 text-6xl mb-4">⚠️</div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Evaluation</h2>
              <p className="text-gray-600 mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!evaluationData) {
    return (
      <div className="h-screen flex bg-gray-50">
        <Sidebar collapsed={true} setCollapsed={() => {}} />
        <div className="flex-1 flex flex-col">
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="text-gray-500 text-6xl mb-4">📊</div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">No Evaluation Data</h2>
              <p className="text-gray-600">No evaluation data available for this session.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Sidebar */}
      {isAdmin ? (
        <AdminSidebar collapsed={true} setCollapsed={() => {}} />
      ) : (
        <Sidebar collapsed={true} setCollapsed={() => {}} />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col ml-16">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Session Evaluation
              </h1>
              <p className="text-gray-600 mt-1">
                {evaluationData.sessionInfo.experienceTitle} • {evaluationData.sessionInfo.duration}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-500">
                {evaluationData.sessionInfo.totalParticipants} participants
              </div>
              <button
                onClick={() => window.location.href = '/client/fireteam'}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Back to Fireteam
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Top Row - Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ConversationMap 
                conversationMap={evaluationData.conversationMap}
                participants={evaluationData.groupBalanceScore.participants}
              />
              <GroupBalanceScore 
                groupBalanceScore={evaluationData.groupBalanceScore}
              />
            </div>

            {/* Bottom Row - Individual Evaluation */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <RoleTabView userRole={userRole}>
                <IndividualEvaluation 
                  individualEvaluations={evaluationData.individualEvaluations}
                  userRole={userRole}
                />
              </RoleTabView>
            </div>

            {/* Footer Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="text-blue-500 text-lg">ℹ️</div>
                <div className="text-sm text-blue-800">
                  <p className="font-medium mb-1">About This Evaluation</p>
                  <p>
                    This evaluation is based on {hasAI ? 'AI analysis of your meeting recording and transcript' : 'basic participation metrics'}. 
                    The analysis uses Bloom's Taxonomy to assess cognitive engagement levels across different learning objectives.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
