export interface Step {
  description: string;
  highlight: number[];
  variables: Record<string, number | string | boolean | (string | number)[]>;
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

export interface Algorithm {
  id: string;
  title: string;
  category: 'searching' | 'sorting' | 'data-structures';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  laymanExplanation: string;
  pseudocode: string[];
  timeComplexity: string;
  spaceComplexity: string;
  visualizationType: 'array' | 'tree' | 'graph' | 'list';
  practice: PracticeProblem;
}

export const algorithms: Algorithm[] = [
  {
    id: 'binary-search',
    title: 'Binary Search',
    category: 'searching',
    difficulty: 'beginner',
    laymanExplanation: `Imagine you're looking for a word in a dictionary. You don't start from page 1 and flip through every page - that's linear search. Instead, you open to the middle, see if your word is there or before/after, then repeat with the half that might contain it.

Binary search does the same thing! It only works on **sorted** arrays. At each step, it looks at the middle element:
- If it matches → Found! 🎯
- If it's too small → Search the right half
- If it's too big → Search the left half

This cuts the search space in HALF each time, making it super fast!`,
    pseudocode: [
      'function binarySearch(arr, target):',
      '    left = 0',
      '    right = length(arr) - 1',
      '    ',
      '    while left <= right:',
      '        mid = (left + right) / 2',
      '        ',
      '        if arr[mid] == target:',
      '            return mid  // Found!',
      '        ',
      '        if arr[mid] < target:',
      '            left = mid + 1  // Search right half',
      '        else:',
      '            right = mid - 1  // Search left half',
      '    ',
      '    return -1  // Not found'
    ],
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1)',
    visualizationType: 'array',
    practice: {
      id: 'binary-search-practice',
      title: 'Find the Target!',
      description: 'Find where 7 is located in this sorted array. Click through each step to see how binary search works.',
      initialArray: [1, 3, 5, 7, 9, 11, 13],
      steps: [
        { description: 'Start: left=0, right=6, mid=3. arr[3]=7. Found! 🎯', highlight: [3], variables: { left: 0, right: 6, mid: 3, target: 7 } },
      ],
      correctAnswer: 3,
      hint: '7 is at index 3 (the 4th position)'
    }
  },
  {
    id: 'linear-search',
    title: 'Linear Search',
    category: 'searching',
    difficulty: 'beginner',
    laymanExplanation: `Think of looking for your friend in a crowd. You start from one end and check each person one by one: "Is this you? No. Is this you? No. Is this you? YES!"

Linear search is exactly that - we check every element from the start until we find what we're looking for.

It's simple but can be slow for large lists. However, it works on **unsorted** arrays too!`,
    pseudocode: [
      'function linearSearch(arr, target):',
      '    for i = 0 to length(arr) - 1:',
      '        if arr[i] == target:',
      '            return i  // Found at position i',
      '    ',
      '    return -1  // Not found'
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    visualizationType: 'array',
    practice: {
      id: 'linear-search-practice',
      title: 'Find the Number!',
      description: 'Find where 5 is located. Walk through the array one by one.',
      initialArray: [4, 2, 7, 1, 5, 9, 3],
      steps: [
        { description: 'Check index 0: 4 ≠ 5, keep searching...', highlight: [0], variables: { i: 0, current: 4 } },
        { description: 'Check index 1: 2 ≠ 5, keep searching...', highlight: [1], variables: { i: 1, current: 2 } },
        { description: 'Check index 2: 7 ≠ 5, keep searching...', highlight: [2], variables: { i: 2, current: 7 } },
        { description: 'Check index 3: 1 ≠ 5, keep searching...', highlight: [3], variables: { i: 3, current: 1 } },
        { description: 'Check index 4: 5 = 5! Found! 🎯', highlight: [4], variables: { i: 4, current: 5 } },
      ],
      correctAnswer: 4,
      hint: 'Start from the left and count positions'
    }
  },
  {
    id: 'bubble-sort',
    title: 'Bubble Sort',
    category: 'sorting',
    difficulty: 'beginner',
    laymanExplanation: `Imagine bubbles rising to the surface! In bubble sort, we compare adjacent elements and swap them if they're in the wrong order.

Think of it like sorting books on a shelf by height:
- Compare the first two books
- If the left one is taller, swap them
- Move to the next pair
- Repeat until the end
- Start over (the largest "bubbles up" to the right)

Each pass moves the largest unsorted element to its correct position.`,
    pseudocode: [
      'function bubbleSort(arr):',
      '    n = length(arr)',
      '    ',
      '    for i = 0 to n-1:',
      '        swapped = false',
      '        ',
      '        for j = 0 to n-i-1:',
      '            if arr[j] > arr[j+1]:',
      '                swap(arr[j], arr[j+1])',
      '                swapped = true',
      '        ',
      '        if not swapped:',
      '            break  // Already sorted!'
    ],
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    visualizationType: 'array',
    practice: {
      id: 'bubble-sort-practice',
      title: 'Sort the Array!',
      description: 'Sort this array using bubble sort. Trace through one pass.',
      initialArray: [5, 3, 8, 1, 2],
      steps: [
        { description: 'Compare 5 and 3: 5 > 3, SWAP!', highlight: [0, 1], variables: { i: 0, j: 0, swapping: true } },
        { description: 'Compare 5 and 8: 5 < 8, keep them', highlight: [1, 2], variables: { i: 0, j: 1, swapping: false } },
        { description: 'Compare 8 and 1: 8 > 1, SWAP!', highlight: [2, 3], variables: { i: 0, j: 2, swapping: true } },
        { description: 'Compare 8 and 2: 8 > 2, SWAP!', highlight: [3, 4], variables: { i: 0, j: 3, swapping: true } },
        { description: 'Pass 1 done! 8 bubbled to the end.', highlight: [4], variables: { sorted: 1 } },
      ],
      correctAnswer: 0,
      hint: 'Compare adjacent pairs and swap if needed'
    }
  },
  {
    id: 'selection-sort',
    title: 'Selection Sort',
    category: 'sorting',
    difficulty: 'beginner',
    laymanExplanation: `Imagine picking the smallest book from a messy pile and putting it first, then finding the next smallest for position two, and so on.

Selection sort works the same way:
1. Find the minimum in the unsorted part
2. Swap it with the first unsorted position
3. Repeat for the rest

It's like organizing a line of people by height - you keep picking the shortest person for the next position.`,
    pseudocode: [
      'function selectionSort(arr):',
      '    n = length(arr)',
      '    ',
      '    for i = 0 to n-1:',
      '        minIdx = i',
      '        ',
      '        for j = i+1 to n:',
      '            if arr[j] < arr[minIdx]:',
      '                minIdx = j',
      '        ',
      '        swap(arr[i], arr[minIdx])'
    ],
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    visualizationType: 'array',
    practice: {
      id: 'selection-sort-practice',
      title: 'Select the Minimum!',
      description: 'Find the minimum and place it at the start.',
      initialArray: [64, 25, 12, 22, 11],
      steps: [
        { description: 'Find minimum: Compare 25, 12, 22, 11. Min = 11 at index 4', highlight: [0, 4], variables: { i: 0, minIdx: 4 } },
        { description: 'Swap arr[0]=64 with arr[4]=11', highlight: [0, 4], variables: { i: 0, swapped: true } },
        { description: '11 is now in position! Find min in remaining.', highlight: [1, 2, 3, 4], variables: { i: 1, sorted: 1 } },
      ],
      correctAnswer: 4,
      hint: 'Find the smallest number and swap it to position 0'
    }
  },
  {
    id: 'insertion-sort',
    title: 'Insertion Sort',
    category: 'sorting',
    difficulty: 'beginner',
    laymanExplanation: `Think of sorting playing cards in your hand. You pick up cards one by one and insert them in the correct position among the cards you've already sorted.

Similarly, insertion sort builds the sorted array one element at a time:
1. Take the next element
2. Compare it with elements before it
3. Shift larger elements right
4. Insert the element in its correct spot

It's like arranging books on a shelf - you find where each new book goes and slide others over.`,
    pseudocode: [
      'function insertionSort(arr):',
      '    for i = 1 to length(arr)-1:',
      '        key = arr[i]',
      '        j = i - 1',
      '        ',
      '        while j >= 0 and arr[j] > key:',
      '            arr[j+1] = arr[j]',
      '            j = j - 1',
      '        ',
      '        arr[j+1] = key'
    ],
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    visualizationType: 'array',
    practice: {
      id: 'insertion-sort-practice',
      title: 'Insert the Card!',
      description: 'Insert 5 into the sorted part of the array.',
      initialArray: [2, 4, 6, 8, 5],
      steps: [
        { description: 'key = 5, start comparing from right of sorted part', highlight: [0, 1, 2, 3, 4], variables: { i: 4, key: 5, j: 3 } },
        { description: '8 > 5, shift 8 right', highlight: [3, 4], variables: { j: 3, shifted: 8 } },
        { description: '6 > 5, shift 6 right', highlight: [2, 3], variables: { j: 2, shifted: 6 } },
        { description: '4 < 5, stop. Insert 5 at index 2', highlight: [2], variables: { inserted: 5 } },
      ],
      correctAnswer: 2,
      hint: 'Compare 5 with elements to its left and shift them right'
    }
  },
  {
    id: 'merge-sort',
    title: 'Merge Sort',
    category: 'sorting',
    difficulty: 'intermediate',
    laymanExplanation: `Imagine dividing a deck of cards into two halves, sorting each half, then merging them back together in order.

Merge sort uses a "divide and conquer" approach:
1. **Divide**: Split the array in half repeatedly until single elements
2. **Conquer**: Sort small pairs of elements
3. **Combine**: Merge sorted pairs into bigger sorted lists

It's like organizing a library by first dividing books by floors, then sections, then shelves, sorting each level, then combining back up.`,
    pseudocode: [
      'function mergeSort(arr):',
      '    if length(arr) <= 1:',
      '        return arr',
      '    ',
      '    mid = length(arr) / 2',
      '    left = mergeSort(arr[0..mid])',
      '    right = mergeSort(arr[mid..end])',
      '    ',
      '    return merge(left, right)',
      '',
      'function merge(left, right):',
      '    result = []',
      '    while left and right:',
      '        if left[0] <= right[0]:',
      '            append left[0] to result',
      '        else:',
      '            append right[0] to result',
      '    append remaining to result',
      '    return result'
    ],
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(n)',
    visualizationType: 'array',
    practice: {
      id: 'merge-sort-practice',
      title: 'Merge Two Lists!',
      description: 'Merge these two sorted arrays into one sorted array.',
      initialArray: [1, 3, 5, 2, 4, 6],
      steps: [
        { description: 'Left = [1,3,5], Right = [2,4,6]. Compare 1 and 2: take 1', highlight: [0, 3], variables: { leftHead: 1, rightHead: 2 } },
        { description: 'Compare 3 and 2: take 2', highlight: [1, 3], variables: { leftHead: 3, rightHead: 2 } },
        { description: 'Compare 3 and 4: take 3', highlight: [1, 4], variables: { leftHead: 3, rightHead: 4 } },
        { description: 'Compare 5 and 4: take 4', highlight: [2, 4], variables: { leftHead: 5, rightHead: 4 } },
        { description: 'Take remaining: 5, 6. Result: [1,2,3,4,5,6]', highlight: [], variables: { merged: [1,2,3,4,5,6] } },
      ],
      correctAnswer: 0,
      hint: 'Compare elements from both lists, take the smaller one'
    }
  },
  {
    id: 'quick-sort',
    title: 'Quick Sort',
    category: 'sorting',
    difficulty: 'intermediate',
    laymanExplanation: `Imagine organizing people by height using a "pivot" person:
1. Pick someone as the pivot (often the last person)
2. Have shorter people stand on the left, taller on the right
3. The pivot is now in their correct position!
4. Repeat with left and right groups

Quick sort partitions the array around a pivot element, then recursively sorts the partitions.`,
    pseudocode: [
      'function quickSort(arr, low, high):',
      '    if low < high:',
      '        pi = partition(arr, low, high)',
      '        quickSort(arr, low, pi-1)',
      '        quickSort(arr, pi+1, high)',
      '',
      'function partition(arr, low, high):',
      '    pivot = arr[high]',
      '    i = low - 1',
      '    ',
      '    for j = low to high-1:',
      '        if arr[j] < pivot:',
      '            i = i + 1',
      '            swap(arr[i], arr[j])',
      '    ',
      '    swap(arr[i+1], arr[high])',
      '    return i + 1'
    ],
    timeComplexity: 'O(n log n) average',
    spaceComplexity: 'O(log n)',
    visualizationType: 'array',
    practice: {
      id: 'quick-sort-practice',
      title: 'Partition the Array!',
      description: 'Partition this array with 5 as pivot (last element).',
      initialArray: [3, 8, 1, 5, 9, 2],
      steps: [
        { description: 'Pivot = 5. Scan from left.', highlight: [5], variables: { pivot: 5, i: -1 } },
        { description: '3 < 5: i=0, swap arr[0] with arr[0]', highlight: [0, 0], variables: { j: 0, i: 0 } },
        { description: '8 > 5: skip', highlight: [1], variables: { j: 1 } },
        { description: '1 < 5: i=1, swap arr[1] with arr[1]', highlight: [1, 2], variables: { j: 2, i: 1 } },
        { description: 'Pivot goes between partitions. Final: [3,1,5,8,9,2]', highlight: [2], variables: { pivotIndex: 2 } },
      ],
      correctAnswer: 2,
      hint: 'Count elements smaller than 5 to find pivot position'
    }
  },
  {
    id: 'stack',
    title: 'Stack (Data Structure)',
    category: 'data-structures',
    difficulty: 'beginner',
    laymanExplanation: `A stack is like a pile of plates:
- **Push**: Add a plate on top (add to end)
- **Pop**: Remove the top plate (remove from end)
- **Peek**: Look at the top plate without removing it

It's Last-In-First-Out (LIFO) - the last plate you put down is the first one you'll pick up.

Real examples:
- Undo/Redo in editors
- Browser back button
- Function call stack`,
    pseudocode: [
      'class Stack:',
      '    init():',
      '        items = []',
      '    ',
      '    push(item):',
      '        items.append(item)',
      '    ',
      '    pop():',
      '        if empty():',
      '            return null',
      '        return items.pop()',
      '    ',
      '    peek():',
      '        return items[-1]',
      '    ',
      '    empty():',
      '        return length(items) == 0'
    ],
    timeComplexity: 'Push/Pop: O(1)',
    spaceComplexity: 'O(n)',
    visualizationType: 'list',
    practice: {
      id: 'stack-practice',
      title: 'Stack Operations!',
      description: 'Push 1, 2, 3, then pop twice. What remains?',
      initialArray: [],
      steps: [
        { description: 'Push 1: Stack = [1]', highlight: [], variables: { operation: 'push', value: 1, stack: [1] } },
        { description: 'Push 2: Stack = [1, 2]', highlight: [], variables: { operation: 'push', value: 2, stack: [1, 2] } },
        { description: 'Push 3: Stack = [1, 2, 3]', highlight: [], variables: { operation: 'push', value: 3, stack: [1, 2, 3] } },
        { description: 'Pop 3: Stack = [1, 2], returned 3', highlight: [], variables: { operation: 'pop', returned: 3, stack: [1, 2] } },
        { description: 'Pop 2: Stack = [1], returned 2', highlight: [], variables: { operation: 'pop', returned: 2, stack: [1] } },
      ],
      correctAnswer: 1,
      hint: 'Top of stack is on the right'
    }
  },
  {
    id: 'queue',
    title: 'Queue (Data Structure)',
    category: 'data-structures',
    difficulty: 'beginner',
    laymanExplanation: `A queue is like a line at a coffee shop:
- **Enqueue**: Join the line at the back
- **Dequeue**: Get served at the front

It's First-In-First-Out (FIFO) - first person in line is first served.

Real examples:
- Print job queue
- Customer service line
- BFS (Breadth-First Search)`,
    pseudocode: [
      'class Queue:',
      '    init():',
      '        items = []',
      '    ',
      '    enqueue(item):',
      '        items.append(item)',
      '    ',
      '    dequeue():',
      '        if empty():',
      '            return null',
      '        return items.pop(0)',
      '    ',
      '    front():',
      '        return items[0]',
      '    ',
      '    empty():',
      '        return length(items) == 0'
    ],
    timeComplexity: 'Enqueue/Dequeue: O(1)',
    spaceComplexity: 'O(n)',
    visualizationType: 'list',
    practice: {
      id: 'queue-practice',
      title: 'Queue Operations!',
      description: 'Enqueue A, B, C, then dequeue twice. What remains?',
      initialArray: [],
      steps: [
        { description: 'Enqueue A: Queue = [A]', highlight: [], variables: { operation: 'enqueue', value: 'A', queue: ['A'] } },
        { description: 'Enqueue B: Queue = [A, B]', highlight: [], variables: { operation: 'enqueue', value: 'B', queue: ['A', 'B'] } },
        { description: 'Enqueue C: Queue = [A, B, C]', highlight: [], variables: { operation: 'enqueue', value: 'C', queue: ['A', 'B', 'C'] } },
        { description: 'Dequeue A: Queue = [B, C], served A', highlight: [], variables: { operation: 'dequeue', served: 'A', queue: ['B', 'C'] } },
        { description: 'Dequeue B: Queue = [C], served B', highlight: [], variables: { operation: 'dequeue', served: 'B', queue: ['C'] } },
      ],
      correctAnswer: 1,
      hint: 'Front of queue is on the left'
    }
  },
  {
    id: 'linked-list',
    title: 'Linked List',
    category: 'data-structures',
    difficulty: 'intermediate',
    laymanExplanation: `A linked list is like a treasure hunt:
- Each item (node) has data and a clue to the next item
- You start at the first node and follow clues to find items
- There's no shortcut - you must start from the beginning

Unlike arrays, linked lists don't need consecutive memory. Inserting/deleting is easy but searching is slower.

Think of it like a scavenger hunt where each clue leads to the next location!`,
    pseudocode: [
      'class Node:',
      '    data = null',
      '    next = null',
      '',
      'class LinkedList:',
      '    head = null',
      '    ',
      '    insert(data):',
      '        newNode = Node(data)',
      '        newNode.next = head',
      '        head = newNode',
      '    ',
      '    delete(data):',
      '        if head.data == data:',
      '            head = head.next',
      '        else:',
      '            current = head',
      '            while current.next:',
      '                if current.next.data == data:',
      '                    current.next = current.next.next',
      '                    break',
      '                current = current.next'
    ],
    timeComplexity: 'Insert/Delete: O(1), Search: O(n)',
    spaceComplexity: 'O(n)',
    visualizationType: 'list',
    practice: {
      id: 'linked-list-practice',
      title: 'Traverse the List!',
      description: 'Traverse this linked list and find the 3rd node.',
      initialArray: [10, 20, 30, 40, 50],
      steps: [
        { description: 'Start at HEAD -> Node1(10)', highlight: [0], variables: { current: 10, position: 1 } },
        { description: 'Follow next -> Node2(20)', highlight: [1], variables: { current: 20, position: 2 } },
        { description: 'Follow next -> Node3(30) 🎯', highlight: [2], variables: { current: 30, position: 3 } },
      ],
      correctAnswer: 30,
      hint: 'Count nodes as you follow the links'
    }
  }
];

export const categories = [
  { id: 'searching', name: 'Searching Algorithms', icon: '🔍', color: 'blue' },
  { id: 'sorting', name: 'Sorting Algorithms', icon: '📊', color: 'purple' },
  { id: 'data-structures', name: 'Data Structures', icon: '🏗️', color: 'green' },
] as const;

export const getAlgorithmById = (id: string) => algorithms.find(a => a.id === id);
export const getAlgorithmsByCategory = (category: string) => algorithms.filter(a => a.category === category);
