import React from 'react';
import { Library, BookOpen, Award, PlusCircle, HelpCircle, Shield } from 'lucide-react';
import { Language } from '../types';

interface MobileBottomNavProps {
  activeTab: 'library' | 'reader' | 'quiz' | 'stats' | 'add' | 'admin';
  onSelectTab: (tab: 'library' | 'reader' | 'quiz' | 'stats' | 'add' | 'admin') => void;
  hasActiveBook: boolean;
  currentLang: Language;
  showAdminTab?: boolean;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  onSelectTab,
  hasActiveBook,
  currentLang,
  showAdminTab,
}) => {
  const labels = {
    kk: {
      library: 'Кітапхана',
      reader: 'Оқу залы',
      quiz: 'Тест',
      stats: 'Жетістіктер',
      add: 'Қосу',
    },
    ru: {
      library: 'Библиотека',
      reader: 'Чтение',
      quiz: 'Тест',
      stats: 'Статистика',
      add: 'Добавить',
    },
    en: {
      library: 'Library',
      reader: 'Reader',
      quiz: 'Quiz',
      stats: 'Stats',
      add: 'Add Book',
    },
  }[currentLang];

  return (
    <nav
      aria-label="Mobile Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200 shadow-lg px-2 pb-[env(safe-area-inset-bottom,0)]"
    >
      <div className={`grid h-15 items-center justify-around max-w-lg mx-auto ${showAdminTab ? 'grid-cols-6' : 'grid-cols-5'}`}>
        {/* 1. Library */}
        <button
          onClick={() => onSelectTab('library')}
          className={`flex flex-col items-center justify-center gap-1 py-1 px-0.5 transition-colors cursor-pointer relative ${
            activeTab === 'library'
              ? 'text-amber-700 font-semibold'
              : 'text-stone-500 hover:text-stone-900'
          }`}
        >
          {activeTab === 'library' && (
            <span className="absolute top-0 w-8 h-0.5 bg-amber-700 rounded-full" />
          )}
          <Library className="w-5 h-5" />
          <span className="text-[10px] tracking-tight truncate max-w-full">
            {labels.library}
          </span>
        </button>

        {/* 2. Reader */}
        <button
          onClick={() => {
            if (hasActiveBook) {
              onSelectTab('reader');
            } else {
              onSelectTab('library');
            }
          }}
          className={`flex flex-col items-center justify-center gap-1 py-1 px-0.5 transition-colors cursor-pointer relative ${
            activeTab === 'reader'
              ? 'text-amber-700 font-semibold'
              : 'text-stone-500 hover:text-stone-900'
          } ${!hasActiveBook ? 'opacity-50' : ''}`}
        >
          {activeTab === 'reader' && (
            <span className="absolute top-0 w-8 h-0.5 bg-amber-700 rounded-full" />
          )}
          <BookOpen className="w-5 h-5" />
          <span className="text-[10px] tracking-tight truncate max-w-full">
            {labels.reader}
          </span>
        </button>

        {/* 3. Quiz */}
        <button
          onClick={() => {
            if (hasActiveBook) {
              onSelectTab('quiz');
            } else {
              onSelectTab('library');
            }
          }}
          className={`flex flex-col items-center justify-center gap-1 py-1 px-0.5 transition-colors cursor-pointer relative ${
            activeTab === 'quiz'
              ? 'text-amber-700 font-semibold'
              : 'text-stone-500 hover:text-stone-900'
          } ${!hasActiveBook ? 'opacity-50' : ''}`}
        >
          {activeTab === 'quiz' && (
            <span className="absolute top-0 w-8 h-0.5 bg-amber-700 rounded-full" />
          )}
          <HelpCircle className="w-5 h-5" />
          <span className="text-[10px] tracking-tight truncate max-w-full">
            {labels.quiz}
          </span>
        </button>

        {/* 4. Stats */}
        <button
          onClick={() => onSelectTab('stats')}
          className={`flex flex-col items-center justify-center gap-1 py-1 px-0.5 transition-colors cursor-pointer relative ${
            activeTab === 'stats'
              ? 'text-amber-700 font-semibold'
              : 'text-stone-500 hover:text-stone-900'
          }`}
        >
          {activeTab === 'stats' && (
            <span className="absolute top-0 w-8 h-0.5 bg-amber-700 rounded-full" />
          )}
          <Award className="w-5 h-5" />
          <span className="text-[10px] tracking-tight truncate max-w-full">
            {labels.stats}
          </span>
        </button>

        {/* 5. Add */}
        <button
          onClick={() => onSelectTab('add')}
          className={`flex flex-col items-center justify-center gap-1 py-1 px-0.5 transition-colors cursor-pointer relative ${
            activeTab === 'add'
              ? 'text-amber-700 font-semibold'
              : 'text-stone-500 hover:text-stone-900'
          }`}
        >
          {activeTab === 'add' && (
            <span className="absolute top-0 w-8 h-0.5 bg-amber-700 rounded-full" />
          )}
          <PlusCircle className="w-5 h-5" />
          <span className="text-[10px] tracking-tight truncate max-w-full">
            {labels.add}
          </span>
        </button>

        {showAdminTab && (
          <button
            onClick={() => onSelectTab('admin')}
            className={`flex flex-col items-center justify-center gap-1 py-1 px-0.5 transition-colors cursor-pointer relative ${
              activeTab === 'admin'
                ? 'text-amber-700 font-semibold'
                : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            {activeTab === 'admin' && (
              <span className="absolute top-0 w-8 h-0.5 bg-amber-700 rounded-full" />
            )}
            <Shield className="w-5 h-5" />
            <span className="text-[10px] tracking-tight truncate max-w-full">
              {currentLang === 'kk' ? 'Әкімші' : currentLang === 'ru' ? 'Админ' : 'Admin'}
            </span>
          </button>
        )}
      </div>
    </nav>
  );
};
