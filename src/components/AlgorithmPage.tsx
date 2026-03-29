'use client';

import Link from 'next/link';
import { ArrowLeft, Clock, Database, ChevronRight } from 'lucide-react';
import { getAlgorithmById, getAlgorithmsByCategory } from '@/data/algorithms';
import { InteractivePractice } from '@/components/InteractivePractice';

interface AlgorithmPageProps {
  id: string;
}

export function AlgorithmPage({ id }: AlgorithmPageProps) {
  const algorithm = getAlgorithmById(id);

  if (!algorithm) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Algorithm not found</h1>
          <Link href="/" className="text-blue-500 hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const relatedAlgorithms = getAlgorithmsByCategory(algorithm.category).filter(a => a.id !== id);

  const difficultyColor = {
    beginner: 'bg-green-100 text-green-800',
    intermediate: 'bg-yellow-100 text-yellow-800',
    advanced: 'bg-red-100 text-red-800',
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Algorithms
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
            <div className="flex items-center gap-3 mb-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${difficultyColor[algorithm.difficulty]}`}>
                {algorithm.difficulty}
              </span>
              <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
                {algorithm.category}
              </span>
            </div>
            <h1 className="text-4xl font-bold mb-2">{algorithm.title}</h1>
            <div className="flex gap-6 mt-4">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>Time: {algorithm.timeComplexity}</span>
              </div>
              <div className="flex items-center gap-2">
                <Database className="w-5 h-5" />
                <span>Space: {algorithm.spaceComplexity}</span>
              </div>
            </div>
          </div>

          <div className="p-8">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">📖 Understanding in Simple Terms</h2>
              <div className="prose prose-lg max-w-none">
                <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
                  <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                    {algorithm.laymanExplanation}
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">💻 Pseudocode</h2>
              <div className="bg-gray-900 rounded-xl p-6 overflow-x-auto">
                <pre className="text-green-400 font-mono text-sm leading-relaxed">
                  {algorithm.pseudocode.map((line, i) => (
                    <div key={i} className="hover:bg-gray-800 px-2 py-1 -mx-2 rounded">
                      <span className="text-gray-600 select-none mr-4">{String(i + 1).padStart(2, ' ')}</span>
                      {line || ' '}
                    </div>
                  ))}
                </pre>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">🎯 Practice</h2>
              <InteractivePractice problem={algorithm.practice} algorithmId={algorithm.id} />
            </section>

            {relatedAlgorithms.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">📚 Related Topics</h2>
                <div className="grid gap-4">
                  {relatedAlgorithms.map(related => (
                    <Link
                      key={related.id}
                      href={`/algorithms/${related.id}`}
                      className="flex items-center justify-between p-4 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors group"
                    >
                      <div>
                        <h3 className="font-semibold text-gray-800">{related.title}</h3>
                        <span className={`text-sm ${difficultyColor[related.difficulty].split(' ')[1]}`}>
                          {related.difficulty}
                        </span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
