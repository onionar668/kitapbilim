import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Activity,
  BookOpen,
  Check,
  Loader2,
  Pencil,
  Plus,
  RefreshCw,
  Search,
  Shield,
  Tag,
  Trash2,
  Users,
  X,
} from 'lucide-react';
import {
  AdminReaderRow,
  AdminUserRow,
  BookCategory,
  createBook,
  createCategory,
  deleteBook,
  deleteCategory,
  fetchAdminReaders,
  fetchAdminUsers,
  fetchBooks,
  fetchCategories,
  updateBook,
  updateCategory,
} from '../api/books';
import { Book, Language, User } from '../types';
import { translations } from '../utils/translations';

type AdminSection = 'users' | 'readers' | 'categories' | 'books';
type LocalizedText = Record<Language, string>;

interface AdminViewProps {
  currentLang: Language;
  currentUser: User;
  onBooksChanged: (books: Book[]) => void;
}

interface BookDraft {
  title: LocalizedText;
  author: LocalizedText;
  genre: LocalizedText;
  content: LocalizedText;
  publishToCatalog: boolean;
}

interface BookEditDraft {
  id: string;
  title: LocalizedText;
  author: LocalizedText;
  publishToCatalog: boolean;
}

const languages: Language[] = ['kk', 'ru', 'en'];
const languageNames: Record<Language, string> = {
  kk: 'Қазақша',
  ru: 'Русский',
  en: 'English',
};

const emptyLocalizedText = (): LocalizedText => ({ kk: '', ru: '', en: '' });
const emptyBookDraft = (): BookDraft => ({
  title: emptyLocalizedText(),
  author: emptyLocalizedText(),
  genre: emptyLocalizedText(),
  content: emptyLocalizedText(),
  publishToCatalog: true,
});

const inputClass =
  'w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 outline-none transition focus:border-amber-700 focus:ring-2 focus:ring-amber-700/15';
const secondaryButtonClass =
  'inline-flex items-center justify-center gap-2 rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm font-semibold text-stone-700 transition hover:bg-stone-50 disabled:cursor-not-allowed disabled:opacity-50';

