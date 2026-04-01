'use client';

import { useState, useEffect } from 'react';
import { preworkService } from '@/services/api/prework.service';
import PreWorkQuiz from './PreWorkQuiz';

export default function PreWorkGate({ experienceId, children }) {
  const [checkData, setCheckData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [quizData, setQuizData] = useState(null);
  const [loadingQuiz, setLoadingQuiz] = useState(false);

  useEffect(() => {
    checkPreWorkCompletion();
  }, [experienceId]);

  const checkPreWorkCompletion = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await preworkService.checkCompletion(experienceId);
      setCheckData(data);
    } catch (err) {
      console.error('Error checking pre-work completion:', err);
      setError(err.message || 'Failed to check pre-work status');
    } finally {
      setLoading(false);
    }
  };

  const openQuiz = async (quizId) => {
    setSelectedQuiz(quizId);
    setLoadingQuiz(true);

    try {
      const quiz = await preworkService.getQuiz(quizId);
      setQuizData(quiz);
    } catch (err) {
      console.error('Error loading quiz:', err);
      setError(err.message || 'Failed to load quiz');
      setSelectedQuiz(null);
    } finally {
      setLoadingQuiz(false);
    }
  };

  const handleQuizComplete = () => {
    setSelectedQuiz(null);
    setQuizData(null);
    checkPreWorkCompletion();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0f1117]">
        <div className="text-center space-y-4">
          <div className="inline-block animate-spin">
            <div className="w-12 h-12 border-4 border-gray-700 border-t-blue-500 rounded-full" />
          </div>
          <p className="text-gray-400">Checking pre-work requirements...</p>
        </div>
      </div>
    );
  }

  // All quizzes passed - render children
  if (checkData?.passed) {
    return children;
  }

  // Quiz modal open
  if (selectedQuiz && quizData) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-[#0f1117] rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-700">
          <div className="sticky top-0 flex items-center justify-between p-6 border-b border-gray-700 bg-[#0f1117]">
            <h2 className="text-xl font-bold text-white">{quizData.title}</h2>
            <button
              onClick={() => {
                setSelectedQuiz(null);
                setQuizData(null);
              }}
              className="text-gray-400 hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>
          <div className="p-6">
            <PreWorkQuiz
              quiz={quizData}
              onComplete={handleQuizComplete}
              experienceId={experienceId}
            />
          </div>
        </div>
      </div>
    );
  }

  // Show pre-work gate
  return (
    <div className="min-h-screen bg-[#0f1117] p-6 flex items-center justify-center">
      <div className="max-w-2xl w-full space-y-6">
        {/* Header */}
        <div className="text-center space-y-2 pb-6 border-b border-gray-700">
          <h1 className="text-3xl font-bold text-white">Pre-Work Required</h1>
          <p className="text-gray-400">
            Complete all required quizzes to access this session.
          </p>
        </div>

        {/* Error message */}
        {error && (
          <div className="p-4 rounded bg-red-900 border border-red-600 text-red-200">
            {error}
          </div>
        )}

        {/* Quizzes list */}
        <div className="space-y-3">
          {checkData?.quizzes?.map((quiz) => (
            <div
              key={quiz.id}
              className="p-4 rounded border border-gray-600 hover:border-blue-500 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-grow">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-white">
                      {quiz.title}
                    </h3>
                    <span
                      className={`inline-block px-2 py-1 text-xs rounded font-medium ${
                        quiz.passed
                          ? 'bg-green-900 text-green-200 border border-green-600'
                          : quiz.attempts > 0
                            ? 'bg-yellow-900 text-yellow-200 border border-yellow-600'
                            : 'bg-gray-700 text-gray-200 border border-gray-600'
                      }`}
                    >
                      {quiz.passed
                        ? 'Passed'
                        : quiz.attempts > 0
                          ? 'Not Passed'
                          : 'Not Started'}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm text-gray-300">
                    <div>
                      <span className="text-gray-400">Questions:</span>{' '}
                      {quiz.questionCount}
                    </div>
                    <div>
                      <span className="text-gray-400">Passing Score:</span>{' '}
                      {quiz.passingScore}%
                    </div>
                    <div>
                      <span className="text-gray-400">Attempts:</span>{' '}
                      {quiz.attempts} / {quiz.maxAttempts}
                    </div>
                    {quiz.attempts > 0 && (
                      <div>
                        <span className="text-gray-400">Best Score:</span>{' '}
                        {quiz.bestScore}%
                      </div>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => openQuiz(quiz.id)}
                  disabled={quiz.attempts >= quiz.maxAttempts && !quiz.passed}
                  className={`flex-shrink-0 px-4 py-2 rounded font-medium transition-colors ${
                    quiz.attempts >= quiz.maxAttempts && !quiz.passed
                      ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                      : quiz.passed
                        ? 'bg-green-600 text-white hover:bg-green-700'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {quiz.passed
                    ? 'Passed'
                    : quiz.attempts >= quiz.maxAttempts
                      ? 'Out of Attempts'
                      : 'Take Quiz'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Help text */}
        <div className="p-4 rounded bg-gray-800 border border-gray-700 text-gray-300 text-sm">
          <p>
            You must pass all required quizzes to proceed. Click "Take Quiz" to
            start or retake any quiz.
          </p>
        </div>
      </div>
    </div>
  );
}
