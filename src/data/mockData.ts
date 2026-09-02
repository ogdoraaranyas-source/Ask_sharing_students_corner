import { Post, UserProfile, StudyGroup, NotificationItem } from '../types';

export const CURRENT_USER: UserProfile = {
  id: 'user-eleanor-vance',
  name: 'Dr. Eleanor Vance',
  title: 'PhD Candidate',
  department: 'Computer Science & Applied Mathematics',
  bio: 'PhD Candidate focusing on distributed systems and machine learning optimization. Passionate about mentoring undergraduates and sharing well-structured lecture notes. Often found answering concurrency questions in the CSE forums.',
  reputation: 12450,
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBMlmcTn6lmo1wtxUflhv2jig0Vk-e0FRxZYDTRydAXiBJCVHU4JdCmsh7yUf0ZSSTVAb6OdVg5NfdAkf8Mamg8LUGK5StEzDPmoFZVX-m2a-g0Zpobd-Vs3iOuYgrpd99QyY0GsajV-Fcr8ZmjlXou15xU41HqbsvYlTRfcbBuGmWPL9EzH4BQYPuJ6cEcC4rkAq945nRrnI_L0N5JbXN2z3_jIrti4rmJiKS9SgsftzGSpBGfkG-Haw',
  badges: [
    { label: 'Grad Student', icon: 'school', color: 'emerald' },
    { label: 'Top Contributor', icon: 'verified', color: 'indigo' },
  ],
  followedCourses: [
    { code: 'CSE 412', title: 'Distributed Systems' },
    { code: 'MATH 302', title: 'Linear Algebra' },
    { code: 'ECE 210', title: 'Circuit Analysis' },
  ],
  stats: {
    totalUpvotes: '3.2k',
    acceptedAns: 142,
    notesShared: 45,
    coursesCount: 12,
  },
};

export const INITIAL_STUDY_GROUPS: StudyGroup[] = [
  {
    id: 'grp-cse',
    category: 'cse',
    name: 'Computer Science (CSE)',
    code: 'CSE',
    description: 'Algorithms, data structures, operating systems, compilers & machine learning.',
    membersCount: 1420,
    isJoined: true,
    icon: 'code',
  },
  {
    id: 'grp-ece',
    category: 'ece',
    name: 'Electronics & Hardware (ECE)',
    code: 'ECE',
    description: 'Circuit analysis, digital signal processing, microcontrollers & embedded systems.',
    membersCount: 890,
    isJoined: true,
    icon: 'memory',
  },
  {
    id: 'grp-math',
    category: 'math',
    name: 'Mathematics',
    code: 'Math',
    description: 'Discrete math, linear algebra, multivariable calculus & probability theory.',
    membersCount: 1120,
    isJoined: true,
    icon: 'functions',
  },
  {
    id: 'grp-physics',
    category: 'physics',
    name: 'Applied Physics',
    code: 'Physics',
    description: 'Quantum mechanics, thermodynamics, electromagnetism & mechanics.',
    membersCount: 760,
    isJoined: true,
    icon: 'science',
  },
  {
    id: 'grp-bio',
    category: 'general',
    name: 'Bioengineering & Genetics',
    code: 'BIO',
    description: 'Computational biology, genetics algorithms, and biomedical instrumentation.',
    membersCount: 530,
    isJoined: false,
    icon: 'biotech',
  },
  {
    id: 'grp-ai',
    category: 'cse',
    name: 'AI Ethics & Alignment',
    code: 'AI-ETH',
    description: 'Explorations into safe AGI, alignment theories, interpretability and policy.',
    membersCount: 680,
    isJoined: false,
    icon: 'psychology',
  },
];

