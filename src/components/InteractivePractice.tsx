'use client';

import { useState } from 'react';
import { ArrayVisualizer } from '@/components/visualizations/ArrayVisualizer';
import type { PracticeProblem, Step } from '@/data/algorithms';

interface InteractivePracticeProps {
  problem: PracticeProblem;
  algorithmId: string;
}

export function InteractivePractice({ problem, algorithmId }: InteractivePracticeProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [showHint, setShowHint] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [attempts, setAttempts] = useState(0);

  const steps = problem.steps;

  const handleSubmit = () => {
    const numAnswer = parseInt(userAnswer);
    setAttempts(prev => prev + 1);
    
    if (numAnswer === problem.correctAnswer) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
      setTimeout(() => setIsCorrect(null), 2000);
    }
  };

  const resetPractice = () => {
    setCurrentStep(0);
    setUserAnswer('');
    setIsCorrect(null);
    setShowHint(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 rounded-xl text-white">
        <h3 className="text-xl font-bold mb-2">✍️ Practice: {problem.title}</h3>
        <p className="opacity-90">{problem.description}</p>
      </div>

      <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
        <h4 className="font-semibold text-gray-700 mb-4">Interactive Visualization</h4>
        <ArrayVisualizer
          initialArray={problem.initialArray}
          steps={steps}
          onStepChange={setCurrentStep}
        />
      </div>

      <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold text-gray-700">Your Answer</h4>
          <div className="flex gap-2">
            <button
              onClick={() => setShowHint(!showHint)}
              className="px-3 py-1 text-sm bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition-colors"
            >
              💡 {showHint ? 'Hide Hint' : 'Show Hint'}
            </button>
            <button
              onClick={resetPractice}
              className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              ↺ Try Again
            </button>
          </div>
        </div>

        {showHint && (
          <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-800">
            💡 Hint: {problem.hint}
          </div>
        )}

        <div className="flex gap-4">
          <input
            type="number"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Enter your answer..."
            className={`flex-1 px-4 py-3 border-2 rounded-lg font-mono text-lg focus:outline-none focus:ring-2 transition-colors ${
              isCorrect === true ? 'border-green-500 bg-green-50 focus:ring-green-500' :
              isCorrect === false ? 'border-red-500 bg-red-50 focus:ring-red-500 animate-shake' :
              'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
            }`}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          />
          <button
            onClick={handleSubmit}
            disabled={!userAnswer}
            className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            Submit
          </button>
        </div>

        {isCorrect === true && (
          <div className="mt-4 p-4 bg-green-100 border border-green-300 rounded-lg text-green-800 animate-bounce">
            🎉 Correct! Great job! Answer: {problem.correctAnswer}
          </div>
        )}

        {isCorrect === false && (
          <div className="mt-4 p-4 bg-red-100 border border-red-300 rounded-lg text-red-800">
            ❌ Not quite right. Try again!
          </div>
        )}

        {attempts > 0 && isCorrect !== true && (
          <p className="mt-2 text-sm text-gray-500">
            Attempts: {attempts}
          </p>
        )}
      </div>
    </div>
  );
}
