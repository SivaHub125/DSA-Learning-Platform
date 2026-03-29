'use client';

import Link from 'next/link';
import { Search, ArrowRight } from 'lucide-react';
import { algorithms, categories } from '@/data/algorithms';

export function HomePage() {
  const difficultyColor = {
    beginner: 'bg-green-100 text-green-800 border-green-200',
    intermediate: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    advanced: 'bg-red-100 text-red-800 border-red-200',
  };

  const categoryColors = {
    blue: 'from-blue-500 to-blue-600',
    purple: 'from-purple-500 to-purple-600',
    green: 'from-emerald-500 to-emerald-600',
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-full text-blue-400 text-sm mb-6">
            <Search className="w-4 h-4" />
            Interactive DSA Learning
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Learn DSA
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Visually</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
            Master Data Structures & Algorithms with interactive visualizations, 
            step-by-step explanations, and hands-on practice.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity">
              Start Learning
            </button>
            <button className="px-8 py-4 bg-white/10 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 transition-colors">
              View Roadmap
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {categories.map((category, idx) => {
            const categoryAlgorithms = algorithms.filter(a => a.category === category.id);
            return (
              <div
                key={category.id}
                className={`bg-gradient-to-br ${categoryColors[category.color]} p-6 rounded-2xl text-white`}
              >
                <div className="text-4xl mb-4">{category.icon}</div>
                <h2 className="text-2xl font-bold mb-2">{category.name}</h2>
                <p className="opacity-80 mb-4">{categoryAlgorithms.length} topics</p>
                <div className="space-y-2">
                  {categoryAlgorithms.slice(0, 3).map(alg => (
                    <Link
                      key={alg.id}
                      href={`/algorithms/${alg.id}`}
                      className="block px-3 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors text-sm"
                    >
                      {alg.title}
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <section>
          <h2 className="text-3xl font-bold text-white mb-8">All Topics</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {algorithms.map(algorithm => (
              <Link
                key={algorithm.id}
                href={`/algorithms/${algorithm.id}`}
                className="group bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-blue-500/50 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${difficultyColor[algorithm.difficulty]}`}>
                    {algorithm.difficulty}
                  </span>
                  <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{algorithm.title}</h3>
                <div className="flex gap-4 text-sm text-gray-400">
                  <span>⏱️ {algorithm.timeComplexity}</span>
                  <span>💾 {algorithm.spaceComplexity}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <footer className="mt-16 text-center text-gray-500">
          <p>Built with Next.js • Interactive DSA Learning Platform</p>
        </footer>
      </div>
    </div>
  );
}