export const INITIAL_POSTS: Post[] = [
  {
    id: 'react-debounce-hook',
    type: 'question',
    title: 'How do I implement a custom hook for debouncing in React?',
    content: `I'm trying to create a custom React hook that debounces an input value. I want to use it for a search bar to avoid making API calls on every single keystroke. Here is what I have so far, but it seems to be firing immediately on the first keystroke and then delaying.`,
    codeSnippet: `import { useState, useEffect } from 'react';

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // I think the issue is here?
    return () => {
      clearTimeout(handler);
    };
  }, [value]); // Should delay be in here?

  return debouncedValue;
}`,
    codeLanguage: 'typescript',
    category: 'cse',
    tags: ['react', 'javascript', 'hooks'],
    author: {
      id: 'alex-dev-22',
      name: 'AlexDev22',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAnyIxsEMRNsMDgkkBv8FiTkMFYpqa1mq4J8MwPNUftt84UOvxMTXLxZAPPzFttzzc2ST2UVciN761VB6eS_fmVcC1pX7TwPhp1ulND0i2m4q25QrOOi6M4ikArj4Yfji4WDW8BLU_7HuZ5dhI8jtek5fiZfvGk5QM_jVpQwXM3P-egSI2sFqSQ6vv-yf_tR1_ZTeYR51wDVXMEjk2qaoO2wt3pCx4aDXhtnHaQ6lPrqtgYEVB5nP0RWQ',
      reputation: 1240,
      repType: 'bolt',
    },
    votes: 42,
    userVote: 0,
    bookmarked: false,
    createdAt: '2 hours ago',
    views: 142,
    answersCount: 3,
    answers: [
      {
        id: 'ans-1',
        author: {
          id: 'sarah-codes',
          name: 'SarahCodes',
          avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDuhCarRDkKBU3sssuZrL_mMgSVbL_6XNeDKKEyqCqr8t2p0KdmCMr9142rrscWxVk_h8e8T0gpEIBGoSx_Yorwp0mBUw62Qv7BWRHntoRL_hqGpIZwgDuxnmM0OVTEP53cogC5HETZWah0MoRZ8uwpQ_ohHr8FfeqvK2xxgW2rF3NBnlQ7xLaEVGm6KKronZhPkyAUiFTBF6nYiR0VxXxAM3llcrC1P1WXR1fyiYSuaajUiPBQZO54SA',
          reputation: 15000,
          repType: 'star',
        },
        content: `Your implementation is actually quite close and structurally correct for a basic debounce! The issue you're describing ("firing immediately on the first keystroke") is standard behavior if the initial render uses the initial state value.

If you want to prevent it from firing an API call on mount, you usually handle that in the component *using* the hook, rather than the hook itself. However, to ensure the hook updates correctly if \`delay\` changes dynamically, you should indeed add it to the dependency array.`,
        codeSnippet: `  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Added delay here`,
        codeLanguage: 'typescript',
        votes: 156,
        userVote: 0,
        isAccepted: true,
        createdAt: '1 hour ago',
      },
      {
        id: 'ans-2',
        author: {
          id: 'prof-dan',
          name: 'Dr. Dan Higgins',
          avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCovE5cMTrFBM7TMXnJD74KwslpY2Z6DMzUdB9Tk84uweq3vaVMzOg79YYrUFCx3SXhRQUep8rcFMLMikokLKLVD6-3p0Fm-4xzrud1z8gN8WYaRenciMbZlD5izhHnF4Putega0OK0ywCK7WnYyEwe9_ke6ABMY6mEMBIzbbZr0l2K0P04bUMlVAmwENnEtbX9Dznk3h0em_W9fqrBHJjb-cxXjHI4CLuJTn3X931F9GCkOqmJ56cz6A',
          reputation: 8420,
          repType: 'star',
        },
        content: `In addition to Sarah's fix, if you want to avoid rendering lags when typing rapidly, consider pairing this with React 18's \`useDeferredValue\` for rendering concurrent transitions while keeping the network throttle on \`useDebounce\`.`,
        votes: 18,
        userVote: 0,
        isAccepted: false,
        createdAt: '45 mins ago',
      }
    ],
  },
  {
    id: 'c-memory-allocator',
    type: 'question',
    title: 'Implementing a custom Memory Allocator in C for embedded systems',
    content: `I'm struggling with managing fragmentation in a highly constrained environment (ARM Cortex-M4, 256KB RAM). The standard malloc is too unpredictable for real-time constraints. Any recommended algorithms for a deterministic block allocator?`,
    codeSnippet: `// Current pool fixed-size prototype:
typedef struct Block {
  struct Block* next;
} Block;

typedef struct {
  uint8_t* pool;
  size_t blockSize;
  size_t totalBlocks;
  Block* freeList;
} MemoryPool;`,
    codeLanguage: 'c',
    category: 'cse',
    tags: ['CSE', 'C', 'Embedded'],
    author: {
      id: 'alex-mercer',
      name: 'Alex Mercer',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBjylkGsKv7T4hlZUrMqfHUehmTZIBN1pMvEcVwFpnrrHOgIjqhnTneJCbT14mfeNpDlkuLfuJAGEIQa9D1OypyNeEGpV7MK0HqkD6eff8IBX0IsStkBNrgx8oOeFgm0DzYAA4GpkDL14O9umcsIRN1e0SwO07BqJIR66Kd4PSW8W6kBtzA64OyWjrl9zkHjLHhb0sohoY3Z7waf2esyh6A-iu5Z-lMnINOzyF7hIdp3jP4WVRs6qEWMA',
      reputation: 1200,
      repType: 'star',
    },
    votes: 42,
    userVote: 0,
    bookmarked: false,
    createdAt: '2 hours ago',
    views: 280,
    answersCount: 8,
    answers: [
      {
        id: 'ans-c1',
        author: {
          id: 'embedded-guru',
          name: 'Marcus Brody',
          avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBfpvbM9eQOJ9I6KJgEaDpFrAJQ2mP9S1vXyeGxYxvJf9O46Ubvemmf6n7F3gTDvBR_1h5zn1Q54dM0hQEtqvbmp0g0OxH7fGe-tZMXY-RSl-JzJfwYfIGXp6M2qb9DrJKoU5nsRTAvz8Om_G1ow9fSd4QaB0jp0sqlL5ROXoCRGOgAvfuGDXbSiq5Fb6WIKFIyqDaQObwpGwql0HLdsVuGvcLb5TVagG-8fEuIOG17ydEqufh6FXCFAw',
          reputation: 6700,
          repType: 'bolt',
        },
        content: `For Cortex-M4 systems, TLSF (Two-Level Segregated Fit) allocator is considered the gold standard for real-time embedded systems because it provides bounded $O(1)$ allocation and free times with minimal fragmentation.`,
        votes: 31,
        userVote: 0,
        isAccepted: true,
        createdAt: '1 hour ago',
      }
    ],
  },
  {
    id: 'quantum-mechanics-guide',
    type: 'note',
    title: 'Complete Study Guide: Quantum Mechanics II (Midterm Prep)',
    content: `Comprehensive midterm preparation notes for Quantum Mechanics II. Covers Heisenberg Uncertainty Principle, Wave-Particle Duality, The Schrödinger Equation derivation, Dirac Bra-Ket notations, and harmonic oscillator perturbation models with full step-by-step example calculations.`,
    category: 'physics',
    tags: ['Physics', 'Study Guide'],
    pageCount: 14,
    pdfThumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDtxeqTjUn2ViQ0-xvQY9ZeAiLhw1PZzePikeUqEuTmrPA2yu_9CsIyHnziAp4HzNuUUsfaD5cThM_0sRf8O5Nz2bIXL3Bt7jxatSmI5Ru17XHBip9mIu3MJaKE1Fs-k_OQXglkJBCsJKWZ952R4m4THFlUfanolg0ynWqWelNX8EWz7FjvANI_VD6zly2msZZQzch4b0bqj-kQV5vuSfx_bruVy4GAi_TjCwN_4jSpWxT8Wd3Ssdnpag',
    downloadCount: 56,
    likesCount: 128,
    userLiked: false,
    author: {
      id: 'sarah-jenkins',
      name: 'Sarah Jenkins',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBfpvbM9eQOJ9I6KJgEaDpFrAJQ2mP9S1vXyeGxYxvJf9O46Ubvemmf6n7F3gTDvBR_1h5zn1Q54dM0hQEtqvbmp0g0OxH7fGe-tZMXY-RSl-JzJfwYfIGXp6M2qb9DrJKoU5nsRTAvz8Om_G1ow9fSd4QaB0jp0sqlL5ROXoCRGOgAvfuGDXbSiq5Fb6WIKFIyqDaQObwpGwql0HLdsVuGvcLb5TVagG-8fEuIOG17ydEqufh6FXCFAw',
      reputation: 2400,
      repType: 'star',
    },
    votes: 128,
    userVote: 0,
    bookmarked: false,
    createdAt: '5 hours ago',
    views: 412,
    answersCount: 4,
    answers: [],
  },
  {
    id: 'mapreduce-optimization',
    type: 'question',
    title: 'Optimizing MapReduce tasks for unbalanced datasets',
    content: `When dealing with highly skewed data distributions in Hadoop, I've found that implementing a custom Partitioner alongside pre-aggregation using Combiners significantly reduces straggler tasks and network saturation during the shuffle phase. Key findings include custom key salting for hot partition alleviation.`,
    category: 'cse',
    courseCode: 'CSE 412',
    tags: ['CSE 412', 'distributed-systems'],
    author: {
      id: 'user-eleanor-vance',
      name: 'Dr. Eleanor Vance',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBMlmcTn6lmo1wtxUflhv2jig0Vk-e0FRxZYDTRydAXiBJCVHU4JdCmsh7yUf0ZSSTVAb6OdVg5NfdAkf8Mamg8LUGK5StEzDPmoFZVX-m2a-g0Zpobd-Vs3iOuYgrpd99QyY0GsajV-Fcr8ZmjlXou15xU41HqbsvYlTRfcbBuGmWPL9EzH4BQYPuJ6cEcC4rkAq945nRrnI_L0N5JbXN2z3_jIrti4rmJiKS9SgsftzGSpBGfkG-Haw',
      reputation: 12450,
      repType: 'star',
    },
    votes: 42,
    userVote: 0,
    bookmarked: false,
    createdAt: '1 day ago',
    views: 350,
    answersCount: 5,
    answers: [
      {
        id: 'ans-mr1',
        author: {
          id: 'sarah-codes',
          name: 'SarahCodes',
          avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDuhCarRDkKBU3sssuZrL_mMgSVbL_6XNeDKKEyqCqr8t2p0KdmCMr9142rrscWxVk_h8e8T0gpEIBGoSx_Yorwp0mBUw62Qv7BWRHntoRL_hqGpIZwgDuxnmM0OVTEP53cogC5HETZWah0MoRZ8uwpQ_ohHr8FfeqvK2xxgW2rF3NBnlQ7xLaEVGm6KKronZhPkyAUiFTBF6nYiR0VxXxAM3llcrC1P1WXR1fyiYSuaajUiPBQZO54SA',
          reputation: 15000,
          repType: 'star',
        },
        content: `Great breakdown Dr. Vance! In Spark, we achieve a similar resolution by calling \`.repartitionByRange()\` or using Adaptive Query Execution (AQE) with skewed join auto-splitting.`,
        votes: 24,
        userVote: 0,
        isAccepted: true,
        createdAt: '18 hours ago',
      }
    ],
  },
  {
    id: 'astar-inadmissible',
    type: 'question',
    title: 'Time complexity of A* search with inadmissible heuristic',
    content: `If the heuristic function overestimates the true cost to the goal, A* loses its guarantee of optimality. However, practically, it can behave like a greedy best-first search, potentially exploring fewer states while sacrificing shortest-path guarantees.`,
    category: 'cse',
    courseCode: 'CSE 340',
    tags: ['CSE 340', 'algorithms'],
    author: {
      id: 'user-eleanor-vance',
      name: 'Dr. Eleanor Vance',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBMlmcTn6lmo1wtxUflhv2jig0Vk-e0FRxZYDTRydAXiBJCVHU4JdCmsh7yUf0ZSSTVAb6OdVg5NfdAkf8Mamg8LUGK5StEzDPmoFZVX-m2a-g0Zpobd-Vs3iOuYgrpd99QyY0GsajV-Fcr8ZmjlXou15xU41HqbsvYlTRfcbBuGmWPL9EzH4BQYPuJ6cEcC4rkAq945nRrnI_L0N5JbXN2z3_jIrti4rmJiKS9SgsftzGSpBGfkG-Haw',
      reputation: 12450,
      repType: 'star',
    },
    votes: 15,
    userVote: 0,
    bookmarked: false,
    createdAt: '3 days ago',
    views: 198,
    answersCount: 2,
    answers: [],
  },
  {
    id: 'linear-algebra-review',
    type: 'note',
    title: 'Advanced Linear Algebra - Midterm Review Guide',
    content: `Comprehensive notes covering vector spaces, linear transformations, eigenvalues, eigenvectors, Gram-Schmidt orthogonalization, and Singular Value Decomposition (SVD) with worked practice proofs.`,
    category: 'math',
    courseCode: 'MATH 302',
    tags: ['MATH 302', 'linear-algebra', 'notes'],
    pageCount: 18,
    downloadCount: 94,
    likesCount: 128,
    userLiked: true,
    author: {
      id: 'user-eleanor-vance',
      name: 'Dr. Eleanor Vance',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBMlmcTn6lmo1wtxUflhv2jig0Vk-e0FRxZYDTRydAXiBJCVHU4JdCmsh7yUf0ZSSTVAb6OdVg5NfdAkf8Mamg8LUGK5StEzDPmoFZVX-m2a-g0Zpobd-Vs3iOuYgrpd99QyY0GsajV-Fcr8ZmjlXou15xU41HqbsvYlTRfcbBuGmWPL9EzH4BQYPuJ6cEcC4rkAq945nRrnI_L0N5JbXN2z3_jIrti4rmJiKS9SgsftzGSpBGfkG-Haw',
      reputation: 12450,
      repType: 'star',
    },
    votes: 128,
    userVote: 0,
    bookmarked: true,
    createdAt: '4 days ago',
    views: 520,
    answersCount: 0,
    answers: [],
  },
];

