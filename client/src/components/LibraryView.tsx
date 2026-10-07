import React, { useState, useMemo } from 'react';
import { Book, Language, User, UserStats } from '../types';
import { translations } from '../utils/translations';
import { formatDuration } from '../utils/formatDuration';
import { Search, BookOpen, Clock, Sparkles, User as UserIcon, Trash2, Plus, LogIn, Lock } from 'lucide-react';

interface LibraryViewProps {
  books: Book[];
  userStats: UserStats;
  currentLang: Language;
  currentUser: User | null;
  onSelectBookForReading: (book: Book) => void;
  onOpenAuth: () => void;
  onNavigateToAddBook: () => void;
  onDeleteBook: (bookId: string) => void;
}

export const LibraryView: React.FC<LibraryViewProps> = ({
  books,
  userStats,
  currentLang,
  currentUser,
  onSelectBookForReading,
  onOpenAuth,
  onNavigateToAddBook,
  onDeleteBook,
}) => {
  const t = translations[currentLang];
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'kazakh' | 'world' | 'myBooks'>('all');

  // Kazakh classics IDs or tags
  const kazakhBookIds = ['reading-nation', 'abai-words', 'abai-joly', 'kokserik', 'shuganyn-belgisi', 'botagoz', 'alpamys-batyr'];

  const readingNationBook = useMemo(() => {
    return books.find((b) => b.id === 'reading-nation');
  }, [books]);

  const myBooksCount = useMemo(() => {
    if (!currentUser) return 0;
    return books.filter((b) => String(b.createdByUserId) === String(currentUser.id)).length;
  }, [books, currentUser]);

  // Extract unique genres across books for current language
  const availableGenres = useMemo(() => {
    const set = new Set<string>();
    books.forEach((b) => {
      const g = b.genre[currentLang] || b.genre.ru;
      if (g) {
        g.split(',').forEach((part) => set.add(part.trim()));
      }
    });
    return Array.from(set);
  }, [books, currentLang]);

  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const title = (book.title[currentLang] || book.title.ru).toLowerCase();
      const author = (book.author[currentLang] || book.author.ru).toLowerCase();
      const synopsis = (book.synopsis[currentLang] || book.synopsis.ru).toLowerCase();
      const q = searchQuery.toLowerCase().trim();

      const matchesSearch = !q || title.includes(q) || author.includes(q) || synopsis.includes(q);

      const genreStr = (book.genre[currentLang] || book.genre.ru).toLowerCase();
      const matchesGenre = selectedGenre === 'all' || genreStr.includes(selectedGenre.toLowerCase());

      const matchesLevel = selectedLevel === 'all' || book.level === selectedLevel;

      let matchesCategory = true;
      const isKazakhBook = kazakhBookIds.includes(book.id) || 
        (book.tags[currentLang] || []).some(tag => tag.toLowerCase().includes('қазақ') || tag.toLowerCase().includes('казах'));
      
      if (selectedCategory === 'kazakh') {
        matchesCategory = isKazakhBook;
      } else if (selectedCategory === 'world') {
        matchesCategory = !isKazakhBook && !book.createdByUserId;
      } else if (selectedCategory === 'myBooks') {
        if (!currentUser) {
          matchesCategory = false;
        } else {
          matchesCategory = String(book.createdByUserId) === String(currentUser.id);
        }
      }

      return matchesSearch && matchesGenre && matchesLevel && matchesCategory;
    });
  }, [books, currentLang, searchQuery, selectedGenre, selectedLevel, selectedCategory, currentUser]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Editorial Hero Section */}
      <section className="relative overflow-hidden rounded-2xl bg-stone-900 text-stone-100 p-8 sm:p-12 border border-stone-800 shadow-sm">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-xs uppercase tracking-wider text-amber-400 font-semibold">
              {currentLang === 'kk'
                ? 'Әдебиет және интеллектуалдық даму'
                : currentLang === 'ru'
                ? 'Литература и глубокое осмысление'
                : 'Literature & Deep Retention'}
            </p>
          </div>

          <h1 className="font-display-book text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            {t.heroTitle}
          </h1>
          <p className="text-stone-300 text-base sm:text-lg leading-relaxed font-normal">
            {t.heroSubtitle}
          </p>
          
          {/* Quick quote banner */}
          <div className="pt-2 text-stone-400 text-xs sm:text-sm italic border-t border-stone-800">
            {currentLang === 'kk'
              ? '«Артық ғылым кітапта, ерінбей оқып көруге» — Абай Құнанбайұлы'
              : currentLang === 'ru'
              ? '«Книга — это зеркало; и если в него смотрится обезьяна, из него не может выглядеть апостол» — Георг Лихтенберг'
              : '“A reader lives a thousand lives before he dies. The man who never reads lives only one.” — George R.R. Martin'}
          </div>

          {/* President Reading Nation Highlight Banner inside Hero */}
          {readingNationBook && (
            <div className="mt-4 p-4 sm:p-5 rounded-xl bg-gradient-to-r from-amber-950/80 to-stone-900/95 border border-amber-500/40 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 shadow-md">
              <div className="flex items-start sm:items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center shrink-0 border border-amber-500/30">
                  <Sparkles className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400">
                      {currentLang === 'kk' ? 'Мемлекеттік бастама' : currentLang === 'ru' ? 'Президентское послание' : 'State Initiative'}
                    </span>
                    <span className="text-[10px] text-stone-500 hidden sm:inline">·</span>
                    <span className="text-[11px] text-stone-300 font-medium">
                      {currentLang === 'kk' ? 'Қасым-Жомарт Тоқаев' : currentLang === 'ru' ? 'Касым-Жомарт Токаев' : 'Kassym-Jomart Tokayev'}
                    </span>
                  </div>
                  <h3 className="font-display-book text-sm sm:text-base font-bold text-white mt-0.5">
                    {currentLang === 'kk'
                      ? '«Кітап оқитын ұлт — озатын ұлт»'
                      : currentLang === 'ru'
                      ? '«Читающая нация — успешная нация»'
                      : '“A Reading Nation is an Advanced Nation”'}
                  </h3>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0 pt-2 sm:pt-0 border-t border-stone-800/80 sm:border-0">
                <button
                  onClick={() => onSelectBookForReading(readingNationBook)}
                  className="px-3.5 py-2 sm:py-1.5 text-xs font-semibold bg-amber-500 hover:bg-amber-400 text-stone-950 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>{currentLang === 'kk' ? 'Үндеуді оқу' : currentLang === 'ru' ? 'Читать послание' : 'Read Address'}</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Subtle decorative background glow */}
        <div
          aria-hidden="true"
          className="absolute -right-20 -bottom-20 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none"
        />
      </section>

      {/* Primary Category Selector (All / Kazakh Writers / World Classics / My Books) */}
      <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200 pb-3 sm:pb-4">
        <div className="w-full sm:w-auto overflow-x-auto no-scrollbar flex items-center gap-2 py-1 -mx-4 px-4 sm:mx-0 sm:px-0">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer shrink-0 ${
              selectedCategory === 'all'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            {t.categoryAll} ({books.length})
          </button>
          <button
            onClick={() => setSelectedCategory('kazakh')}
            className={`px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 shrink-0 ${
              selectedCategory === 'kazakh'
                ? 'bg-amber-800 text-amber-50 shadow-xs'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            <span>🇰🇿 {t.categoryKazakh}</span>
          </button>
          <button
            onClick={() => setSelectedCategory('world')}
            className={`px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer shrink-0 ${
              selectedCategory === 'world'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            <span>🌍 {t.categoryWorld}</span>
          </button>
          <button
            onClick={() => setSelectedCategory('myBooks')}
            className={`px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 shrink-0 ${
              selectedCategory === 'myBooks'
                ? 'bg-amber-900 text-white shadow-xs'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            <span>📚 {t.categoryMyBooks}</span>
            {currentUser && myBooksCount > 0 && (
              <span className="text-[10px] px-1.5 py-0.5 bg-amber-700 text-white rounded-full font-bold">
                {myBooksCount}
              </span>
            )}
          </button>
        </div>

        <div className="text-xs text-stone-500 font-medium hidden sm:block shrink-0">
          {filteredBooks.length} {currentLang === 'kk' ? 'кітап табылды' : currentLang === 'ru' ? 'книг доступно' : 'books available'}
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="space-y-3 sm:space-y-4">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          {/* Search input */}
          <div className="relative flex-1 max-w-full md:max-w-md">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-stone-200 rounded-lg text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-stone-900 transition-colors"
            />
          </div>

          {/* Level Segmented Filter */}
          <div className="w-full md:w-auto overflow-x-auto no-scrollbar flex items-center gap-1 p-1 bg-stone-100 rounded-lg text-xs -mx-4 px-4 sm:mx-0 sm:px-1">
            <button
              onClick={() => setSelectedLevel('all')}
              className={`px-2.5 sm:px-3 py-1.5 font-medium rounded transition-colors whitespace-nowrap cursor-pointer shrink-0 ${
                selectedLevel === 'all'
                  ? 'bg-white text-stone-900 shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {t.allLevels}
            </button>
            <button
              onClick={() => setSelectedLevel('beginner')}
              className={`px-2.5 sm:px-3 py-1.5 font-medium rounded transition-colors whitespace-nowrap cursor-pointer shrink-0 ${
                selectedLevel === 'beginner'
                  ? 'bg-white text-stone-900 shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {t.levelBeginner}
            </button>
            <button
              onClick={() => setSelectedLevel('intermediate')}
              className={`px-2.5 sm:px-3 py-1.5 font-medium rounded transition-colors whitespace-nowrap cursor-pointer shrink-0 ${
                selectedLevel === 'intermediate'
                  ? 'bg-white text-stone-900 shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {t.levelIntermediate}
            </button>
            <button
              onClick={() => setSelectedLevel('advanced')}
              className={`px-2.5 sm:px-3 py-1.5 font-medium rounded transition-colors whitespace-nowrap cursor-pointer shrink-0 ${
                selectedLevel === 'advanced'
                  ? 'bg-white text-stone-900 shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {t.levelAdvanced}
            </button>
          </div>
        </div>

        {/* Genre filter strip (unboxed interactive buttons) */}
        {availableGenres.length > 0 && (
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 text-xs text-stone-600 -mx-4 px-4 sm:mx-0 sm:px-0">
            <span className="font-semibold text-stone-800 shrink-0">{t.allGenres}:</span>
            <button
              onClick={() => setSelectedGenre('all')}
              className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap cursor-pointer shrink-0 ${
                selectedGenre === 'all'
                  ? 'bg-stone-900 text-white font-medium'
                  : 'hover:bg-stone-100 text-stone-600'
              }`}
            >
              {t.allGenres}
            </button>
            {availableGenres.map((g) => (
              <button
                key={g}
                onClick={() => setSelectedGenre(g)}
                className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap cursor-pointer shrink-0 ${
                  selectedGenre === g
                    ? 'bg-stone-900 text-white font-medium'
                    : 'hover:bg-stone-100 text-stone-600'
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        )}
      </section>

      {/* Book Grid: Responsive from 1 col on mobile, 2 on tablet, 3 on laptop, 4 on desktop */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {filteredBooks.map((book) => {
          const title = book.title[currentLang] || book.title.ru;
          const author = book.author[currentLang] || book.author.ru;
          const genre = book.genre[currentLang] || book.genre.ru;
          const synopsis = book.synopsis[currentLang] || book.synopsis.ru;

          const isRead = userStats.completedBookIds.includes(book.id);

          return (
            <article
              key={book.id}
              className="group flex flex-col bg-white rounded-xl border border-stone-200 overflow-hidden hover:border-stone-400 hover:shadow-md transition-all duration-200"
            >
              {/* Cover Art Slot (3:4 aspect ratio with zero broken image fallback) */}
              <div className="relative aspect-[3/4] bg-stone-100 overflow-hidden">
                <img
                  src={book.coverImage}
                  alt={title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                  onError={(e) => {
                    // Fallback to stylized cover card if asset fails
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                
                {/* Fallback container under image */}
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-stone-800 to-stone-950 p-6 flex flex-col justify-end text-white">
                  <span className="text-xs uppercase tracking-wider text-amber-300 font-semibold mb-1">
                    {author}
                  </span>
                  <h3 className="font-display-book text-xl font-bold leading-snug">
                    {title}
                  </h3>
                </div>

                {/* Top badges: Creator or User ownership */}
                {book.id === 'reading-nation' ? (
                  <div className="absolute top-3 left-3 bg-amber-950/95 backdrop-blur text-amber-300 text-[10px] font-bold px-2 py-1 rounded shadow-xs flex items-center gap-1.5 border border-amber-500/80">
                    <Sparkles className="w-3 h-3 text-amber-300" />
                    <span>
                      {currentLang === 'kk'
                        ? 'Мемлекеттік бастама'
                        : currentLang === 'ru'
                        ? 'Послание Президента'
                        : 'Presidential Initiative'}
                    </span>
                  </div>
                ) : book.createdByUserName ? (
                  <div className="absolute top-3 left-3 bg-stone-900/90 backdrop-blur text-stone-100 text-[10px] font-medium px-2 py-1 rounded shadow-xs flex items-center gap-1.5 border border-stone-700/60 max-w-[70%] truncate">
                    <UserIcon className="w-3 h-3 text-amber-400 shrink-0" />
                    <span className="truncate">
                      {currentUser && book.createdByUserId === currentUser.id
                        ? t.authAddedByYou
                        : book.createdByUserName}
                    </span>
                  </div>
                ) : null}

                {/* Owner Delete Button */}
                {currentUser &&
                  (book.createdByUserId === currentUser.id || currentUser.role === 'admin') &&
                  (!book.isCatalog || currentUser.role === 'admin') && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (window.confirm(t.authConfirmDeleteBook)) {
                        onDeleteBook(book.id);
                      }
                    }}
                    className="absolute bottom-3 right-3 p-1.5 rounded-lg bg-stone-900/90 hover:bg-rose-900 text-stone-300 hover:text-white transition-colors cursor-pointer shadow-xs"
                    title={t.authDeleteBook}
                    aria-label={t.authDeleteBook}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}

              </div>

              {/* Card Body with Zero-Pill Unboxed Metadata */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  {/* Clean unboxed text metadata */}
                  <div className="flex items-center gap-2 text-xs text-stone-500 font-medium">
                    <span>{author}</span>
                    <span aria-hidden="true">·</span>
                    <span>{book.year}</span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatDuration(book.estimatedReadMinutes * 60, currentLang)}
                    </span>
                  </div>

                  <h3 className="font-display-book text-lg font-bold text-stone-900 leading-snug group-hover:text-amber-900 transition-colors">
                    {title}
                  </h3>

                  <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">
                    {synopsis}
                  </p>
                </div>

                {/* Genre text and Action buttons */}
                <div className="space-y-3 pt-2 border-t border-stone-100">
                  <div className="text-xs text-stone-500 font-medium">
                    <span className="text-stone-400 font-normal">{currentLang === 'kk' ? 'Бағыты: ' : currentLang === 'ru' ? 'Жанр: ' : 'Genre: '}</span>
                    {genre}
                  </div>

                  <div className="grid grid-cols-1 gap-2">
                    <button
                      onClick={() => onSelectBookForReading(book)}
                      className="w-full flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors cursor-pointer"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>{isRead ? t.continueReading : t.startReading}</span>
                    </button>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </section>

      {/* Empty State */}
      {filteredBooks.length === 0 && (
        <div className="py-16 text-center space-y-4 max-w-md mx-auto">
          {selectedCategory === 'myBooks' && !currentUser ? (
            <div className="bg-white rounded-2xl border border-stone-200 p-8 text-center space-y-4 shadow-xs">
              <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-800 flex items-center justify-center mx-auto">
                <Lock className="w-6 h-6 text-amber-800" />
              </div>
              <div className="space-y-1">
                <h3 className="font-display-book text-xl font-bold text-stone-900">
                  {t.authRequiredToAddTitle}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {t.authLoginDesc}
                </p>
              </div>
              <button
                onClick={onOpenAuth}
                className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-xl cursor-pointer shadow-xs inline-flex items-center gap-1.5"
              >
                <LogIn className="w-3.5 h-3.5 text-amber-300" />
                <span>{t.signInPrompt}</span>
              </button>
            </div>
          ) : selectedCategory === 'myBooks' && currentUser && myBooksCount === 0 ? (
            <div className="bg-white rounded-2xl border border-stone-200 p-8 text-center space-y-4 shadow-xs">
              <BookOpen className="w-12 h-12 text-stone-300 mx-auto" />
              <div className="space-y-1">
                <h3 className="font-display-book text-xl font-bold text-stone-900">
                  {currentLang === 'kk' ? 'Сізде әзірге қосқан кітаптар жоқ' : currentLang === 'ru' ? 'Вы пока не добавили ни одной книги' : 'No custom books yet'}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {t.addCustomBookDesc}
                </p>
              </div>
              <button
                onClick={onNavigateToAddBook}
                className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-xl cursor-pointer shadow-xs inline-flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4 text-amber-300" />
                <span>{t.navAddBook}</span>
              </button>
            </div>
          ) : (
            <>
              <BookOpen className="w-12 h-12 text-stone-300 mx-auto" />
              <p className="text-base font-medium text-stone-700">
                {currentLang === 'kk'
                  ? 'Сұранысыңызға сай кітап табылмады'
                  : currentLang === 'ru'
                  ? 'Книги по вашему запросу не найдены'
                  : 'No books matched your criteria'}
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedGenre('all');
                  setSelectedLevel('all');
                  setSelectedCategory('all');
                }}
                className="text-xs font-semibold text-amber-800 hover:underline cursor-pointer"
              >
                {currentLang === 'kk' ? 'Сүзгілерді тазарту' : currentLang === 'ru' ? 'Сбросить фильтры' : 'Reset filters'}
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};
