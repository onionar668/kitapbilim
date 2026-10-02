import React from 'react';
import { UserStats, Language, Book } from '../types';
import { translations } from '../utils/translations';
import { Award, BookOpen, Clock, CheckCircle2, RotateCcw, Trash2 } from 'lucide-react';

interface StatsViewProps {
  userStats: UserStats;
  currentLang: Language;
  books: Book[];
  onSelectBookForQuiz: (book: Book) => void;
  onSelectBookForReading: (book: Book) => void;
  onResetStats: () => void;
}

export const StatsView: React.FC<StatsViewProps> = ({
  userStats,
  currentLang,
  books,
  onSelectBookForQuiz,
  onSelectBookForReading,
  onResetStats,
}) => {
  const t = translations[currentLang];
  const attempts = userStats.attempts;

  const totalQuizzes = attempts.length;
  const avgScore = totalQuizzes > 0
    ? Math.round(attempts.reduce((acc, cur) => acc + cur.percentage, 0) / totalQuizzes)
    : 0;
  const bestScore = totalQuizzes > 0
    ? Math.max(...attempts.map((a) => a.percentage))
    : 0;

  const completedBooksCount = userStats.completedBookIds.length;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-6 sm:space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 pb-4 sm:pb-6 border-b border-stone-200">
        <div>
          <h1 className="font-display-book text-2xl sm:text-3xl font-bold text-stone-900">
            {t.statsTitle}
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            {currentLang === 'kk'
              ? 'Оқыған кітаптарыңыз бен есте сақтау сауалнамаларының нәтижелері'
              : currentLang === 'ru'
              ? 'Ваш читательский прогресс и история прохождения проверочных тестов'
              : 'Your reading progress and retention questionnaire history'}
          </p>
        </div>

        {totalQuizzes > 0 && (
          <button
            onClick={() => {
              if (window.confirm(t.confirmReset)) {
                onResetStats();
              }
            }}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-rose-700 hover:text-rose-900 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors cursor-pointer self-start sm:self-auto"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>{t.resetProgress}</span>
          </button>
        )}
      </div>

      {/* KPI Metrics (Single Elevation, unboxed discipline) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4">
        <div className="bg-white p-3.5 sm:p-5 rounded-xl border border-stone-200 space-y-1">
          <span className="text-[11px] sm:text-xs text-stone-500 font-medium block">
            {t.statsBooksRead}
          </span>
          <span className="font-display-book text-2xl sm:text-3xl font-bold text-stone-900 tabular-nums">
            {completedBooksCount}
          </span>
        </div>

        <div className="bg-white p-3.5 sm:p-5 rounded-xl border border-stone-200 space-y-1">
          <span className="text-[11px] sm:text-xs text-stone-500 font-medium block">
            {t.statsQuizzesTaken}
          </span>
          <span className="font-display-book text-2xl sm:text-3xl font-bold text-stone-900 tabular-nums">
            {totalQuizzes}
          </span>
        </div>

        <div className="bg-white p-3.5 sm:p-5 rounded-xl border border-stone-200 space-y-1">
          <span className="text-[11px] sm:text-xs text-stone-500 font-medium block">
            {t.statsAvgScore}
          </span>
          <span className="font-display-book text-2xl sm:text-3xl font-bold text-stone-900 tabular-nums">
            {avgScore}%
          </span>
        </div>

        <div className="bg-white p-3.5 sm:p-5 rounded-xl border border-stone-200 space-y-1">
          <span className="text-[11px] sm:text-xs text-stone-500 font-medium block">
            {t.statsBestScore}
          </span>
          <span className="font-display-book text-2xl sm:text-3xl font-bold text-amber-700 tabular-nums">
            {bestScore}%
          </span>
        </div>
      </div>

      {/* Quiz History List */}
      <div className="space-y-3 sm:space-y-4">
        <h2 className="font-display-book text-lg sm:text-xl font-bold text-stone-900">
          {t.statsHistory}
        </h2>

        {attempts.length === 0 ? (
          <div className="bg-white p-8 sm:p-12 text-center rounded-2xl border border-dashed border-stone-300 space-y-3">
            <BookOpen className="w-10 h-10 text-stone-300 mx-auto" />
            <p className="text-xs sm:text-sm text-stone-600 max-w-sm mx-auto">
              {t.noAttemptsYet}
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-stone-200 divide-y divide-stone-100 overflow-hidden shadow-xs">
            {attempts.slice().reverse().map((att) => {
              const matchedBook = books.find((b) => b.id === att.bookId);

              return (
                <div
                  key={att.id}
                  className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 hover:bg-stone-50 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-[11px] sm:text-xs text-stone-500 font-medium flex-wrap">
                      <span>{att.bookAuthor}</span>
                      <span aria-hidden="true">·</span>
                      <span>{att.date}</span>
                      <span aria-hidden="true">·</span>
                      <span>
                        {Math.floor(att.timeSpentSeconds / 60)} {t.readTimeMin}
                      </span>
                    </div>

                    <h4 className="font-display-book text-sm sm:text-base font-bold text-stone-900">
                      {att.bookTitle}
                    </h4>

                    {att.openAnswer && (
                      <p className="text-xs text-stone-500 italic line-clamp-1">
                        "{att.openAnswer}"
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t border-stone-100 sm:border-0">
                    <div className="text-left sm:text-right">
                      <span className="text-base sm:text-lg font-bold text-stone-900 tabular-nums">
                        {att.percentage}%
                      </span>
                      <span className="text-[11px] sm:text-xs text-stone-500 block">
                        ({att.score}/{att.total} {t.points})
                      </span>
                    </div>

                    {matchedBook && (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onSelectBookForQuiz(matchedBook)}
                          className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 transition-colors cursor-pointer"
                        >
                          {t.retakeQuiz}
                        </button>
                        <button
                          onClick={() => onSelectBookForReading(matchedBook)}
                          className="p-1.5 text-stone-600 hover:text-stone-900 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer"
                          title={t.readAgain}
                        >
                          <BookOpen className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
