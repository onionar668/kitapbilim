/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useCallback, useState, useEffect } from 'react';
import { api, setAuthToken } from './api/client';
import { createBook, deleteBook, fetchBooks, syncReadingProgress } from './api/books';
import { Book, Language, User, UserStats } from './types';
import { initialBooks } from './data/booksData';
import { translations } from './utils/translations';
import { getStoredStats, saveStoredStats } from './utils/storage';
import { Header } from './components/Header';
import { LibraryView } from './components/LibraryView';
import { ReaderView } from './components/ReaderView';
import { CertificateView } from './components/CertificateView';
import { AddCustomBookView } from './components/AddCustomBookView';
import { AuthModal } from './components/AuthModal';
import { UserProfileModal } from './components/UserProfileModal';
import { MobileBottomNav } from './components/MobileBottomNav';
import { AdminView } from './components/AdminView';

type AppTab = 'library' | 'reader' | 'certificate' | 'add' | 'admin';

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>('kk');
  const [activeTab, setActiveTab] = useState<AppTab>('library');
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [selectedBook, setSelectedBook] = useState<Book | null>(initialBooks[0] ?? null);
  const [userStats, setUserStats] = useState<UserStats>(getStoredStats());
  
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [authReasonMessage, setAuthReasonMessage] = useState<string | undefined>();

  useEffect(() => {
    const loadBooks = () =>
      fetchBooks()
        .then((loaded) => {
          setBooks(loaded);
          setSelectedBook((previous) =>
            loaded.find((book) => book.id === previous?.id) ?? loaded[0] ?? null
          );
        })
        .catch(() => {
          // Offline fallback to bundled catalog
        });

    loadBooks();

    const token = localStorage.getItem('auth_token');
    if (token) {
      setAuthToken(token);

      api
        .get('/me')
        .then((response) => {
          setCurrentUser(response.data);
          localStorage.setItem('user', JSON.stringify(response.data));
          return loadBooks();
        })
        .catch(() => {
          localStorage.removeItem('auth_token');
          localStorage.removeItem('user');
          setAuthToken(null);
          setCurrentUser(null);
        });
    }
  }, []);

  const allBooks = books;
  const t = translations[currentLang];

  const myBooks = currentUser
    ? books.filter((b) => String(b.createdByUserId) === String(currentUser.id))
    : [];

  const handleSelectBookForReading = (book: Book) => {
    setSelectedBook(book);
    setActiveTab('reader');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAdminBooksChanged = useCallback((updatedBooks: Book[]) => {
    setBooks(updatedBooks);
    setSelectedBook((previous) =>
      updatedBooks.find((book) => book.id === previous?.id) ?? updatedBooks[0] ?? null
    );
  }, []);

  const handleFinishReading = (position: { chapterIndex: number; scrollPercent: number }) => {
    if (!selectedBook) return;

    if (currentUser) {
      syncReadingProgress({
        bookId: selectedBook.id,
        status: 'completed',
        chapterIndex: position.chapterIndex,
        scrollPercent: position.scrollPercent,
        progressPercent: 100,
      }).catch(() => undefined);
    }

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

    setActiveTab('certificate');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddCustomBook = async (newBook: Book) => {
    try {
      const saved = await createBook({
        ...newBook,
        publishToCatalog: currentUser?.role === 'admin',
      });
      const updated = [saved, ...books];
      setBooks(updated);
      setSelectedBook(saved);
      setActiveTab('reader');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (e) {
      console.error(e);
      alert(
        currentLang === 'kk'
          ? 'Кітапты сақтау сәтсіз. Серверді тексеріңіз.'
          : currentLang === 'ru'
            ? 'Не удалось сохранить книгу. Проверьте сервер.'
            : 'Failed to save the book. Check the server.'
      );
    }
  };

  const handleDeleteCustomBook = async (bookId: string) => {
    try {
      await deleteBook(bookId);
      const updated = books.filter((b) => b.id !== bookId);
      setBooks(updated);
      if (selectedBook && selectedBook.id === bookId) {
        setSelectedBook(updated[0] ?? null);
      }
    } catch (e) {
      console.error(e);
      alert(
        currentLang === 'kk'
          ? 'Кітапты жою мүмкін емес'
          : currentLang === 'ru'
            ? 'Не удалось удалить книгу'
            : 'Could not delete the book'
      );
    }
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
    fetchBooks()
      .then((loaded) => {
        setBooks(loaded);
        setSelectedBook((previous) =>
          loaded.find((book) => book.id === previous?.id) ?? loaded[0] ?? null
        );
      })
      .catch(() => undefined);
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
        showAdminTab={currentUser?.role === 'admin'}
      />

      <div className="flex-1 pb-16 md:pb-0">
        {activeTab === 'library' && (
          <LibraryView
            books={allBooks}
            userStats={userStats}
            currentLang={currentLang}
            currentUser={currentUser}
            onSelectBookForReading={handleSelectBookForReading}
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
            currentUser={currentUser}
            onBackToLibrary={() => setActiveTab('library')}
            onFinishReading={handleFinishReading}
          />
        )}

        {activeTab === 'certificate' && selectedBook && (
          <CertificateView
            book={selectedBook}
            currentLang={currentLang}
            readerName={currentUser?.name || userStats.readerName}
            onBackToLibrary={() => setActiveTab('library')}
          />
        )}

        {activeTab === 'admin' && currentUser && (
          <AdminView
            currentLang={currentLang}
            currentUser={currentUser}
            onBooksChanged={handleAdminBooksChanged}
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
          onNavigateToAdmin={
            currentUser.role === 'admin'
              ? () => {
                  setIsProfileModalOpen(false);
                  setActiveTab('admin');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              : undefined
          }
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
        showAdminTab={currentUser?.role === 'admin'}
      />
    </div>
  );
}