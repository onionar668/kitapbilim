import React, { useState, useEffect, useRef } from 'react';
import { Book, Language, ReaderTheme, ReaderFontSize, ReaderFontFamily } from '../types';
import { translations } from '../utils/translations';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Settings2,
  Volume2,
  VolumeX,
  CheckCircle2,
  List,
  Sparkles
} from 'lucide-react';

interface ReaderViewProps {
  book: Book;
  currentLang: Language;
  onBackToLibrary: () => void;
  onFinishAndTakeQuiz: () => void;
}

export const ReaderView: React.FC<ReaderViewProps> = ({
  book,
  currentLang,
  onBackToLibrary,
  onFinishAndTakeQuiz,
}) => {
  const t = translations[currentLang];
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [theme, setTheme] = useState<ReaderTheme>('light');
  const [fontSize, setFontSize] = useState<ReaderFontSize>('lg');
  const [fontFamily, setFontFamily] = useState<ReaderFontFamily>('serif');
  const [showSettings, setShowSettings] = useState(false);
  const [showContents, setShowContents] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const articleRef = useRef<HTMLDivElement>(null);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);

  const chapters = book.chapters;
  const currentChapter = chapters[currentChapterIndex] || chapters[0];

  const bookTitle = book.title[currentLang] || book.title.ru;
  const author = book.author[currentLang] || book.author.ru;
  const chapterTitle = currentChapter?.title[currentLang] || currentChapter?.title.ru || '';
  const chapterContent = currentChapter?.content[currentLang] || currentChapter?.content.ru || '';

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const el = articleRef.current;
      if (!el) return;
      const totalHeight = el.scrollHeight - window.innerHeight;
      if (totalHeight <= 0) {
        setScrollProgress(100);
        return;
      }
      const current = window.scrollY;
      const pct = Math.min(100, Math.max(0, Math.round((current / totalHeight) * 100)));
      setScrollProgress(pct);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentChapterIndex]);

  // Handle Text-To-Speech with Web Speech API
  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [currentChapterIndex]);

  const toggleAudio = () => {
    if (!('speechSynthesis' in window)) {
      alert(t.ttsNotSupported);
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    } else {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(chapterContent);
      
      // Match voice language
      const langMap: Record<Language, string> = {
        kk: 'kk-KZ',
        ru: 'ru-RU',
        en: 'en-US'
      };
      utterance.lang = langMap[currentLang] || 'ru-RU';
      utterance.rate = 0.95;

      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);

      speechRef.current = utterance;
      window.speechSynthesis.speak(utterance);
      setIsPlayingAudio(true);
    }
  };

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

          {/* Controls: Contents, TTS, Reader Settings, Quiz CTA */}
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
                            setShowContents(false);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
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

            {/* Audio Speech Button */}
            <button
              onClick={toggleAudio}
              className={`p-2 rounded-lg transition-colors cursor-pointer ${
                isPlayingAudio
                  ? 'bg-amber-600 text-white animate-pulse'
                  : 'hover:bg-black/5 dark:hover:bg-white/10'
              }`}
              title={isPlayingAudio ? t.textToSpeechStop : t.textToSpeechPlay}
            >
              {isPlayingAudio ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

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

            {/* Direct Quiz Jump Button */}
            <button
              onClick={onFinishAndTakeQuiz}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-stone-900 text-white hover:bg-stone-800 transition-colors shadow-xs cursor-pointer whitespace-nowrap"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">{t.finishReadingAndQuiz}</span>
              <span className="sm:hidden">{t.takeQuizDirectly}</span>
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
                  window.scrollTo({ top: 0, behavior: 'smooth' });
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
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex items-center justify-center gap-1 flex-1 sm:flex-initial px-3.5 py-2.5 sm:py-2 text-xs font-semibold rounded-lg border border-stone-300 dark:border-stone-700 hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
              >
                <span>{t.nextChapter}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Primary Action: Read finished & take quiz */}
          <button
            onClick={onFinishAndTakeQuiz}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 text-sm font-bold text-white bg-amber-700 hover:bg-amber-800 rounded-xl shadow-md transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>{t.finishReadingAndQuiz}</span>
          </button>
        </div>
      </main>
    </div>
  );
};