export const AdminView: React.FC<AdminViewProps> = ({
  currentLang,
  currentUser,
  onBooksChanged,
}) => {
  const t = translations[currentLang];
  const [section, setSection] = useState<AdminSection>('users');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [actionError, setActionError] = useState<'validation' | 'request' | null>(null);
  const [users, setUsers] = useState<AdminUserRow[]>([]);
  const [readers, setReaders] = useState<AdminReaderRow[]>([]);
  const [categories, setCategories] = useState<BookCategory[]>([]);
  const [books, setBooks] = useState<Book[]>([]);

  const [categoryFormOpen, setCategoryFormOpen] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
  const [categoryDraft, setCategoryDraft] = useState<LocalizedText>(emptyLocalizedText);
  const [savingCategory, setSavingCategory] = useState(false);
  const [deletingCategoryId, setDeletingCategoryId] = useState<string | null>(null);

  const [bookFormOpen, setBookFormOpen] = useState(false);
  const [bookDraft, setBookDraft] = useState<BookDraft>(emptyBookDraft);
  const [savingBook, setSavingBook] = useState(false);
  const [editingBook, setEditingBook] = useState<BookEditDraft | null>(null);
  const [savingBookId, setSavingBookId] = useState<string | null>(null);
  const [deletingBookId, setDeletingBookId] = useState<string | null>(null);

  const pickTitle = (record?: Record<Language, string>) =>
    record?.[currentLang] || record?.ru || record?.kk || '—';

  const loadAll = useCallback(async (isRefresh = false) => {
    if (currentUser.role !== 'admin') {
      setLoading(false);
      return;
    }

    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    setLoadError(false);

    try {
      const [usersData, readersData, categoriesData, booksData] = await Promise.all([
        fetchAdminUsers(),
        fetchAdminReaders(),
        fetchCategories(),
        fetchBooks(),
      ]);
      setUsers(usersData);
      setReaders(readersData);
      setCategories(categoriesData);
      setBooks(booksData);
      onBooksChanged(booksData);
    } catch (error) {
      console.error('Failed to load admin dashboard data:', error);
      setLoadError(true);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [currentUser.role, onBooksChanged]);

  useEffect(() => {
    void loadAll();
  }, [loadAll]);

  const visibleUsers = useMemo(() => {
    const query = search.trim().toLocaleLowerCase();
    if (!query) return users;
    return users.filter((user) =>
      `${user.name} ${user.email} ${user.role} ${user.currentBook ? pickTitle(user.currentBook.title) : ''}`
        .toLocaleLowerCase()
        .includes(query)
    );
  }, [users, search, currentLang]);

  const visibleReaders = useMemo(() => {
    const query = search.trim().toLocaleLowerCase();
    if (!query) return readers;
    return readers.filter((reader) =>
      `${reader.user.name} ${reader.user.email} ${pickTitle(reader.book.title)} ${pickTitle(reader.book.author)}`
        .toLocaleLowerCase()
        .includes(query)
    );
  }, [readers, search, currentLang]);

  const visibleCategories = useMemo(() => {
    const query = search.trim().toLocaleLowerCase();
    if (!query) return categories;
    return categories.filter((category) =>
      `${category.slug} ${Object.values(category.label).join(' ')}`
        .toLocaleLowerCase()
        .includes(query)
    );
  }, [categories, search]);

  const visibleBooks = useMemo(() => {
    const query = search.trim().toLocaleLowerCase();
    if (!query) return books;
    return books.filter((book) =>
      `${pickTitle(book.title)} ${pickTitle(book.author)} ${book.createdByUserName ?? ''}`
        .toLocaleLowerCase()
        .includes(query)
    );
  }, [books, search, currentLang]);

  const updateBooks = (nextBooks: Book[]) => {
    setBooks(nextBooks);
    onBooksChanged(nextBooks);
  };

  const clearActionError = () => setActionError(null);

  const openCategoryCreate = () => {
    setEditingCategoryId(null);
    setCategoryDraft(emptyLocalizedText());
    setCategoryFormOpen(true);
    clearActionError();
  };

  const openCategoryEdit = (category: BookCategory) => {
    setEditingCategoryId(category.id);
    setCategoryDraft({
      kk: category.label.kk ?? '',
      ru: category.label.ru ?? '',
      en: category.label.en ?? '',
    });
    setCategoryFormOpen(true);
    clearActionError();
  };

  const closeCategoryForm = () => {
    setCategoryFormOpen(false);
    setEditingCategoryId(null);
    setCategoryDraft(emptyLocalizedText());
  };

  const saveCategory = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (languages.some((language) => !categoryDraft[language].trim())) {
      setActionError('validation');
      return;
    }

    setSavingCategory(true);
    clearActionError();
    try {
      if (editingCategoryId) {
        const saved = await updateCategory(editingCategoryId, { label: categoryDraft });
        setCategories((previous) =>
          previous.map((category) => category.id === saved.id ? saved : category)
        );
      } else {
        const saved = await createCategory(categoryDraft);
        setCategories((previous) => [...previous, saved]);
      }
      closeCategoryForm();
    } catch (error) {
      console.error('Failed to save category:', error);
      setActionError('request');
    } finally {
      setSavingCategory(false);
    }
  };

  const removeCategory = async (category: BookCategory) => {
    if (!window.confirm(t.adminConfirmDeleteCategory)) return;
    setDeletingCategoryId(category.id);
    clearActionError();
    try {
      await deleteCategory(category.id);
      setCategories((previous) => previous.filter((item) => item.id !== category.id));
    } catch (error) {
      console.error('Failed to delete category:', error);
      setActionError('request');
    } finally {
      setDeletingCategoryId(null);
    }
  };

  const createAdminBook = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      languages.some((language) => !bookDraft.title[language].trim()) ||
      languages.some((language) => !bookDraft.author[language].trim()) ||
      languages.some((language) => !bookDraft.content[language].trim())
    ) {
      setActionError('validation');
      return;
    }

    setSavingBook(true);
    clearActionError();
    const content = {
      kk: bookDraft.content.kk.trim(),
      ru: bookDraft.content.ru.trim(),
      en: bookDraft.content.en.trim(),
    };
    const wordCount = Math.max(
      ...Object.values(content).map((text) => text.trim().split(/\s+/).filter(Boolean).length)
    );
    const title = {
      kk: bookDraft.title.kk.trim(),
      ru: bookDraft.title.ru.trim(),
      en: bookDraft.title.en.trim(),
    };

    try {
      const saved = await createBook({
        title,
        author: {
          kk: bookDraft.author.kk.trim(),
          ru: bookDraft.author.ru.trim(),
          en: bookDraft.author.en.trim(),
        },
        year: new Date().getFullYear(),
        genre: {
          kk: bookDraft.genre.kk.trim(),
          ru: bookDraft.genre.ru.trim(),
          en: bookDraft.genre.en.trim(),
        },
        level: 'intermediate',
        coverImage: '',
        synopsis: content,
        chapters: [{
          id: 'admin-chapter-1',
          title,
          content,
        }],
        estimatedReadMinutes: Math.max(1, Math.ceil(wordCount / 150)),
        tags: { kk: [], ru: [], en: [] },
        publishToCatalog: bookDraft.publishToCatalog,
      });
      updateBooks([saved, ...books]);
      setBookDraft(emptyBookDraft());
      setBookFormOpen(false);
    } catch (error) {
      console.error('Failed to create book:', error);
      setActionError('request');
    } finally {
      setSavingBook(false);
    }
  };

  const openBookEdit = (book: Book) => {
    setEditingBook({
      id: book.id,
      title: { ...book.title },
      author: { ...book.author },
      publishToCatalog: Boolean(book.isCatalog),
    });
    clearActionError();
  };

  const saveBookEdit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!editingBook) return;
    if (
      languages.some((language) => !editingBook.title[language].trim()) ||
      languages.some((language) => !editingBook.author[language].trim())
    ) {
      setActionError('validation');
      return;
    }

    setSavingBookId(editingBook.id);
    clearActionError();
    try {
      const saved = await updateBook(editingBook.id, {
        title: editingBook.title,
        author: editingBook.author,
        publishToCatalog: editingBook.publishToCatalog,
      });
      updateBooks(books.map((book) => book.id === saved.id ? saved : book));
      setEditingBook(null);
    } catch (error) {
      console.error('Failed to update book:', error);
      setActionError('request');
    } finally {
      setSavingBookId(null);
    }
  };

  const removeBook = async (book: Book) => {
    if (!window.confirm(t.adminConfirmDeleteBook)) return;
    setDeletingBookId(book.id);
    clearActionError();
    try {
      await deleteBook(book.id);
      updateBooks(books.filter((item) => item.id !== book.id));
    } catch (error) {
      console.error('Failed to delete book:', error);
      setActionError('request');
    } finally {
      setDeletingBookId(null);
    }
  };

  const formatDate = (value?: string) => {
    if (!value) return '—';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return '—';
    const locale = currentLang === 'kk' ? 'kk-KZ' : currentLang === 'ru' ? 'ru-RU' : 'en-US';
    return new Intl.DateTimeFormat(locale, { dateStyle: 'medium' }).format(date);
  };

  const sectionItems: { id: AdminSection; label: string; count: number; icon: React.ReactNode }[] = [
    { id: 'users', label: t.adminUsers, count: users.length, icon: <Users className="h-4 w-4" /> },
    { id: 'readers', label: t.adminReaders, count: readers.length, icon: <Activity className="h-4 w-4" /> },
    { id: 'categories', label: t.adminCategories, count: categories.length, icon: <Tag className="h-4 w-4" /> },
    { id: 'books', label: t.adminBooks, count: books.length, icon: <BookOpen className="h-4 w-4" /> },
  ];

  const localizedInputs = (
    field: 'title' | 'author' | 'genre' | 'content',
    values: LocalizedText,
    onChange: (language: Language, value: string) => void,
    required = false,
    multiline = false,
  ) => (
    <div className={field === 'content' ? 'space-y-3' : 'grid gap-3 sm:grid-cols-3'}>
      {languages.map((language) => (
        <label key={`${field}-${language}`} className="block min-w-0 space-y-1.5">
          <span className="text-xs font-semibold text-stone-600">
            {languageNames[language]}{required ? ' *' : ''}
          </span>
          {multiline ? (
            <textarea
              rows={4}
              className={`${inputClass} resize-y`}
              value={values[language]}
              onChange={(event) => onChange(language, event.target.value)}
              required={required}
            />
          ) : (
            <input
              className={inputClass}
              value={values[language]}
              onChange={(event) => onChange(language, event.target.value)}
              required={required}
            />
          )}
        </label>
      ))}
    </div>
  );

  if (currentUser.role !== 'admin') {
    return (
      <main className="mx-auto max-w-3xl px-4 py-16 text-center">
        <Shield className="mx-auto h-10 w-10 text-stone-400" />
        <h1 className="mt-4 text-xl font-bold text-stone-900">{t.adminAccessDenied}</h1>
        <p className="mt-2 text-sm text-stone-600">{t.adminAccessDeniedDescription}</p>
      </main>
    );
  }

  if (loading) {
    return (
      <main className="mx-auto flex min-h-[50vh] max-w-7xl items-center justify-center px-4">
        <div role="status" className="flex items-center gap-3 text-sm font-medium text-stone-600">
          <Loader2 className="h-5 w-5 animate-spin text-amber-700" />
          {t.adminRefresh}…
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl space-y-6 px-4 py-6 pb-24 sm:px-6 sm:py-10 md:pb-10">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-900">
            <Shield className="h-3.5 w-3.5" />
            KitapBilim
          </div>
          <h1 className="font-display-book text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
            {t.adminTitle}
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-stone-600">
            {t.adminDescription}
          </p>
        </div>
        <button
          type="button"
          onClick={() => void loadAll(true)}
          disabled={refreshing}
          className={secondaryButtonClass}
        >
          <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
          {t.adminRefresh}
        </button>
      </header>

      <section aria-label={t.adminTitle} className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {sectionItems.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setSection(item.id)}
            className={`rounded-xl border p-4 text-left transition ${
              section === item.id
                ? 'border-amber-300 bg-amber-50 shadow-sm'
                : 'border-stone-200 bg-white hover:border-stone-300 hover:bg-stone-50'
            }`}
          >
            <span className="flex items-center justify-between text-stone-500">
              <span className="text-xs font-semibold uppercase tracking-wide">{item.label}</span>
              <span className={section === item.id ? 'text-amber-800' : 'text-stone-400'}>
                {item.icon}
              </span>
            </span>
            <span className="mt-2 block font-display-book text-2xl font-bold text-stone-900">
              {item.count}
            </span>
          </button>
        ))}
      </section>

      {loadError && (
        <div role="alert" className="flex flex-col gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800 sm:flex-row sm:items-center sm:justify-between">
          <span>{t.adminLoadError}</span>
          <button
            type="button"
            onClick={() => void loadAll(true)}
            disabled={refreshing}
            className="inline-flex items-center gap-2 self-start font-semibold underline underline-offset-2 disabled:opacity-50 sm:self-auto"
          >
            {refreshing && <Loader2 className="h-4 w-4 animate-spin" />}
            {t.adminRefresh}
          </button>
        </div>
      )}

      <section className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-stone-200 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <div className="no-scrollbar flex gap-1 overflow-x-auto" role="tablist" aria-label={t.adminTitle}>
            {sectionItems.map((item) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={section === item.id}
                onClick={() => setSection(item.id)}
                className={`inline-flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition ${
                  section === item.id
                    ? 'bg-stone-900 text-white'
                    : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
                }`}
              >
                {item.icon}
                {item.label}
                <span className={`rounded-full px-1.5 py-0.5 text-[10px] ${
                  section === item.id ? 'bg-white/15 text-white' : 'bg-stone-100 text-stone-500'
                }`}>
                  {item.count}
                </span>
              </button>
            ))}
          </div>
          <label className="relative block w-full sm:max-w-xs">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={t.adminSearch}
              aria-label={t.adminSearch}
              className={`${inputClass} pl-9`}
            />
          </label>
        </div>

        {actionError && (
          <div role="alert" className="mx-4 mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 sm:mx-5">
            {actionError === 'validation' ? t.adminRequiredFields : t.adminActionError}
          </div>
        )}

        {section === 'users' && (
          visibleUsers.length > 0 ? (
            <div className="divide-y divide-stone-100">
              {visibleUsers.map((user) => (
                <article key={user.id} className="grid gap-3 p-4 sm:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_auto] sm:items-center sm:px-5">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="truncate text-sm font-bold text-stone-900">{user.name}</h2>
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                        user.role === 'admin'
                          ? 'bg-amber-100 text-amber-900'
                          : 'bg-stone-100 text-stone-600'
                      }`}>
                        {user.role === 'admin' ? t.adminRoleAdmin : t.adminRoleUser}
                      </span>
                    </div>
                    <p className="mt-1 truncate text-xs text-stone-500">{user.email}</p>
                  </div>
                  <div className="min-w-0 text-xs text-stone-600">
                    <p className="font-semibold text-stone-800">
                      {t.adminCurrentBook}: {user.currentBook ? pickTitle(user.currentBook.title) : t.adminNoCurrentBook}
                    </p>
                    {user.currentBook && (
                      <p className="mt-1 truncate">
                        {user.currentBook.progressPercent}% · {formatDate(user.currentBook.lastReadAt)}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center justify-between gap-4 text-xs text-stone-500 sm:block sm:text-right">
                    <span>{t.adminReadings}: <strong className="text-stone-800">{user.readingsCount ?? 0}</strong></span>
                    <p className="sm:mt-1">{t.adminJoined}: {formatDate(user.joinedDate)}</p>
                  </div>
                </article>
              ))}
            </div>
          ) : <EmptyState message={t.adminNoResults} />
        )}

        {section === 'readers' && (
          visibleReaders.length > 0 ? (
            <div className="divide-y divide-stone-100">
              {visibleReaders.map((reader) => (
                <article key={reader.id} className="grid gap-4 p-4 sm:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_minmax(140px,0.8fr)] sm:items-center sm:px-5">
                  <div className="min-w-0">
                    <h2 className="truncate text-sm font-bold text-stone-900">{reader.user.name}</h2>
                    <p className="mt-1 truncate text-xs text-stone-500">{reader.user.email}</p>
                    <p className="mt-2 truncate text-sm font-semibold text-stone-800">{pickTitle(reader.book.title)}</p>
                    <p className="truncate text-xs text-stone-500">{pickTitle(reader.book.author)}</p>
                  </div>
                  <div className="min-w-0">
                    <div className="mb-2 flex items-center justify-between gap-3 text-xs">
                      <span className="font-medium text-stone-600">
                        {reader.status === 'completed' ? t.adminCompleted : t.adminReading}
                      </span>
                      <span className="font-bold tabular-nums text-stone-800">{reader.progressPercent}%</span>
                    </div>
                    <div
                      className="h-2 overflow-hidden rounded-full bg-stone-100"
                      role="progressbar"
                      aria-label={t.adminProgress}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-valuenow={Math.min(100, Math.max(0, reader.progressPercent))}
                    >
                      <div
                        className="h-full rounded-full bg-amber-600 transition-all"
                        style={{ width: `${Math.min(100, Math.max(0, reader.progressPercent))}%` }}
                      />
                    </div>
                    <p className="mt-2 text-xs text-stone-500">
                      {t.adminChapter} {reader.chapterIndex + 1}
                    </p>
                  </div>
                  <div className="text-xs leading-5 text-stone-500">
                    <p>{t.adminStarted}: {formatDate(reader.startedAt)}</p>
                    <p>{t.adminLastRead}: {formatDate(reader.lastReadAt)}</p>
                  </div>
                </article>
              ))}
            </div>
          ) : <EmptyState message={t.adminNoResults} />
        )}

        {section === 'categories' && (
          <div className="p-4 sm:p-5">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-stone-600">{t.adminCategoryDescription}</p>
              <button
                type="button"
                onClick={openCategoryCreate}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-stone-900 px-3.5 py-2 text-sm font-semibold text-white transition hover:bg-stone-800"
              >
                <Plus className="h-4 w-4" />
                {t.adminAddCategory}
              </button>
            </div>

            {categoryFormOpen && (
              <form onSubmit={saveCategory} className="mb-5 space-y-4 rounded-xl border border-amber-200 bg-amber-50/50 p-4">
                <h2 className="text-sm font-bold text-stone-900">
                  {editingCategoryId ? t.adminEditCategory : t.adminAddCategory}
                </h2>
                <div className="grid gap-3 sm:grid-cols-3">
                  {languages.map((language) => (
                    <label key={language} className="block space-y-1.5">
                      <span className="text-xs font-semibold text-stone-600">{languageNames[language]} *</span>
                      <input
                        className={inputClass}
                        value={categoryDraft[language]}
                        onChange={(event) => setCategoryDraft((previous) => ({
                          ...previous,
                          [language]: event.target.value,
                        }))}
                        required
                        maxLength={255}
                      />
                    </label>
                  ))}
                </div>
                <div className="flex flex-wrap justify-end gap-2">
                  <button type="button" onClick={closeCategoryForm} className={secondaryButtonClass}>
                    <X className="h-4 w-4" />
                    {t.adminCancel}
                  </button>
                  <button
                    type="submit"
                    disabled={savingCategory}
                    className="inline-flex items-center gap-2 rounded-lg bg-amber-800 px-3.5 py-2 text-sm font-semibold text-white transition hover:bg-amber-900 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {savingCategory ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
                    {t.adminSave}
                  </button>
                </div>
              </form>
            )}

            {visibleCategories.length > 0 ? (
              <div className="divide-y divide-stone-100 rounded-xl border border-stone-200">
                {visibleCategories.map((category) => (
                  <article key={category.id} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0">
                      <h2 className="text-sm font-bold text-stone-900">
                        {category.label[currentLang] || category.label.ru || category.label.kk}
                      </h2>
                      <p className="mt-1 text-xs text-stone-500">{category.slug}</p>
                    </div>
                    <div className="flex shrink-0 gap-2">
                      <button
                        type="button"
                        onClick={() => openCategoryEdit(category)}
                        className={secondaryButtonClass}
                        aria-label={`${t.adminEditCategory}: ${category.label[currentLang]}`}
                      >
                        <Pencil className="h-4 w-4" />
                        {t.adminEditCategory}
                      </button>
                      <button
                        type="button"
                        onClick={() => void removeCategory(category)}
                        disabled={deletingCategoryId === category.id}
                        className="inline-flex items-center justify-center gap-2 rounded-lg border border-red-200 bg-white px-3 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                        aria-label={`${t.adminDelete}: ${category.label[currentLang]}`}
                      >
                        {deletingCategoryId === category.id
                          ? <Loader2 className="h-4 w-4 animate-spin" />
                          : <Trash2 className="h-4 w-4" />}
                        <span className="hidden sm:inline">{t.adminDelete}</span>
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            ) : <EmptyState message={t.adminNoResults} />}
          </div>
        )}

        {section === 'books' && (
          <div className="p-4 sm:p-5">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-stone-600">{t.adminBookDescription}</p>
              <button
                type="button"
                onClick={() => {
                  setBookFormOpen((open) => !open);
                  setBookDraft(emptyBookDraft());
                  clearActionError();
                }}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-stone-900 px-3.5 py-2 text-sm font-semibold text-white transition hover:bg-stone-800"
              >
                {bookFormOpen ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                {bookFormOpen ? t.adminCancel : t.adminAddBook}
              </button>
            </div>

            {bookFormOpen && (
              <form onSubmit={createAdminBook} className="mb-5 space-y-5 rounded-xl border border-amber-200 bg-amber-50/50 p-4">
                <h2 className="text-sm font-bold text-stone-900">{t.adminAddBook}</h2>
                <fieldset className="space-y-2">
                  <legend className="mb-2 text-xs font-bold uppercase tracking-wide text-stone-600">{t.adminBookTitle}</legend>
                  {localizedInputs('title', bookDraft.title, (language, value) => setBookDraft((previous) => ({
                    ...previous,
                    title: { ...previous.title, [language]: value },
                  })), true)}
                </fieldset>
                <fieldset className="space-y-2">
                  <legend className="mb-2 text-xs font-bold uppercase tracking-wide text-stone-600">{t.adminBookAuthor}</legend>
                  {localizedInputs('author', bookDraft.author, (language, value) => setBookDraft((previous) => ({
                    ...previous,
                    author: { ...previous.author, [language]: value },
                  })), true)}
                </fieldset>
                <fieldset className="space-y-2">
                  <legend className="mb-2 text-xs font-bold uppercase tracking-wide text-stone-600">{t.adminBookGenre}</legend>
                  {localizedInputs('genre', bookDraft.genre, (language, value) => setBookDraft((previous) => ({
                    ...previous,
                    genre: { ...previous.genre, [language]: value },
                  })))}
                </fieldset>
                <fieldset className="space-y-2">
                  <legend className="mb-2 text-xs font-bold uppercase tracking-wide text-stone-600">{t.adminBookContent}</legend>
                  {localizedInputs('content', bookDraft.content, (language, value) => setBookDraft((previous) => ({
                    ...previous,
                    content: { ...previous.content, [language]: value },
                  })), true, true)}
                </fieldset>
                <label className="flex items-start gap-2 text-sm text-stone-700">
                  <input
                    type="checkbox"
                    checked={bookDraft.publishToCatalog}
                    onChange={(event) => setBookDraft((previous) => ({
                      ...previous,
                      publishToCatalog: event.target.checked,
                    }))}
                    className="mt-0.5 h-4 w-4 rounded border-stone-300 accent-amber-800"
                  />
                  <span>{t.adminCatalog}</span>
                </label>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={savingBook}
                    className="inline-flex items-center gap-2 rounded-lg bg-amber-800 px-3.5 py-2 text-sm font-semibold text-white transition hover:bg-amber-900 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {savingBook ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
                    {t.adminCreateBook}
                  </button>
                </div>
              </form>
            )}

            {visibleBooks.length > 0 ? (
              <div className="divide-y divide-stone-100 rounded-xl border border-stone-200">
                {visibleBooks.map((book) => (
                  <article key={book.id} className="p-4">
                    {editingBook?.id === book.id ? (
                      <form onSubmit={saveBookEdit} className="space-y-4">
                        <h2 className="text-sm font-bold text-stone-900">{t.adminEditBook}</h2>
                        <fieldset className="space-y-2">
                          <legend className="mb-2 text-xs font-bold uppercase tracking-wide text-stone-600">{t.adminBookTitle}</legend>
                          {localizedInputs('title', editingBook.title, (language, value) => setEditingBook((previous) =>
                            previous ? { ...previous, title: { ...previous.title, [language]: value } } : previous
                          ), true)}
                        </fieldset>
                        <fieldset className="space-y-2">
                          <legend className="mb-2 text-xs font-bold uppercase tracking-wide text-stone-600">{t.adminBookAuthor}</legend>
                          {localizedInputs('author', editingBook.author, (language, value) => setEditingBook((previous) =>
                            previous ? { ...previous, author: { ...previous.author, [language]: value } } : previous
                          ), true)}
                        </fieldset>
                        <label className="flex items-start gap-2 text-sm text-stone-700">
                          <input
                            type="checkbox"
                            checked={editingBook.publishToCatalog}
                            onChange={(event) => setEditingBook((previous) =>
                              previous ? { ...previous, publishToCatalog: event.target.checked } : previous
                            )}
                            className="mt-0.5 h-4 w-4 rounded border-stone-300 accent-amber-800"
                          />
                          <span>{t.adminCatalog}</span>
                        </label>
                        <div className="flex flex-wrap justify-end gap-2">
                          <button type="button" onClick={() => setEditingBook(null)} className={secondaryButtonClass}>
                            <X className="h-4 w-4" />
                            {t.adminCancel}
                          </button>
                          <button
                            type="submit"
                            disabled={savingBookId === book.id}
                            className="inline-flex items-center gap-2 rounded-lg bg-amber-800 px-3.5 py-2 text-sm font-semibold text-white transition hover:bg-amber-900 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            {savingBookId === book.id
                              ? <Loader2 className="h-4 w-4 animate-spin" />
                              : <Check className="h-4 w-4" />}
                            {t.adminSave}
                          </button>
                        </div>
                      </form>
                    ) : (
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <h2 className="truncate text-sm font-bold text-stone-900">{pickTitle(book.title)}</h2>
                            <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                              book.isCatalog
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-stone-100 text-stone-600'
                            }`}>
                              {book.isCatalog ? t.adminPublished : t.adminPrivate}
                            </span>
                          </div>
                          <p className="mt-1 truncate text-xs text-stone-500">
                            {pickTitle(book.author)}
                            {book.createdByUserName ? ` · ${book.createdByUserName}` : ''}
                            {` · ${book.chapters.length} ${t.adminChapter.toLocaleLowerCase()}`}
                          </p>
                        </div>
                        <div className="flex shrink-0 gap-2">
                          <button
                            type="button"
                            onClick={() => openBookEdit(book)}
                            className={secondaryButtonClass}
                            aria-label={`${t.adminEditBook}: ${pickTitle(book.title)}`}
                          >
                            <Pencil className="h-4 w-4" />
                            {t.adminEditBook}
                          </button>
                          <button
                            type="button"
                            onClick={() => void removeBook(book)}
                            disabled={deletingBookId === book.id}
                            className="inline-flex items-center justify-center gap-2 rounded-lg border border-red-200 bg-white px-3 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                            aria-label={`${t.adminDelete}: ${pickTitle(book.title)}`}
                          >
                            {deletingBookId === book.id
                              ? <Loader2 className="h-4 w-4 animate-spin" />
                              : <Trash2 className="h-4 w-4" />}
                            <span className="hidden sm:inline">{t.adminDelete}</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </article>
                ))}
              </div>
            ) : (
              !bookFormOpen && <EmptyState message={t.adminNoResults} />
            )}
          </div>
        )}
      </section>
    </main>
  );
};

const EmptyState: React.FC<{ message: string }> = ({ message }) => (
  <div className="px-5 py-12 text-center text-sm text-stone-500">{message}</div>
);