export const RELATED_QUESTIONS = [
  {
    id: 'throttle-scroll',
    title: 'How to throttle scroll events in React functional components?',
    votes: 32,
    answersCount: 5,
  },
  {
    id: 'settimeout-vs-raf',
    title: 'Difference between setTimeout and requestAnimationFrame for UI updates?',
    votes: 89,
    answersCount: 12,
  },
  {
    id: 'react-memo-vs-usecallback',
    title: 'When should React.memo be used alongside useCallback to prevent re-renders?',
    votes: 45,
    answersCount: 7,
  }
];

export const TRENDING_TOPICS = [
  { tag: '#MachineLearning', count: '342 questions this week', category: 'cse' },
  { tag: '#LinearAlgebra', count: '128 notes shared', category: 'math' },
  { tag: '#CircuitDesign', count: 'Trending in ECE', category: 'ece' },
  { tag: '#QuantumComputing', count: '94 active discussions', category: 'physics' },
];

export const TOP_CONTRIBUTORS = [
  {
    id: 'dr-chen',
    name: 'Dr. Robert Chen',
    department: 'Math Dept',
    reputation: '4.8k',
    repType: 'star' as const,
    initials: 'DR',
  },
  {
    id: 'elena-rostova',
    name: 'Elena Rostova',
    department: 'Physics',
    reputation: '3.2k',
    repType: 'bolt' as const,
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBfpvbM9eQOJ9I6KJgEaDpFrAJQ2mP9S1vXyeGxYxvJf9O46Ubvemmf6n7F3gTDvBR_1h5zn1Q54dM0hQEtqvbmp0g0OxH7fGe-tZMXY-RSl-JzJfwYfIGXp6M2qb9DrJKoU5nsRTAvz8Om_G1ow9fSd4QaB0jp0sqlL5ROXoCRGOgAvfuGDXbSiq5Fb6WIKFIyqDaQObwpGwql0HLdsVuGvcLb5TVagG-8fEuIOG17ydEqufh6FXCFAw',
  },
  {
    id: 'sarah-codes',
    name: 'SarahCodes',
    department: 'CSE / Teaching Asst',
    reputation: '15.0k',
    repType: 'star' as const,
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDuhCarRDkKBU3sssuZrL_mMgSVbL_6XNeDKKEyqCqr8t2p0KdmCMr9142rrscWxVk_h8e8T0gpEIBGoSx_Yorwp0mBUw62Qv7BWRHntoRL_hqGpIZwgDuxnmM0OVTEP53cogC5HETZWah0MoRZ8uwpQ_ohHr8FfeqvK2xxgW2rF3NBnlQ7xLaEVGm6KKronZhPkyAUiFTBF6nYiR0VxXxAM3llcrC1P1WXR1fyiYSuaajUiPBQZO54SA',
  },
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    type: 'answer',
    title: 'SarahCodes answered your question',
    description: 'Accepted answer on "How do I implement a custom hook for debouncing in React?"',
    time: '1 hour ago',
    read: false,
    targetPostId: 'react-debounce-hook',
  },
  {
    id: 'notif-2',
    type: 'upvote',
    title: 'New upvotes on your note',
    description: 'Your note "Advanced Linear Algebra - Midterm Review Guide" reached 128 likes!',
    time: '3 hours ago',
    read: false,
    targetPostId: 'linear-algebra-review',
  },
  {
    id: 'notif-3',
    type: 'note',
    title: 'New Study Guide in Physics',
    description: 'Sarah Jenkins uploaded "Quantum Mechanics II (Midterm Prep)"',
    time: '5 hours ago',
    read: true,
    targetPostId: 'quantum-mechanics-guide',
  },
];
