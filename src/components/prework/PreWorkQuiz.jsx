'use client';

import { useState, useEffect } from 'react';
import { preworkService } from '@/services/api/prework.service';

export default function PreWorkQuiz({ quiz, onComplete, experienceId }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const currentQuestion = quiz?.questions?.[currentQuestionIndex];
  const totalQuestions = quiz?.questions?.length || 0;
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;
  const allAnswered = Object.keys(answers).length === totalQuestions;

  // Timer effect
  useEffect(() => {
    if (!quiz?.timeLimit || submitted) return;

    setTimeRemaining(quiz.timeLimit);
    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev && prev <= 1) {
          handleSubmit();
          return 0;
        }
        return prev ? prev - 1 : null;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [quiz?.timeLimit, submitted]);

  const handleSelectAnswer = (answerIndex) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: answerIndex,
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = async () => {
    if (loading) return;

    setLoading(true);
    setError(null);

    try {
      const result = await preworkService.submitQuiz(quiz.id, answers);
      setResults(result);
      setSubmitted(true);

      if (onComplete) {
        onComplete(result);
      }
    } catch (err) {
      setError(err.message || 'Failed to submit quiz');
      console.error('Quiz submission error:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds) => {
    if (!seconds) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!quiz || !currentQuestion) {
    return (
      <div className="flex items-center justify-center p-8 text-gray-400">
        Loading quiz...
      </div>
    );
  }

  // Results view
  if (submitted && results) {
    const passedCount = results.results.filter((r) => r.correct).length;
    const isPassed = results.passed;

    return (
      <div className="space-y-6 p-6 bg-[#0f1117] rounded-lg border border-gray-700">
        {/* Score Header */}
        <div className="text-center space-y-2 pb-6 border-b border-gray-700">
          <h2 className="text-2xl font-bold text-white">
            {isPassed ? 'Quiz Passed!' : 'Quiz Not Passed'}
          </h2>
          <p className="text-3xl font-bold text-blue-500">
            {results.score}%
          </p>
          <p className="text-gray-400">
            {passedCount} out of {results.totalQuestions} questions correct
          </p>
        </div>

        {/* Results by Question */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Review</h3>
          {results.results.map((result, idx) => {
            const question = quiz.questions.find((q) => q.id === result.questionId);
            return (
              <div
                key={result.questionId}
                className="p-4 rounded border border-gray-600 space-y-3"
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center font-bold text-sm ${
                      result.correct
                        ? 'bg-green-600 text-white'
                        : 'bg-red-600 text-white'
                    }`}
                  >
                    {result.correct ? '✓' : '✗'}
                  </div>
                  <div className="flex-grow">
                    <p className="font-medium text-white">
                      Question {idx + 1}: {question?.question}
                    </p>
                  </div>
                </div>

                {!result.correct && (
                  <div className="ml-9 space-y-2 text-sm">
                    <p className="text-gray-300">
                      Your answer:{' '}
                      <span className="text-red-400">
                        {question?.answers[answers[result.questionId]]}
                      </span>
                    </p>
                    <p className="text-gray-300">
                      Correct answer:{' '}
                      <span className="text-green-400">
                        {question?.answers[result.correctAnswer]}
                      </span>
                    </p>
                    {result.explanation && (
                      <p className="text-gray-400 italic mt-2">
                        {result.explanation}
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Pass/Fail message */}
        <div
          className={`p-4 rounded ${
            isPassed
              ? 'bg-green-900 border border-green-600 text-green-200'
              : 'bg-red-900 border border-red-600 text-red-200'
          }`}
        >
          {isPassed
            ? 'Congratulations! You have completed the pre-work requirements.'
            : 'Please review the material and try again to pass this quiz.'}
        </div>
      </div>
    );
  }

  // Quiz view
  return (
    <div className="space-y-6 p-6 bg-[#0f1117] rounded-lg border border-gray-700">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-700">
        <div>
          <h2 className="text-xl font-bold text-white">{quiz.title}</h2>
          <p className="text-sm text-gray-400 mt-1">
            Question {currentQuestionIndex + 1} of {totalQuestions}
          </p>
        </div>
        {quiz.timeLimit && (
          <div className="text-right">
            <div className="text-sm text-gray-400">Time Remaining</div>
            <div
              className={`text-2xl font-bold ${
                timeRemaining && timeRemaining <= 60
                  ? 'text-red-500'
                  : 'text-blue-500'
              }`}
            >
              {formatTime(timeRemaining)}
            </div>
          </div>
        )}
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{
              width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">
          {currentQuestion.question}
        </h3>

        {/* Answers */}
        <div className="space-y-3">
          {currentQuestion.answers.map((answer, index) => (
            <label
              key={index}
              className="flex items-center p-4 rounded border border-gray-600 hover:border-blue-500 hover:bg-blue-900/20 cursor-pointer transition-colors"
            >
              <input
                type="radio"
                name={`question-${currentQuestion.id}`}
                value={index}
                checked={answers[currentQuestion.id] === index}
                onChange={() => handleSelectAnswer(index)}
                className="w-4 h-4 text-blue-500 cursor-pointer"
              />
              <span className="ml-3 text-white">{answer}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="p-4 rounded bg-red-900 border border-red-600 text-red-200">
          {error}
        </div>
      )}

      {/* Navigation */}
      <div className="flex gap-3 pt-4 border-t border-gray-700">
        <button
          onClick={handlePrev}
          disabled={currentQuestionIndex === 0}
          className="px-4 py-2 rounded border border-gray-600 text-white hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Previous
        </button>

        {!isLastQuestion ? (
          <button
            onClick={handleNext}
            disabled={answers[currentQuestion.id] === undefined}
            className="ml-auto px-6 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={!allAnswered || loading}
            className="ml-auto px-6 py-2 rounded bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
            {loading ? (
              <>
                <span className="inline-block animate-spin">⚙️</span>
                Submitting...
              </>
            ) : (
              'Submit Quiz'
            )}
          </button>
        )}
      </div>
    </div>
  );
}
