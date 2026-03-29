# How to Build an Interactive DSA Learning Website

This guide will walk you through building a DSA (Data Structures & Algorithms) learning platform from scratch.

---

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [What is Next.js?](#what-is-nextjs)
3. [Project Setup](#project-setup)
4. [Understanding the Project Structure](#understanding-the-project-structure)
5. [Step 1: Create Data Structure](#step-1-create-data-structure)
6. [Step 2: Create Visualizer Component](#step-2-create-visualizer-component)
7. [Step 3: Create Practice Component](#step-3-create-practice-component)
8. [Step 4: Create Algorithm Page](#step-4-create-algorithm-page)
9. [Step 5: Create Homepage](#step-5-create-homepage)
10. [Step 6: Set Up Routing](#step-6-set-up-routing)
11. [How to Run and Test](#how-to-run-and-test)
12. [Key Concepts Explained](#key-concepts-explained)

---

## Prerequisites

### What You Need Installed:
1. **Node.js** (v18+) - Download from https://nodejs.org
2. **VS Code** (recommended editor) - Download from https://code.visualstudio.com
3. **Terminal/Command Prompt** - To run commands

### Basic Knowledge Needed:
- JavaScript basics (variables, functions, arrays)
- Basic HTML/CSS understanding
- React knowledge is helpful but not required to start

---

## What is Next.js?

Next.js is a **React framework** that makes building websites easier. Here's why we chose it:

| Feature | Benefit |
|---------|---------|
| **File-based routing** | Create pages by just adding files |
| **Server Components** | Fast page loads |
| **API Routes** | Easy to add backend |
| **Built-in CSS** | Works great with Tailwind |

Think of it like:
- **React** = Building blocks (components)
- **Next.js** = Organized construction system + power tools

---

## Project Setup

### Step 1: Create a New Next.js Project

Open your terminal and run:

```bash
npx create-next-app@latest my-dsa-website
```

You'll see questions - answer like this:

```
√ What is your project named? ... dsa-website
√ Would you like to use TypeScript? ... Yes
√ Would you like to use ESLint? ... Yes
√ Would you like to use Tailwind CSS? ... Yes
√ Would you like your code inside a `src/` directory? ... Yes
√ Would you like to use App Router? ... Yes
√ Would you like to customize the import alias? ... Yes (/@/*)
```

### Step 2: Install Icon Library

```bash
cd my-dsa-website
npm install lucide-react
```

### Step 3: Understand the Folder Structure

After setup, your project looks like this:

```
my-dsa-website/
├── src/
│   ├── app/
│   │   ├── page.tsx          ← This is your HOMEPAGE
│   │   ├── layout.tsx        ← Main layout (headers, etc.)
│   │   └── globals.css       ← Global styles
│   ├── components/           ← Your reusable components
│   └── data/                 ← Your data/content
├── public/                   ← Images, fonts, etc.
├── package.json              ← Project dependencies
└── tailwind.config.js        ← Tailwind settings
```

---

## Understanding the Project Structure

### How Next.js App Router Works

```
src/app/
├── page.tsx              → Shows at: /
├── about/
│   └── page.tsx          → Shows at: /about
├── algorithms/
│   └── [id]/
│       └── page.tsx      → Shows at: /algorithms/any-id
```

The `[id]` folder is a **dynamic route** - it catches any value!

---

## Step 1: Create Data Structure

### What is TypeScript?

TypeScript adds "types" to JavaScript to catch errors early:

```typescript
// JavaScript (no types)
const user = { name: "John", age: 25 }

// TypeScript (with types)
interface User {
  name: string;
  age: number;
}
const user: User = { name: "John", age: 25 }
```

### Create the Data File

Create `src/data/algorithms.ts`:

```typescript
// This defines what an Algorithm looks like
export interface Algorithm {
  id: string;              // Unique identifier
  title: string;           // Display name
  category: 'searching' | 'sorting' | 'data-structures';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  laymanExplanation: string;  // Simple explanation
  pseudocode: string[];       // Code in plain English
  timeComplexity: string;      // How fast it is (e.g., "O(n)")
  spaceComplexity: string;    // How much memory it uses
}

// Example algorithm
export const algorithms: Algorithm[] = [
  {
    id: 'binary-search',
    title: 'Binary Search',
    category: 'searching',
    difficulty: 'beginner',
    laymanExplanation: 'Like finding a word in a dictionary...',
    pseudocode: [
      'function binarySearch(arr, target):',
      '    left = 0',
      '    right = length(arr) - 1',
      '    while left <= right:',
      '        mid = (left + right) / 2',
      '        if arr[mid] == target:',
      '            return mid',
      '    return -1'
    ],
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1)',
  }
];
```

### Practice Question Interface

```typescript
export interface Step {
  description: string;      // What happens in this step
  highlight: number[];      // Which array elements to highlight
  variables: Record<string, number | string>;  // Variable values
}

export interface PracticeProblem {
  id: string;
  title: string;
  description: string;
  initialArray: number[];
  steps: Step[];
  correctAnswer: number;
  hint: string;
}
```

---

## Step 2: Create Visualizer Component

The visualizer shows arrays and highlights elements as you step through an algorithm.

Create `src/components/visualizations/ArrayVisualizer.tsx`:

```tsx
'use client';  // This means it runs in the browser

import { useState, useEffect } from 'react';
import type { Step } from '@/data/algorithms';

interface ArrayVisualizerProps {
  initialArray: number[];      // The array to display
  steps: Step[];               // Animation steps
  onStepChange?: (step: number) => void;
}

export function ArrayVisualizer({ initialArray, steps, onStepChange }: ArrayVisualizerProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Auto-play effect
  useEffect(() => {
    if (isPlaying) {
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
  }, [isPlaying, steps.length]);

  // Get current step data
  const currentStepData = steps[currentStep];

  return (
    <div className="space-y-6">
      {/* Control Buttons */}
      <div className="flex items-center gap-4 justify-center">
        <button onClick={() => setCurrentStep(p => Math.max(0, p - 1))}>
          ← Previous
        </button>
        <span>Step {currentStep + 1} / {steps.length}</span>
        <button onClick={() => setCurrentStep(p => Math.min(steps.length - 1, p + 1))}>
          Next →
        </button>
        <button onClick={() => setIsPlaying(!isPlaying)}>
          {isPlaying ? '⏸ Pause' : '▶ Play'}
        </button>
      </div>

      {/* Array Display */}
      <div className="flex items-end justify-center gap-2">
        {initialArray.map((value, index) => {
          const isHighlighted = currentStepData?.highlight?.includes(index);
          
          return (
            <div key={index} className="flex flex-col items-center">
              <div
                className={`
                  w-16 h-20 rounded-lg flex items-center justify-center font-bold
                  ${isHighlighted ? 'bg-blue-400 text-white' : 'bg-gray-200'}
                `}
              >
                {value}
              </div>
              <span className="text-sm text-gray-500">[{index}]</span>
            </div>
          );
        })}
      </div>

      {/* Step Description */}
      {currentStepData && (
        <div className="p-4 bg-blue-50 rounded-lg">
          <p>{currentStepData.description}</p>
        </div>
      )}
    </div>
  );
}
```

### Key React Concepts Used:

| Concept | What It Does |
|---------|-------------|
| `useState` | Stores values that change (like current step) |
| `useEffect` | Runs code when something changes (like auto-play) |
| `props` | Data passed from parent to child components |
| `map()` | Loops through arrays to create elements |

---

## Step 3: Create Practice Component

Create `src/components/InteractivePractice.tsx`:

```tsx
'use client';

import { useState } from 'react';
import { ArrayVisualizer } from '@/components/visualizations/ArrayVisualizer';
import type { PracticeProblem } from '@/data/algorithms';

export function InteractivePractice({ problem }: { problem: PracticeProblem }) {
  const [userAnswer, setUserAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showHint, setShowHint] = useState(false);

  const handleSubmit = () => {
    const answer = parseInt(userAnswer);
    setIsCorrect(answer === problem.correctAnswer);
  };

  return (
    <div className="space-y-6">
      <div className="bg-green-500 p-6 rounded-xl text-white">
        <h3>Practice: {problem.title}</h3>
        <p>{problem.description}</p>
      </div>

      {/* Show the visualizer */}
      <ArrayVisualizer 
        initialArray={problem.initialArray} 
        steps={problem.steps} 
      />

      {/* Answer input */}
      <div className="space-y-4">
        {showHint && (
          <div className="p-3 bg-yellow-50 rounded-lg">
            💡 Hint: {problem.hint}
          </div>
        )}

        <div className="flex gap-4">
          <input
            type="number"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Enter your answer..."
            className="flex-1 px-4 py-2 border-2 rounded-lg"
          />
          <button 
            onClick={handleSubmit}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg"
          >
            Submit
          </button>
        </div>

        <button onClick={() => setShowHint(!showHint)}>
          💡 {showHint ? 'Hide' : 'Show'} Hint
        </button>

        {isCorrect === true && (
          <div className="p-4 bg-green-100 rounded-lg">
            🎉 Correct!
          </div>
        )}
        {isCorrect === false && (
          <div className="p-4 bg-red-100 rounded-lg">
            ❌ Try again!
          </div>
        )}
      </div>
    </div>
  );
}
```

---

## Step 4: Create Algorithm Page

Create `src/components/AlgorithmPage.tsx`:

```tsx
import Link from 'next/link';
import { ArrowLeft, Clock, Database } from 'lucide-react';
import { getAlgorithmById } from '@/data/algorithms';
import { InteractivePractice } from './InteractivePractice';

interface AlgorithmPageProps {
  id: string;
}

export function AlgorithmPage({ id }: AlgorithmPageProps) {
  const algorithm = getAlgorithmById(id);

  if (!algorithm) {
    return <div>Algorithm not found</div>;
  }

  const difficultyColor = {
    beginner: 'bg-green-100 text-green-800',
    intermediate: 'bg-yellow-100 text-yellow-800',
    advanced: 'bg-red-100 text-red-800',
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <Link href="/" className="flex items-center gap-2 text-gray-600">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        {/* Title Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 rounded-2xl text-white">
          <span className={`px-3 py-1 rounded-full text-sm ${difficultyColor[algorithm.difficulty]}`}>
            {algorithm.difficulty}
          </span>
          <h1 className="text-4xl font-bold mt-4">{algorithm.title}</h1>
          <div className="flex gap-6 mt-4">
            <span className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Time: {algorithm.timeComplexity}
            </span>
            <span className="flex items-center gap-2">
              <Database className="w-5 h-5" />
              Space: {algorithm.spaceComplexity}
            </span>
          </div>
        </div>

        {/* Explanation Section */}
        <section className="bg-white rounded-xl p-8 shadow">
          <h2 className="text-2xl font-bold mb-4">📖 Understanding</h2>
          <div className="prose">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
              <p className="whitespace-pre-line">{algorithm.laymanExplanation}</p>
            </div>
          </div>
        </section>

        {/* Pseudocode Section */}
        <section className="bg-white rounded-xl p-8 shadow">
          <h2 className="text-2xl font-bold mb-4">💻 Pseudocode</h2>
          <div className="bg-gray-900 rounded-xl p-6">
            <pre className="text-green-400 font-mono">
              {algorithm.pseudocode.map((line, i) => (
                <div key={i}>
                  <span className="text-gray-600">{i + 1}</span> {line}
                </div>
              ))}
            </pre>
          </div>
        </section>

        {/* Practice Section */}
        <section>
          <h2 className="text-2xl font-bold mb-4">🎯 Practice</h2>
          <InteractivePractice problem={algorithm.practice} />
        </section>
      </main>
    </div>
  );
}
```

---

## Step 5: Create Homepage

Create `src/components/HomePage.tsx`:

```tsx
import Link from 'next/link';
import { Search } from 'lucide-react';
import { algorithms, categories } from '@/data/algorithms';

export function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 rounded-full text-blue-400 text-sm mb-6">
            <Search className="w-4 h-4" />
            Interactive DSA Learning
          </div>
          <h1 className="text-5xl font-bold text-white mb-6">
            Learn DSA
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {' '}Visually
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Master Data Structures & Algorithms with interactive visualizations, 
            step-by-step explanations, and hands-on practice.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-2xl text-white"
            >
              <div className="text-4xl mb-4">{category.icon}</div>
              <h2 className="text-2xl font-bold mb-2">{category.name}</h2>
            </div>
          ))}
        </div>

        {/* All Topics */}
        <section>
          <h2 className="text-3xl font-bold text-white mb-8">All Topics</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {algorithms.map((algorithm) => (
              <Link
                key={algorithm.id}
                href={`/algorithms/${algorithm.id}`}
                className="group bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10"
              >
                <h3 className="text-xl font-semibold text-white">{algorithm.title}</h3>
                <p className="text-gray-400 mt-2">
                  {algorithm.timeComplexity}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
```

---

## Step 6: Set Up Routing

### Update Homepage

Edit `src/app/page.tsx`:

```tsx
import { HomePage } from '@/components/HomePage';

export default function Page() {
  return <HomePage />;
}
```

### Create Algorithm Page Route

Create the file: `src/app/algorithms/[id]/page.tsx`

```tsx
import { AlgorithmPage } from '@/components/AlgorithmPage';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  return <AlgorithmPage id={id} />;
}
```

---

## How to Run and Test

### Start Development Server

```bash
cd my-dsa-website
npm run dev
```

You should see:
```
▲ Next.js 14.x.x
- Local: http://localhost:3000
✓ Ready in 2s
```

Open http://localhost:3000 in your browser!

### Build for Production

```bash
npm run build
```

### Check for Errors

```bash
npm run lint      # Check code style
npx tsc --noEmit  # Check TypeScript errors
```

---

## Key Concepts Explained

### 1. React Components

Components are reusable pieces of UI. Think of them like LEGO blocks:

```tsx
// A simple component
function Button({ label }: { label: string }) {
  return <button className="bg-blue-500">{label}</button>;
}

// Using it
<Button label="Click me!" />
<Button label="Submit" />
```

### 2. State with useState

State stores data that changes over time:

```tsx
function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
```

### 3. Effects with useEffect

Effects run code when things change:

```tsx
useEffect(() => {
  // This runs once when component mounts
  fetchData();
  
  // Cleanup function (runs when component unmounts)
  return () => cancelRequest();
}, []); // Empty array = run once
```

### 4. Props

Props pass data from parent to child:

```tsx
// Parent component
<ChildComponent name="John" age={25} />

// Child component
function ChildComponent({ name, age }: { name: string; age: number }) {
  return <p>{name} is {age} years old</p>;
}
```

### 5. Next.js Link

Use `<Link>` instead of `<a>` for faster page transitions:

```tsx
import Link from 'next/link';

<Link href="/about">About Page</Link>
```

### 6. Tailwind CSS Classes

Tailwind provides utility classes for styling:

| Class | What It Does |
|-------|-------------|
| `flex` | display: flex |
| `items-center` | align-items: center |
| `justify-center` | justify-content: center |
| `gap-4` | gap: 1rem |
| `p-6` | padding: 1.5rem |
| `bg-blue-500` | background-color: blue |
| `text-white` | color: white |
| `rounded-xl` | border-radius: 0.75rem |
| `hover:bg-blue-600` | hover styles |

### 7. Dynamic Routes

The `[id]` folder catches any URL:

| URL | `params.id` value |
|-----|-------------------|
| `/algorithms/binary-search` | `binary-search` |
| `/algorithms/bubble-sort` | `bubble-sort` |
| `/algorithms/any-value` | `any-value` |

---

## Next Steps: Adding More Features

### Add a New Algorithm

1. Add to `algorithms` array in `src/data/algorithms.ts`
2. Fill in all fields
3. It automatically appears on homepage!

### Add a New Page

1. Create folder in `src/app/`
2. Add `page.tsx` inside
3. Done!

### Example: Add "About" Page

Create `src/app/about/page.tsx`:

```tsx
export default function AboutPage() {
  return (
    <div className="min-h-screen p-8">
      <h1>About Us</h1>
      <p>This is an interactive DSA learning platform...</p>
    </div>
  );
}
```

Now visit http://localhost:3000/about

---

## Common Errors and Solutions

### Error: "Module not found"
```bash
npm install
```

### Error: "Port 3000 is already in use"
```bash
npm run dev -- -p 3001
```

### Error: TypeScript errors
Check your interface definitions match how you're using them.

---

## Resources for Learning More

- **React**: https://react.dev/learn
- **Next.js**: https://nextjs.org/docs
- **Tailwind**: https://tailwindcss.com/docs
- **TypeScript**: https://www.typescriptlang.org/docs

---

## Summary: What We Built

| Component | File | Purpose |
|-----------|------|---------|
| Data | `src/data/algorithms.ts` | All algorithm content |
| Visualizer | `src/components/visualizations/ArrayVisualizer.tsx` | Shows array animations |
| Practice | `src/components/InteractivePractice.tsx` | Interactive quiz |
| Algorithm Page | `src/components/AlgorithmPage.tsx` | Individual topic page |
| Home Page | `src/components/HomePage.tsx` | Main landing page |
| Routes | `src/app/page.tsx` + `src/app/algorithms/[id]/page.tsx` | Page routing |

---

Happy Learning! 🚀
