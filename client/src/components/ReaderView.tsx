import React, { useState, useEffect, useRef } from 'react';
import { fetchReadingProgress, syncReadingProgress } from '../api/books';
import { Book, Language, ReaderTheme, ReaderFontSize, ReaderFontFamily, User } from '../types';
import { translations } from '../utils/translations';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Settings2,
  CheckCircle2,
  List,
} from 'lucide-react';

interface ReaderViewProps {
  book: Book;
  currentLang: Language;
  currentUser?: User | null;
  onBackToLibrary: () => void;
  onFinishReading: (position: Pick<SavedReaderPosition, 'chapterIndex' | 'scrollPercent'>) => void;
}

interface SavedReaderPosition {
  chapterIndex: number;
  scrollPercent: number;
  savedAt: number;
}

function readerPositionStorageKey(bookId: string, userId?: string): string {
  return `kitapbilim_reader_position:${userId ?? 'guest'}:${bookId}`;
}

export const ReaderView: React.FC<ReaderViewProps> = ({
  book,
  currentLang,
  currentUser,
  onBackToLibrary,
  onFinishReading,
}) => {
  const t = translations[currentLang];
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [theme, setTheme] = useState<ReaderTheme>('light');
  const [fontSize, setFontSize] = useState<ReaderFontSize>('lg');
  const [fontFamily, setFontFamily] = useState<ReaderFontFamily>('serif');
  const [showSettings, setShowSettings] = useState(false);
  const [showContents, setShowContents] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [progressReady, setProgressReady] = useState(false);

  const articleRef = useRef<HTMLDivElement>(null);
  const restoredScrollPercentRef = useRef<number | null>(null);
  const saveProgressRef = useRef<() => void>(() => undefined);
  const finishingRef = useRef(false);
  const saveInFlightRef = useRef(false);
  const pendingServerSaveRef = useRef<{
    bookId: string;
    chapterIndex: number;
    scrollPercent: number;
    progressPercent: number;
  } | null>(null);
  const serverSavePromiseRef = useRef<Promise<void>>(Promise.resolve());
  const flushServerSaveRef = useRef<() => Promise<void>>(async () => undefined);
  const saveTimerRef = useRef<number | undefined>(undefined);

  const chapters = book.chapters;
  const currentChapter = chapters[currentChapterIndex] || chapters[0];

  const bookTitle = book.title[currentLang] || book.title.ru;
  const author = book.author[currentLang] || book.author.ru;
  const chapterTitle = currentChapter?.title[currentLang] || currentChapter?.title.ru || '';
  const chapterContent = currentChapter?.content[currentLang] || currentChapter?.content.ru || '';

  useEffect(() => {
    const handleScroll = () => {
      const el = articleRef.current;
      if (!el) return;
      const articleTop = el.getBoundingClientRect().top + window.scrollY;
      const maxScroll = Math.max(0, el.offsetHeight - window.innerHeight);
      const current = Math.min(maxScroll, Math.max(0, window.scrollY - articleTop));
      const pct = maxScroll === 0 ? 0 : Math.round((current / maxScroll) * 100);
      setScrollProgress(pct);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    let active = true;
    setProgressReady(false);
    setCurrentChapterIndex(0);
    setScrollProgress(0);
    restoredScrollPercentRef.current = null;

    const storageKey = readerPositionStorageKey(book.id, currentUser?.id);
    let savedPosition: SavedReaderPosition | null = null;
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        const parsed = JSON.parse(stored) as Partial<SavedReaderPosition>;
        if (
          typeof parsed.chapterIndex === 'number' &&
          Number.isInteger(parsed.chapterIndex) &&
          typeof parsed.scrollPercent === 'number' &&
          Number.isFinite(parsed.scrollPercent) &&
          typeof parsed.savedAt === 'number' &&
          Number.isFinite(parsed.savedAt)
        ) {
          savedPosition = {
            chapterIndex: parsed.chapterIndex,
            scrollPercent: Math.min(100, Math.max(0, Math.round(parsed.scrollPercent))),
            savedAt: parsed.savedAt,
          };
        }
      }
    } catch (error) {
      console.error('Failed to read saved book position:', error);
    }

    const restoreProgress = async () => {
      if (currentUser) {
        try {
          const serverPosition = await fetchReadingProgress(book.id);
          if (serverPosition) {
            const serverSavedAt = serverPosition.lastReadAt
              ? Date.parse(serverPosition.lastReadAt)
              : 0;
            if (!savedPosition || serverSavedAt > savedPosition.savedAt) {
              savedPosition = {
                chapterIndex: serverPosition.chapterIndex,
                scrollPercent: serverPosition.scrollPercent,
                savedAt: Number.isFinite(serverSavedAt) ? serverSavedAt : Date.now(),
              };
            }
          }
        } catch (error) {
          console.error('Failed to load saved book position:', error);
        }
      }

      if (!active) return;

      if (savedPosition && chapters.length > 0) {
        const chapterIndex = Math.min(chapters.length - 1, Math.max(0, savedPosition.chapterIndex));
        restoredScrollPercentRef.current = Math.min(100, Math.max(0, savedPosition.scrollPercent));
        setCurrentChapterIndex(chapterIndex);
        setScrollProgress(Math.min(100, Math.max(0, savedPosition.scrollPercent)));
      }
      setProgressReady(true);
    };

    void restoreProgress();
    return () => {
      active = false;
    };
  }, [book.id, chapters.length, currentUser?.id]);

  useEffect(() => {
    if (!progressReady) return;

    const position: SavedReaderPosition = {
      chapterIndex: currentChapterIndex,
      scrollPercent: scrollProgress,
      savedAt: Date.now(),
    };
    const overall = Math.min(
      100,
      Math.round(((position.chapterIndex + position.scrollPercent / 100) / Math.max(chapters.length, 1)) * 100)
    );

    const saveProgress = () => {
      try {
        localStorage.setItem(
          readerPositionStorageKey(book.id, currentUser?.id),
          JSON.stringify(position)
        );
      } catch (error) {
        console.error('Failed to save book position locally:', error);
      }

      if (currentUser) {
        pendingServerSaveRef.current = {
          bookId: book.id,
          chapterIndex: position.chapterIndex,
          scrollPercent: position.scrollPercent,
          progressPercent: overall,
        };
        void flushServerSaveRef.current();
      }
    };
    saveProgressRef.current = saveProgress;

    const timer = window.setTimeout(saveProgress, 800);
    saveTimerRef.current = timer;
    return () => window.clearTimeout(timer);
  }, [book.id, chapters.length, currentChapterIndex, currentUser?.id, progressReady, scrollProgress]);

  flushServerSaveRef.current = async () => {
    if (saveInFlightRef.current) {
      await serverSavePromiseRef.current;
      if (pendingServerSaveRef.current) return flushServerSaveRef.current();
      return;
    }

    const payload = pendingServerSaveRef.current;
    if (!payload) return;

    pendingServerSaveRef.current = null;
    saveInFlightRef.current = true;
    const request = syncReadingProgress({ ...payload, status: 'reading' })
      .catch((error) => {
        console.error('Failed to save book position:', error);
      })
      .finally(() => {
        saveInFlightRef.current = false;
      });
    serverSavePromiseRef.current = request;
    await request;

    if (pendingServerSaveRef.current) return flushServerSaveRef.current();
  };

  useEffect(() => () => {
    if (!finishingRef.current) saveProgressRef.current();
  }, []);

  const finishReading = async () => {
    if (finishingRef.current) return;
    const position: SavedReaderPosition = {
      chapterIndex: currentChapterIndex,
      scrollPercent: scrollProgress,
      savedAt: Date.now(),
    };
    finishingRef.current = true;
    try {
      localStorage.setItem(
        readerPositionStorageKey(book.id, currentUser?.id),
        JSON.stringify(position)
      );
    } catch (error) {
      console.error('Failed to save book position locally:', error);
    }

    window.clearTimeout(saveTimerRef.current);
    if (currentUser) {
      const overall = Math.min(
        100,
        Math.round(((position.chapterIndex + position.scrollPercent / 100) / Math.max(chapters.length, 1)) * 100)
      );
      pendingServerSaveRef.current = {
        bookId: book.id,
        chapterIndex: position.chapterIndex,
        scrollPercent: position.scrollPercent,
        progressPercent: overall,
      };
      await flushServerSaveRef.current();
    }
    onFinishReading({
      chapterIndex: position.chapterIndex,
      scrollPercent: position.scrollPercent,
    });
  };

  useEffect(() => {
    const scrollPercent = restoredScrollPercentRef.current;
    if (!progressReady || scrollPercent === null) return;
    restoredScrollPercentRef.current = null;

    const restoreScroll = () => {
      const el = articleRef.current;
      if (!el) return;
      const articleTop = el.getBoundingClientRect().top + window.scrollY;
      const maxScroll = Math.max(0, el.offsetHeight - window.innerHeight);
      window.scrollTo({ top: articleTop + maxScroll * scrollPercent / 100, behavior: 'auto' });
    };

    window.requestAnimationFrame(() => window.requestAnimationFrame(restoreScroll));
  }, [currentChapterIndex, progressReady]);

  // Font size classes
  const fontSizes = {
    sm: 'text-sm sm:text-base leading-relaxed',
    md: 'text-base sm:text-lg leading-relaxed',
    lg: 'text-lg sm:text-xl leading-loose',
    xl: 'text-xl sm:text-2xl leading-loose',
  };

  const themeClasses = {
    light: 'reader-theme-light border-stone-200',
    sepia: 'reader-theme-sepia border-[#E2D6BE]',
    dark: 'reader-theme-dark border-stone-800',
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 ${themeClasses[theme]}`}>
      {/* Top Reading Progress Line */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-stone-200/40 z-50">
        <div
          className="h-full bg-amber-600 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Reader Control Header */}
      <header className={`sticky top-0 z-40 border-b backdrop-blur-md px-4 sm:px-6 py-3 transition-colors ${
        theme === 'dark' ? 'bg-stone-900/90 border-stone-800 text-stone-200' :
        theme === 'sepia' ? 'bg-[#F4ECD8]/95 border-[#E2D6BE] text-[#382E1E]' :
        'bg-[#FAF9F6]/95 border-stone-200 text-stone-900'
      }`}>
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          {/* Back button & Title */}
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={onBackToLibrary}
              className="p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer shrink-0"
              title={t.backToLibrary}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="truncate">
              <h2 className="font-display-book font-bold text-sm sm:text-base truncate">
                {bookTitle}
              </h2>
              <p className="text-xs opacity-75 truncate">{author}</p>
            </div>
          </div>

          {/* Controls: Contents, Reader Settings, Quiz CTA */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Table of contents button */}
            {chapters.length > 1 && (
              <div className="relative">
                <button
                  onClick={() => setShowContents(!showContents)}
                  className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
                  title={t.tableOfContents}
                >
                  <List className="w-4 h-4" />
                </button>

                {showContents && (
                  <div className="absolute right-0 mt-2 w-[calc(100vw-2.5rem)] max-w-xs sm:w-64 rounded-xl shadow-xl border border-stone-200 bg-white text-stone-900 dark:bg-stone-800 dark:border-stone-700 dark:text-stone-100 p-2 z-50">
                    <p className="px-3 py-1.5 text-xs font-bold text-stone-500 uppercase tracking-wider">
                      {t.tableOfContents}
                    </p>
                    <div className="space-y-1 max-h-60 overflow-y-auto">
                      {chapters.map((ch, idx) => (
                        <button
                          key={ch.id}
                          onClick={() => {
                            setCurrentChapterIndex(idx);
                            setScrollProgress(0);
                            setShowContents(false);
                            window.scrollTo({ top: 0, behavior: 'auto' });
                          }}
                          className={`w-full text-left px-3 py-2 text-xs rounded-lg transition-colors cursor-pointer ${
                            currentChapterIndex === idx
                              ? 'bg-amber-100 text-amber-950 font-semibold dark:bg-amber-900/50 dark:text-amber-200'
                              : 'hover:bg-stone-100 dark:hover:bg-stone-700'
                          }`}
                        >
                          {ch.title[currentLang] || ch.title.ru}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Settings button */}
            <div className="relative">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
                title={t.readingSettings}
              >
                <Settings2 className="w-4 h-4" />
              </button>

              {/* Settings Dropdown */}
              {showSettings && (
                <div className="absolute right-0 mt-2 w-[calc(100vw-2.5rem)] max-w-xs sm:w-72 rounded-xl shadow-xl border border-stone-200 bg-white text-stone-900 dark:bg-stone-800 dark:border-stone-700 dark:text-stone-100 p-4 space-y-4 z-50 text-xs">
                  {/* Theme selector */}
                  <div className="space-y-1.5">
                    <span className="font-semibold text-stone-500 uppercase tracking-wider text-[10px]">
                      Тема / Theme
                    </span>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        onClick={() => setTheme('light')}
                        className={`py-1.5 px-2 rounded border text-center font-medium ${
                          theme === 'light'
                            ? 'border-amber-600 bg-stone-100 font-bold'
                            : 'border-stone-200'
                        }`}
                      >
                        {t.themeLight}
                      </button>
                      <button
                        onClick={() => setTheme('sepia')}
                        className={`py-1.5 px-2 rounded border text-center font-medium ${
                          theme === 'sepia'
                            ? 'border-amber-600 bg-[#F4ECD8] text-[#382E1E] font-bold'
                            : 'border-stone-200'
                        }`}
                      >
                        {t.themeSepia}
                      </button>
                      <button
                        onClick={() => setTheme('dark')}
                        className={`py-1.5 px-2 rounded border text-center font-medium ${
                          theme === 'dark'
                            ? 'border-amber-500 bg-stone-900 text-stone-100 font-bold'
                            : 'border-stone-200'
                        }`}
                      >
                        {t.themeDark}
                      </button>
                    </div>
                  </div>

                  {/* Font Family */}
                  <div className="space-y-1.5">
                    <span className="font-semibold text-stone-500 uppercase tracking-wider text-[10px]">
                      Шрифт / Font
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setFontFamily('serif')}
                        className={`py-1.5 px-2 rounded border font-serif text-center ${
                          fontFamily === 'serif' ? 'border-amber-600 font-bold bg-amber-50/50' : 'border-stone-200'
                        }`}
                      >
                        {t.fontSerif}
                      </button>
                      <button
                        onClick={() => setFontFamily('sans')}
                        className={`py-1.5 px-2 rounded border font-sans text-center ${
                          fontFamily === 'sans' ? 'border-amber-600 font-bold bg-amber-50/50' : 'border-stone-200'
                        }`}
                      >
                        {t.fontSans}
                      </button>
                    </div>
                  </div>

                  {/* Font Size */}
                  <div className="space-y-1.5">
                    <span className="font-semibold text-stone-500 uppercase tracking-wider text-[10px]">
                      {t.fontSize}
                    </span>
                    <div className="grid grid-cols-4 gap-1 text-center font-semibold">
                      {(['sm', 'md', 'lg', 'xl'] as ReaderFontSize[]).map((sz) => (
                        <button
                          key={sz}
                          onClick={() => setFontSize(sz)}
                          className={`py-1 rounded border ${
                            fontSize === sz ? 'border-amber-600 bg-amber-100/50 font-bold' : 'border-stone-200'
                          }`}
                        >
                          {sz.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => void finishReading()}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-stone-900 text-white hover:bg-stone-800 transition-colors shadow-xs cursor-pointer whitespace-nowrap"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t.finishReading}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Reading Canvas */}
      <main
        ref={articleRef}
        className={`max-w-3xl mx-auto px-5 sm:px-8 py-12 md:py-16 ${
          fontFamily === 'serif' ? 'font-serif-book' : 'font-sans'
        }`}
      >
        {/* Chapter Title & Indicator */}
        <div className="mb-10 pb-6 border-b border-black/10 dark:border-white/10 space-y-2">
          {chapters.length > 1 && (
            <div className="text-xs uppercase tracking-wider font-semibold opacity-60">
              {t.chapter} {currentChapterIndex + 1} / {chapters.length}
            </div>
          )}
          <h1 className="font-display-book text-2xl sm:text-4xl font-bold tracking-tight">
            {chapterTitle}
          </h1>
        </div>

        {/* Chapter Text Content with Natural Editorial Formatting */}
        <article className={`space-y-6 ${fontSizes[fontSize]}`}>
          {chapterContent.split('\n\n').map((paragraph, index) => (
            <p key={index} className="indent-6 sm:indent-8 leading-relaxed">
              {paragraph.trim()}
            </p>
          ))}
        </article>

        {/* Chapter Pagination and Bottom Action */}
        <div className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-black/10 dark:border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-center justify-between sm:justify-start gap-2">
            {currentChapterIndex > 0 ? (
              <button
                onClick={() => {
                  setCurrentChapterIndex(currentChapterIndex - 1);
                  setScrollProgress(0);
                  window.scrollTo({ top: 0, behavior: 'auto' });
                }}
                className="flex items-center justify-center gap-1 flex-1 sm:flex-initial px-3.5 py-2.5 sm:py-2 text-xs font-semibold rounded-lg border border-stone-300 dark:border-stone-700 hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>{t.prevChapter}</span>
              </button>
            ) : <div />}

            {currentChapterIndex < chapters.length - 1 && (
              <button
                onClick={() => {
                  setCurrentChapterIndex(currentChapterIndex + 1);
                  setScrollProgress(0);
                  window.scrollTo({ top: 0, behavior: 'auto' });
                }}
                className="flex items-center justify-center gap-1 flex-1 sm:flex-initial px-3.5 py-2.5 sm:py-2 text-xs font-semibold rounded-lg border border-stone-300 dark:border-stone-700 hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
              >
                <span>{t.nextChapter}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>

          <button
            onClick={() => void finishReading()}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 text-sm font-bold text-white bg-amber-700 hover:bg-amber-800 rounded-xl shadow-md transition-all cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{t.finishReading}</span>
          </button>
        </div>
      </main>
    </div>
  );
};
