'use client';

import { useState, useEffect } from 'react';
import type { Step } from '@/data/algorithms';

interface ArrayVisualizerProps {
  initialArray: number[];
  steps: Step[];
  onStepChange?: (stepIndex: number) => void;
}

export function ArrayVisualizer({ initialArray, steps, onStepChange }: ArrayVisualizerProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isPlaying && isMounted) {
      const timer = setInterval(() => {
        setCurrentStep(prev => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 1500);
      return () => clearInterval(timer);
    }
  }, [isPlaying, steps.length, isMounted]);

  useEffect(() => {
    onStepChange?.(currentStep);
  }, [currentStep, onStepChange]);

  const currentStepData = steps[currentStep];

  if (!isMounted) {
    return (
      <div className="flex items-center justify-center h-48 bg-gray-100 rounded-lg">
        <span className="text-gray-500">Loading...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 justify-center">
        <button
          onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
          disabled={currentStep === 0}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors"
        >
          ← Previous
        </button>
        <span className="px-4 py-2 bg-gray-200 rounded-lg font-mono">
          Step {currentStep + 1} / {steps.length}
        </span>
        <button
          onClick={() => setCurrentStep(prev => Math.min(steps.length - 1, prev + 1))}
          disabled={currentStep === steps.length - 1}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors"
        >
          Next →
        </button>
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className={`px-4 py-2 rounded-lg transition-colors ${
            isPlaying ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
          } text-white`}
        >
          {isPlaying ? '⏸ Pause' : '▶ Play'}
        </button>
        <button
          onClick={() => { setCurrentStep(0); setIsPlaying(false); }}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          ↺ Reset
        </button>
      </div>

      <div className="flex items-end justify-center gap-2 p-6 bg-gradient-to-b from-slate-800 to-slate-900 rounded-xl min-h-[200px]">
        {initialArray.map((value, index) => {
          const isHighlighted = currentStepData?.highlight?.includes(index);
          const isFound = currentStepData?.description?.includes('Found') || currentStepData?.description?.includes('🎯');
          const isSwapping = currentStepData?.highlight?.length === 2 && 
            currentStepData.highlight.includes(index);

          return (
            <div key={index} className="flex flex-col items-center gap-2">
              <div
                className={`
                  relative w-16 h-20 rounded-lg flex items-center justify-center font-bold text-xl transition-all duration-500
                  ${isFound && isHighlighted ? 'bg-yellow-400 text-black scale-110 shadow-lg shadow-yellow-400/50' : ''}
                  ${isSwapping ? 'bg-orange-400 text-black scale-105' : ''}
                  ${isHighlighted && !isFound && !isSwapping ? 'bg-blue-400 text-white scale-105' : ''}
                  ${!isHighlighted ? 'bg-slate-700 text-white' : ''}
                `}
                style={{
                  transform: isHighlighted ? 'translateY(-8px)' : 'translateY(0)',
                }}
              >
                <span className="relative z-10">{value}</span>
                {isHighlighted && (
                  <div className="absolute -top-8 w-2 h-2 bg-blue-400 rotate-45" />
                )}
              </div>
              <span className="text-gray-400 text-sm font-mono">[{index}]</span>
            </div>
          );
        })}
      </div>

      {currentStepData?.variables && Object.keys(currentStepData.variables).length > 0 && (
        <div className="flex flex-wrap gap-4 justify-center p-4 bg-gray-100 rounded-lg">
          {Object.entries(currentStepData.variables).map(([key, value]) => (
            <div key={key} className="px-4 py-2 bg-white rounded-lg shadow">
              <span className="text-gray-500 font-mono text-sm">{key}: </span>
              <span className="font-bold text-blue-600">
                {Array.isArray(value) ? `[${value.join(', ')}]` : String(value)}
              </span>
            </div>
          ))}
        </div>
      )}

      <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
        <p className="text-blue-800 font-medium">{currentStepData?.description}</p>
      </div>
    </div>
  );
}
