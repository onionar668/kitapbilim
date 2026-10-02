import React from 'react';
import { User, Book, Language, UserStats } from '../types';
import { translations } from '../utils/translations';
import { X, LogOut, BookOpen, Trash2, Plus, Award, UserCheck, Calendar } from 'lucide-react';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  currentLang: Language;
  userStats: UserStats;
  myBooks: Book[];
  onLogout: () => void;
  onOpenBook: (book: Book) => void;
  onDeleteBook: (bookId: string) => void;
  onNavigateToAddBook: () => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  user,
  currentLang,
  userStats,
  myBooks,
  onLogout,
  onOpenBook,
  onDeleteBook,
  onNavigateToAddBook,
}) => {
  if (!isOpen) return null;

  const t = translations[currentLang];

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs animate-in fade-in duration-150"
    >
      <div
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-stone-900 text-stone-100 p-6 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg bg-amber-700 text-white shadow-xs ${
                user.avatarColor 
              }`}
            >
              {getInitials(user.name)}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="font-display-book text-xl font-bold text-white">
                  {user.name}
                </h2>
                <span className="inline-flex items-center gap-0.5 text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800/80 px-1.5 py-0.5 rounded font-medium">
                  <UserCheck className="w-2.5 h-2.5" />
                  {currentLang === 'kk' ? 'Авторизацияланған' : currentLang === 'ru' ? 'Авторизован' : 'Verified'}
                </span>
              </div>
              <p className="text-xs text-stone-300">{user.email}</p>
              <div className="flex items-center gap-1 text-[11px] text-stone-400 mt-0.5">
                <Calendar className="w-3 h-3 text-stone-400" />
                <span>
                  {currentLang === 'kk' ? 'Тіркелген күні' : currentLang === 'ru' ? 'В клубе с' : 'Member since'}: {user.joinedDate}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
            aria-label="Жабу / Закрыть / Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-3 border-b border-stone-100 bg-stone-50/80 px-6 py-3.5 text-center">
          <div>
            <div className="text-xl font-bold font-display-book text-stone-900">
              {userStats.completedBookIds.length}
            </div>
            <div className="text-[11px] text-stone-500 font-medium">
              {t.statsBooksRead}
            </div>
          </div>
          <div className="border-x border-stone-200">
            <div className="text-xl font-bold font-display-book text-stone-900">
              {userStats.attempts.length}
            </div>
            <div className="text-[11px] text-stone-500 font-medium">
              {t.statsQuizzesTaken}
            </div>
          </div>
          <div>
            <div className="text-xl font-bold font-display-book text-amber-700">
              {myBooks.length}
            </div>
            <div className="text-[11px] text-stone-500 font-medium">
              {currentLang === 'kk' ? 'Қосқан кітаптары' : currentLang === 'ru' ? 'Добавлено книг' : 'Created Books'}
            </div>
          </div>
        </div>

        {/* Content: My Added Books */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-stone-900 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-amber-800" />
              <span>{t.authMyBooks}</span>
              <span className="text-xs text-stone-500 font-normal">({myBooks.length})</span>
            </h3>

            <button
              onClick={() => {
                onClose();
                onNavigateToAddBook();
              }}
              className="inline-flex items-center gap-1 text-xs font-semibold text-amber-800 hover:text-amber-900 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{t.navAddBook}</span>
            </button>
          </div>

          {myBooks.length === 0 ? (
            <div className="text-center py-8 px-4 rounded-xl border border-dashed border-stone-200 bg-stone-50/50 space-y-2">
              <BookOpen className="w-8 h-8 text-stone-300 mx-auto" />
              <p className="text-xs text-stone-600 font-medium">
                {currentLang === 'kk'
                  ? 'Сіз әлі кітап немесе мәтін қосқан жоқсыз'
                  : currentLang === 'ru'
                  ? 'Вы пока не добавили ни одной книги'
                  : 'You have not added any custom books yet'}
              </p>
              <button
                onClick={() => {
                  onClose();
                  onNavigateToAddBook();
                }}
                className="mt-2 text-xs font-semibold px-3 py-1.5 bg-stone-900 text-white rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
              >
                {t.navAddBook}
              </button>
            </div>
          ) : (
            <div className="space-y-2.5">
              {myBooks.map((b) => (
                <div
                  key={b.id}
                  className="flex items-center justify-between p-3 rounded-xl border border-stone-200 bg-white hover:border-stone-300 transition-colors"
                >
                  <div className="min-w-0 pr-3">
                    <h4 className="text-xs font-bold text-stone-900 truncate">
                      {b.title[currentLang] || b.title.ru || b.title.kk}
                    </h4>
                    <p className="text-[11px] text-stone-500 truncate">
                      {b.author[currentLang] || b.author.ru} · {b.estimatedReadMinutes} {t.readTimeMin}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => {
                        onClose();
                        onOpenBook(b);
                      }}
                      className="px-2.5 py-1 text-xs font-semibold bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg transition-colors cursor-pointer"
                    >
                      {currentLang === 'kk' ? 'Оқу' : currentLang === 'ru' ? 'Читать' : 'Read'}
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm(t.authConfirmDeleteBook)) {
                          onDeleteBook(b.id);
                        }
                      }}
                      className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                      title={t.authDeleteBook}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer with Logout */}
        <div className="border-t border-stone-200 bg-stone-50 px-6 py-3 flex items-center justify-between">
          <span className="text-xs text-stone-500">KitapBilim Auth</span>
          <button
            onClick={() => {
              onLogout();
              onClose();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-700 hover:text-rose-800 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>{t.authLogoutBtn}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
