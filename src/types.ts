export type PostType = 'question' | 'note';

export type AcademicCategory = 'all' | 'cse' | 'ece' | 'math' | 'physics' | 'general';

export interface Author {
  id: string;
  name: string;
  avatar: string;
  role?: string;
  department?: string;
  reputation: number;
  repType?: 'star' | 'bolt';
}

export interface Answer {
  id: string;
  author: Author;
  content: string;
  codeSnippet?: string;
  codeLanguage?: string;
  votes: number;
  userVote: 1 | -1 | 0;
  isAccepted?: boolean;
  createdAt: string;
}

export interface Attachment {
  name: string;
  size: string;
  type: string;
  pages?: number;
  url?: string;
}

export interface Post {
  id: string;
  type: PostType;
  title: string;
  content: string;
  codeSnippet?: string;
  codeLanguage?: string;
  category: AcademicCategory;
  courseCode?: string;
  tags: string[];
  author: Author;
  votes: number;
  userVote: 1 | -1 | 0;
  bookmarked: boolean;
  createdAt: string;
  views: number;
  answersCount: number;
  answers: Answer[];
  // Note-specific fields:
  pageCount?: number;
  pdfThumbnail?: string;
  downloadCount?: number;
  likesCount?: number;
  userLiked?: boolean;
  attachments?: Attachment[];
}

export interface UserProfile {
  id: string;
  name: string;
  title: string;
  department: string;
  bio: string;
  reputation: number;
  badges: Array<{ label: string; icon: string; color: string }>;
  avatar: string;
  followedCourses: Array<{ code: string; title: string }>;
  stats: {
    totalUpvotes: string;
    acceptedAns: number;
    notesShared: number;
    coursesCount: number;
  };
}

export interface StudyGroup {
  id: string;
  category: AcademicCategory;
  name: string;
  code: string;
  description: string;
  membersCount: number;
  isJoined: boolean;
  icon: string;
}

export interface NotificationItem {
  id: string;
  type: 'answer' | 'upvote' | 'mention' | 'note';
  title: string;
  description: string;
  time: string;
  read: boolean;
  targetPostId?: string;
}
