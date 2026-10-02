import { api } from './client';
import { Book, Language } from '../types';

export interface BookCategory {
  id: string;
  slug: string;
  label: Record<Language, string>;
}

export interface AdminReaderRow {
  id: number;
  user: { id: string; name: string; email: string };
  book: { id: string; title: Record<Language, string>; author: Record<Language, string> };
  status: string;
  chapterIndex: number;
  progressPercent: number;
  startedAt?: string;
  lastReadAt?: string;
  completedAt?: string;
}

export interface AdminUserRow {
  id: string;
  name: string;
  email: string;
  role: string;
  joinedDate?: string;
  readingsCount?: number;
  currentBook?: {
    id: string;
    title: Record<Language, string>;
    author: Record<Language, string>;
    status: string;
    progressPercent: number;
    lastReadAt?: string;
  } | null;
}

const emptyGenre = { kk: '', ru: '', en: '' };
const emptyTags = { kk: [] as string[], ru: [] as string[], en: [] as string[] };

export function normalizeBook(raw: Partial<Book> & { id: string }): Book {
  return {
    id: raw.id,
    title: raw.title ?? emptyGenre,
    author: raw.author ?? emptyGenre,
    year: raw.year ?? new Date().getFullYear(),
    genre: raw.genre ?? emptyGenre,
    level: raw.level ?? 'intermediate',
    coverImage: raw.coverImage ?? '',
    synopsis: raw.synopsis ?? emptyGenre,
    chapters: raw.chapters ?? [],
    estimatedReadMinutes: raw.estimatedReadMinutes ?? 5,
    tags: raw.tags ?? emptyTags,
    createdByUserId: raw.createdByUserId,
    createdByUserName: raw.createdByUserName,
    createdAt: raw.createdAt,
    quizzes: raw.quizzes ?? {
      questions: [],
      openQuestion: {
        id: 'open_default',
        prompt: emptyGenre,
        keyThemes: emptyTags,
        sampleAnswer: emptyGenre,
      },
    },
    isCatalog: raw.isCatalog,
  };
}

export async function fetchBooks(): Promise<Book[]> {
  const { data } = await api.get<Partial<Book>[]>('/books');
  return data.map((item) => normalizeBook(item as Partial<Book> & { id: string }));
}

export async function createBook(payload: Record<string, unknown>): Promise<Book> {
  const { data } = await api.post<Partial<Book>>('/books', payload);
  return normalizeBook(data as Partial<Book> & { id: string });
}

export async function updateBook(bookId: string, payload: Record<string, unknown>): Promise<Book> {
  const { data } = await api.put<Partial<Book>>(`/books/${bookId}`, payload);
  return normalizeBook(data as Partial<Book> & { id: string });
}

export async function deleteBook(bookId: string): Promise<void> {
  await api.delete(`/books/${bookId}`);
}

export async function syncReadingProgress(payload: {
  bookId: string;
  status?: 'reading' | 'completed';
  chapterIndex?: number;
  progressPercent?: number;
}): Promise<void> {
  await api.post('/readings', payload);
}

export async function fetchCategories(): Promise<BookCategory[]> {
  const { data } = await api.get<BookCategory[]>('/categories');
  return data;
}

export async function createCategory(label: Record<Language, string>): Promise<BookCategory> {
  const { data } = await api.post<BookCategory>('/categories', { label });
  return data;
}

export async function updateCategory(
  categoryId: string,
  payload: { label?: Record<Language, string>; slug?: string }
): Promise<BookCategory> {
  const { data } = await api.put<BookCategory>(`/categories/${categoryId}`, payload);
  return data;
}

export async function deleteCategory(categoryId: string): Promise<void> {
  await api.delete(`/categories/${categoryId}`);
}

export async function fetchAdminUsers(): Promise<AdminUserRow[]> {
  const { data } = await api.get<AdminUserRow[]>('/admin/users');
  return data;
}

export async function fetchAdminReaders(): Promise<AdminReaderRow[]> {
  const { data } = await api.get<AdminReaderRow[]>('/admin/readers');
  return data;
}
