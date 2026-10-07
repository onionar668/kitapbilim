import React from 'react';
import { BookOpen, PlusCircle, Globe, LogIn, Shield } from 'lucide-react';
import { Language, User } from '../types';
import { translations } from '../utils/translations';

interface HeaderProps {
  currentLang: Language;
  onSelectLang: (lang: Language) => void;
  activeTab: 'library' | 'reader' | 'certificate' | 'add' | 'admin';
  onSelectTab: (tab: 'library' | 'reader' | 'certificate' | 'add' | 'admin') => void;
  hasActiveBook: boolean;
  currentUser: User | null;
  onOpenAuth: () => void;
  onOpenProfile: () => void;
  showAdminTab?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentLang,
  onSelectLang,
  activeTab,
  onSelectTab,
  hasActiveBook,
  currentUser,
  onOpenAuth,
  onOpenProfile,
  showAdminTab,
}) => {
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
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Zone 1: Brand Wordmark */}
        <button
          onClick={() => onSelectTab('library')}
          className="flex items-center gap-2 text-left text-stone-900 hover:text-amber-800 transition-colors cursor-pointer group shrink-0"
        >
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded bg-stone-900 text-stone-100 flex items-center justify-center font-serif text-xs sm:text-sm font-semibold group-hover:bg-amber-800 transition-colors">
            КБ
          </div>
          <span className="font-display-book text-lg sm:text-xl font-bold tracking-tight text-stone-900">
            {t.brand}
          </span>
        </button>

        {/* Zone 2: Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-stone-600">
          <button
            onClick={() => onSelectTab('library')}
            className={`hover:text-stone-900 transition-colors py-1 cursor-pointer ${
              activeTab === 'library'
                ? 'text-stone-950 font-semibold border-b-2 border-stone-900'
                : ''
            }`}
          >
            {t.navLibrary}
          </button>

          {hasActiveBook && (
            <button
              onClick={() => onSelectTab('reader')}
              className={`hover:text-stone-900 transition-colors py-1 cursor-pointer ${
                activeTab === 'reader'
                  ? 'text-stone-950 font-semibold border-b-2 border-stone-900'
                  : ''
              }`}
            >
              {currentLang === 'kk'
                ? 'Оқу залы'
                : currentLang === 'ru'
                ? 'Чтение'
                : 'Reader'}
            </button>
          )}

          <button
            onClick={() => onSelectTab('add')}
            className={`flex items-center gap-1.5 hover:text-stone-900 transition-colors py-1 cursor-pointer ${
              activeTab === 'add'
                ? 'text-stone-950 font-semibold border-b-2 border-stone-900'
                : ''
            }`}
          >
            <PlusCircle className="w-4 h-4 text-stone-400" />
            <span>{t.navAddBook}</span>
          </button>

          {showAdminTab && (
            <button
              onClick={() => onSelectTab('admin')}
              className={`flex items-center gap-1.5 hover:text-stone-900 transition-colors py-1 cursor-pointer ${
                activeTab === 'admin'
                  ? 'text-stone-950 font-semibold border-b-2 border-stone-900'
                  : ''
              }`}
            >
              <Shield className="w-4 h-4 text-amber-600" />
              <span>{currentLang === 'kk' ? 'Әкімші' : currentLang === 'ru' ? 'Админ' : 'Admin'}</span>
            </button>
          )}
        </nav>

        {/* Zone 3: User Auth Button & Language Switcher */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* User Account Button */}
          {currentUser ? (
            <button
              onClick={onOpenProfile}
              className="flex items-center gap-1.5 sm:gap-2 p-1 sm:pl-1.5 sm:pr-2.5 rounded-full bg-stone-100 hover:bg-stone-200/80 border border-stone-200 transition-colors cursor-pointer group"
              title={t.authProfile}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold bg-amber-700 text-white shadow-xs ${
                  currentUser.avatarColor
                }`}
              >
                {getInitials(currentUser.name)}
              </div>
              <span className="hidden sm:inline text-xs font-semibold text-stone-800 max-w-[90px] sm:max-w-[120px] truncate">
                {currentUser.name}
              </span>
            </button>
          ) : (
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium transition-colors cursor-pointer shadow-xs"
            >
              <LogIn className="w-3.5 h-3.5 text-amber-300" />
              <span className="hidden sm:inline">{t.signInPrompt}</span>
              <span className="sm:hidden text-[11px] font-semibold">{t.authLoginBtn}</span>
            </button>
          )}

          {/* Language Switcher (Segmented buttons) */}
          <div className="flex items-center gap-0.5 p-0.5 sm:p-1 bg-stone-100 rounded-lg text-xs">
            <Globe className="w-3.5 h-3.5 text-stone-400 ml-1 hidden lg:inline" />
            <button
              onClick={() => onSelectLang('kk')}
              aria-label="Қазақ тілі"
              className={`px-1.5 sm:px-2 py-1 text-[11px] sm:text-xs font-medium rounded transition-colors whitespace-nowrap cursor-pointer ${
                currentLang === 'kk'
                  ? 'bg-white text-stone-900 shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Қаз
            </button>
            <button
              onClick={() => onSelectLang('ru')}
              aria-label="Русский язык"
              className={`px-1.5 sm:px-2 py-1 text-[11px] sm:text-xs font-medium rounded transition-colors whitespace-nowrap cursor-pointer ${
                currentLang === 'ru'
                  ? 'bg-white text-stone-900 shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Рус
            </button>
            <button
              onClick={() => onSelectLang('en')}
              aria-label="English language"
              className={`px-1.5 sm:px-2 py-1 text-[11px] sm:text-xs font-medium rounded transition-colors whitespace-nowrap cursor-pointer ${
                currentLang === 'en'
                  ? 'bg-white text-stone-900 shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Eng
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
