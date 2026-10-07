import React, { useState } from 'react';
import { Book, Language, User } from '../types';
import { translations } from '../utils/translations';
import { Plus, BookOpen, Sparkles, UserCheck, LogIn, Lock, Check } from 'lucide-react';

interface AddCustomBookViewProps {
  currentLang: Language;
  currentUser: User | null;
  onRequestAuth: () => void;
  onAddBook: (newBook: Book) => void;
  onCancel: () => void;
}

export const AddCustomBookView: React.FC<AddCustomBookViewProps> = ({
  currentLang,
  currentUser,
  onRequestAuth,
  onAddBook,
  onCancel,
}) => {
  const t = translations[currentLang];
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [genre, setGenre] = useState(
    currentLang === 'kk' ? 'Әңгіме' : currentLang === 'ru' ? 'Рассказ' : 'Short Story'
  );
  const [level, setLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('intermediate');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      onRequestAuth();
      return;
    }
    if (!title.trim() || !content.trim()) return;

    const customBook: Book = {
      id: 'custom_' + Date.now(),
      title: { kk: title, ru: title, en: title },
      author: { kk: author || currentUser.name, ru: author || currentUser.name, en: author || currentUser.name },
      year: new Date().getFullYear(),
      genre: { kk: genre, ru: genre, en: genre },
      level,
      coverImage: '/src/assets/images/book_abai_words_1790149372465.jpg',
      synopsis: {
        kk: content.slice(0, 180) + '...',
        ru: content.slice(0, 180) + '...',
        en: content.slice(0, 180) + '...',
      },
      estimatedReadMinutes: Math.max(1, Math.round(content.split(/\s+/).length / 150)),
      tags: { kk: [genre, 'Пайдаланушы кітабы'], ru: [genre, 'Пользовательская'], en: [genre, 'Community'] },
      createdByUserId: currentUser.id,
      createdByUserName: currentUser.name,
      createdAt: new Date().toISOString(),
      chapters: [
        {
          id: 'custom_c1',
          title: { kk: title, ru: title, en: title },
          content: { kk: content, ru: content, en: content },
        },
      ],
      quizzes: {
        questions: [],
        openQuestion: {
          id: 'custom_open',
          prompt: { kk: '', ru: '', en: '' },
          keyThemes: { kk: [], ru: [], en: [] },
          sampleAnswer: { kk: '', ru: '', en: '' },
        },
      },
    };

    onAddBook(customBook);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6 sm:space-y-8">
      {/* Title & Description */}
      <div className="space-y-1.5 sm:space-y-2">
        <h1 className="font-display-book text-2xl sm:text-3xl font-bold text-stone-900">
          {t.addCustomBookTitle}
        </h1>
        <p className="text-xs sm:text-sm text-stone-500">
          {t.addCustomBookDesc}
        </p>
      </div>

      {/* Auth state notification */}
      {!currentUser ? (
        <div className="bg-amber-50/90 border border-amber-200/90 rounded-2xl p-5 sm:p-8 text-center space-y-4 shadow-sm">
          <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center mx-auto">
            <Lock className="w-6 h-6 text-amber-800" />
          </div>
          <div className="max-w-md mx-auto space-y-1.5">
            <h3 className="font-display-book text-lg sm:text-xl font-bold text-amber-950">
              {t.authRequiredToAddTitle}
            </h3>
            <p className="text-xs text-amber-800 leading-relaxed">
              {t.authRequiredToAddDesc}
            </p>
          </div>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3">
            <button
              onClick={onRequestAuth}
              className="w-full sm:w-auto px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white font-medium text-xs rounded-xl transition-all cursor-pointer shadow-xs flex items-center justify-center gap-2"
            >
              <LogIn className="w-4 h-4 text-amber-300" />
              <span>{t.signInPrompt}</span>
            </button>
            <button
              onClick={onCancel}
              className="w-full sm:w-auto px-4 py-2 text-stone-600 hover:text-stone-900 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
            >
              {t.backToLibrary}
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-xl px-4 sm:px-5 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-xs text-emerald-900 flex-wrap">
            <UserCheck className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>
              {currentLang === 'kk' ? 'Автор ретінде қосу:' : currentLang === 'ru' ? 'Добавление от читателя:' : 'Adding as:'}{' '}
              <strong className="font-semibold text-emerald-950">{currentUser.name}</strong> ({currentUser.email})
            </span>
          </div>
          <span className="text-[11px] font-semibold text-emerald-700 bg-white px-2 py-0.5 rounded border border-emerald-200 self-start sm:self-auto shrink-0">
            {currentLang === 'kk' ? 'Авторизация белсенді' : currentLang === 'ru' ? 'Авторизован' : 'Logged In'}
          </span>
        </div>
      )}

      {/* Form (only active when logged in or clicking submit requests auth) */}
      <form
        onSubmit={handleSubmit}
        className={`bg-white rounded-2xl border border-stone-200 p-5 sm:p-8 space-y-5 sm:space-y-6 shadow-xs ${
          !currentUser ? 'opacity-70 pointer-events-none' : ''
        }`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-stone-700">
              {t.bookTitleLabel} *
            </label>
            <input
              type="text"
              required
              disabled={!currentUser}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={currentLang === 'kk' ? 'Мысалы: «Шұғаның белгісі»' : currentLang === 'ru' ? 'Например: «Судьба человека»' : 'E.g., "The Gift of the Magi"'}
              className="w-full px-3.5 py-2.5 text-sm bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-stone-900 focus:bg-white"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-stone-700">
              {t.bookAuthorLabel}
            </label>
            <input
              type="text"
              disabled={!currentUser}
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder={currentUser ? currentUser.name : (currentLang === 'kk' ? 'Бейімбет Майлин' : currentLang === 'ru' ? 'Михаил Шолохов' : 'O. Henry')}
              className="w-full px-3.5 py-2.5 text-sm bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-stone-900 focus:bg-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-stone-700">
              {currentLang === 'kk' ? 'Жанры' : currentLang === 'ru' ? 'Жанр' : 'Genre'}
            </label>
            <input
              type="text"
              disabled={!currentUser}
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-stone-900 focus:bg-white"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-stone-700">
              {currentLang === 'kk' ? 'Деңгейі' : currentLang === 'ru' ? 'Сложность' : 'Level'}
            </label>
            <select
              disabled={!currentUser}
              value={level}
              onChange={(e) => setLevel(e.target.value as any)}
              className="w-full px-3.5 py-2.5 text-sm bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-stone-900 focus:bg-white"
            >
              <option value="beginner">{t.levelBeginner}</option>
              <option value="intermediate">{t.levelIntermediate}</option>
              <option value="advanced">{t.levelAdvanced}</option>
            </select>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-stone-700">
            {t.bookContentLabel} *
          </label>
          <textarea
            required
            disabled={!currentUser}
            rows={10}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={
              currentLang === 'kk'
                ? 'Кітаптың немесе әңгіменің толық мәтінін осында қойыңыз (бірнеше абзац)...'
                : currentLang === 'ru'
                ? 'Вставьте текст книги, главы или рассказа сюда (несколько абзацев)...'
                : 'Paste the book or chapter text here (several paragraphs)...'
            }
            className="w-full p-4 text-sm bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-stone-900 focus:bg-white leading-relaxed"
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-100">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900 rounded-lg transition-colors cursor-pointer"
          >
            {currentLang === 'kk' ? 'Бас тарту' : currentLang === 'ru' ? 'Отмена' : 'Cancel'}
          </button>

          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2.5 text-xs font-bold text-white bg-stone-900 hover:bg-stone-800 rounded-xl transition-all cursor-pointer shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>{t.saveBookBtn}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
