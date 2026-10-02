export type Language = 'kk' | 'ru' | 'en';

export interface QuizQuestion {
  id: string;
  type: 'multiple_choice' | 'detail_memory' | 'quote_memory' | 'character_action';
  question: Record<Language, string>;
  options: Record<Language, string[]>;
  correctIndex: number;
  explanation: Record<Language, string>;
}

export interface OpenQuestion {
  id: string;
  prompt: Record<Language, string>;
  keyThemes: Record<Language, string[]>;
  sampleAnswer: Record<Language, string>;
}

export interface Chapter {
  id: string;
  title: Record<Language, string>;
  content: Record<Language, string>;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role?: 'user' | 'admin';
  password?: string;
  avatarColor?: string;
  joinedDate: string;
  bio?: string;
}

export interface Book {
  id: string;
  title: Record<Language, string>;
  author: Record<Language, string>;
  year: number;
  genre: Record<Language, string>;
  level: 'beginner' | 'intermediate' | 'advanced';
  coverImage: string;
  synopsis: Record<Language, string>;
  chapters: Chapter[];
  estimatedReadMinutes: number;
  tags: Record<Language, string[]>;
  createdByUserId?: string;
  createdByUserName?: string;
  createdAt?: string;
  isCatalog?: boolean;
  quizzes: {
    questions: QuizQuestion[];
    openQuestion: OpenQuestion;
  };
}

export interface QuizAttempt {
  id: string;
  bookId: string;
  bookTitle: string;
  bookAuthor: string;
  date: string;
  score: number;
  total: number;
  percentage: number;
  timeSpentSeconds: number;
  answers: Record<string, number>;
  openAnswer?: string;
  openEvaluation?: {
    score: number; // 0 to 10
    feedback: Record<Language, string>;
    foundThemes: string[];
  };
}

export interface UserStats {
  readerName: string;
  completedBookIds: string[];
  attempts: QuizAttempt[];
  totalReadingTimeMinutes: number;
  favoriteBookId?: string;
}

export type ReaderTheme = 'light' | 'sepia' | 'dark';
export type ReaderFontSize = 'sm' | 'md' | 'lg' | 'xl';
export type ReaderFontFamily = 'serif' | 'sans';
