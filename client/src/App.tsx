/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { api, setAuthToken } from './api/client';
import { Book, Language, QuizAttempt, User, UserStats } from './types';
import { initialBooks } from './data/booksData';
import { translations } from './utils/translations';
import {
  getStoredStats,
  saveStoredStats,
  getStoredCustomBooks,
  saveStoredCustomBooks,
  deleteStoredCustomBook,
} from './utils/storage';
import { Header } from './components/Header';
import { LibraryView } from './components/LibraryView';
import { ReaderView } from './components/ReaderView';
import { QuizView } from './components/QuizView';
import { StatsView } from './components/StatsView';
import { AddCustomBookView } from './components/AddCustomBookView';
import { AuthModal } from './components/AuthModal';
import { UserProfileModal } from './components/UserProfileModal';
import { MobileBottomNav } from './components/MobileBottomNav';

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>('kk');
  const [activeTab, setActiveTab] = useState<'library' | 'reader' | 'quiz' | 'stats' | 'add'>('library');
  const [selectedBook, setSelectedBook] = useState<Book | null>(initialBooks[0]);
  const [customBooks, setCustomBooks] = useState<Book[]>([]);
  const [userStats, setUserStats] = useState<UserStats>(getStoredStats());
  
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [authReasonMessage, setAuthReasonMessage] = useState<string | undefined>();

  useEffect(() => {
    const loadedBooks = getStoredCustomBooks();
    setCustomBooks(loadedBooks);

    const token = localStorage.getItem('auth_token');
    if (token) {
      setAuthToken(token);

      api
        .get('/me')
        .then((response) => {
          setCurrentUser(response.data);
          localStorage.setItem('user', JSON.stringify(response.data));
        })
        .catch(() => {
          localStorage.removeItem('auth_token');
          localStorage.removeItem('user');
          setAuthToken(null);
          setCurrentUser(null);
        });
    }
  }, []);

  const allBooks = [...customBooks, ...initialBooks];
  const t = translations[currentLang];

  const myBooks = currentUser
    ? customBooks.filter((b) => String(b.createdByUserId) === String(currentUser.id))
    : [];

  const handleSelectBookForReading = (book: Book) => {
    setSelectedBook(book);
    setActiveTab('reader');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectBookForQuiz = (book: Book) => {
    setSelectedBook(book);
    setActiveTab('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFinishReadingAndTakeQuiz = () => {
    if (!selectedBook) return;

    setUserStats((prev) => {
      const alreadyCompleted = prev.completedBookIds.includes(selectedBook.id);
      const updated: UserStats = {
        ...prev,
        completedBookIds: alreadyCompleted
          ? prev.completedBookIds
          : [...prev.completedBookIds, selectedBook.id],
      };
      saveStoredStats(updated);
      return updated;
    });

    setActiveTab('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveQuizAttempt = (attempt: QuizAttempt) => {
    setUserStats((prev) => {
      const updated: UserStats = {
        ...prev,
        attempts: [...prev.attempts, attempt],
        readerName: currentUser ? currentUser.name : prev.readerName,
      };
      saveStoredStats(updated);
      return updated;
    });
  };

  const handleAddCustomBook = (newBook: Book) => {
    const updated = [newBook, ...customBooks];
    setCustomBooks(updated);
    saveStoredCustomBooks(updated);
    setSelectedBook(newBook);
    setActiveTab('reader');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteCustomBook = (bookId: string) => {
    const updated = deleteStoredCustomBook(bookId);
    setCustomBooks(updated);
    if (selectedBook && selectedBook.id === bookId) {
      setSelectedBook(initialBooks[0]);
    }
  };

  const handleResetStats = () => {
    const fresh: UserStats = {
      readerName: currentUser ? currentUser.name : 'Оқырман / Читатель',
      completedBookIds: [],
      attempts: [],
      totalReadingTimeMinutes: 0,
    };
    setUserStats(fresh);
    saveStoredStats(fresh);
  };

  const handleAuthSuccess = (user: User) => {
    setCurrentUser(user);
    setUserStats((prev) => {
      const updated: UserStats = {
        ...prev,
        readerName: user.name,
      };
      saveStoredStats(updated);
      return updated;
    });
  };

  const handleLogout = async () => {
    try {
      // Отправляем запрос на логаут на бэкенд
      await api.post('/logout');
    } catch (e) {
      console.error(e);
    } finally {
      localStorage.removeItem('user');
      setAuthToken(null);
      setCurrentUser(null);
      setIsProfileModalOpen(false);
    }
  };

  const openAuthWithReason = (reason?: string) => {
    setAuthReasonMessage(reason);
    setIsAuthModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 font-sans selection:bg-amber-200 selection:text-amber-950">
      <Header
        currentLang={currentLang}
        onSelectLang={(lang) => setCurrentLang(lang)}
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        hasActiveBook={!!selectedBook}
        currentUser={currentUser}
        onOpenAuth={() => openAuthWithReason()}
        onOpenProfile={() => setIsProfileModalOpen(true)}
      />

      <div className="flex-1 pb-16 md:pb-0">
        {activeTab === 'library' && (
          <LibraryView
            books={allBooks}
            userStats={userStats}
            currentLang={currentLang}
            currentUser={currentUser}
            onSelectBookForReading={handleSelectBookForReading}
            onSelectBookForQuiz={handleSelectBookForQuiz}
            onOpenAuth={() => openAuthWithReason()}
            onNavigateToAddBook={() => {
              setActiveTab('add');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onDeleteBook={handleDeleteCustomBook}
          />
        )}

        {activeTab === 'reader' && selectedBook && (
          <ReaderView
            book={selectedBook}
            currentLang={currentLang}
            onBackToLibrary={() => setActiveTab('library')}
            onFinishAndTakeQuiz={handleFinishReadingAndTakeQuiz}
          />
        )}

        {activeTab === 'quiz' && selectedBook && (
          <QuizView
            book={selectedBook}
            currentLang={currentLang}
            userStats={userStats}
            onBackToLibrary={() => setActiveTab('library')}
            onBackToReader={() => setActiveTab('reader')}
            onSaveQuizAttempt={handleSaveQuizAttempt}
          />
        )}

        {activeTab === 'stats' && (
          <StatsView
            userStats={userStats}
            currentLang={currentLang}
            books={allBooks}
            onSelectBookForQuiz={handleSelectBookForQuiz}
            onSelectBookForReading={handleSelectBookForReading}
            onResetStats={handleResetStats}
          />
        )}

        {activeTab === 'add' && (
          <AddCustomBookView
            currentLang={currentLang}
            currentUser={currentUser}
            onRequestAuth={() => openAuthWithReason(t.authRequiredToAddTitle)}
            onAddBook={handleAddCustomBook}
            onCancel={() => setActiveTab('library')}
          />
        )}
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => {
          setIsAuthModalOpen(false);
          setAuthReasonMessage(undefined);
        }}
        currentLang={currentLang}
        onAuthSuccess={handleAuthSuccess}
        reasonMessage={authReasonMessage}
      />

      {currentUser && (
        <UserProfileModal
          isOpen={isProfileModalOpen}
          onClose={() => setIsProfileModalOpen(false)}
          user={currentUser}
          currentLang={currentLang}
          userStats={userStats}
          myBooks={myBooks}
          onLogout={handleLogout}
          onOpenBook={handleSelectBookForReading}
          onDeleteBook={handleDeleteCustomBook}
          onNavigateToAddBook={() => {
            setActiveTab('add');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      )}

      <footer className="mt-auto border-t border-stone-200 bg-white py-6 md:py-8 mb-16 md:mb-0 text-xs text-stone-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-center gap-2">
            <span className="font-display-book font-bold text-stone-900 text-sm">
              KitapBilim
            </span>
            <span aria-hidden="true">·</span>
            <span>{t.tagline}</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Қазақша / Русский / English</span>
            <span aria-hidden="true">·</span>
            <span>{new Date().getFullYear()}</span>
          </div>
        </div>
      </footer>

      <MobileBottomNav
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        hasActiveBook={!!selectedBook}
        currentLang={currentLang}
      />
    </div>
  );
}