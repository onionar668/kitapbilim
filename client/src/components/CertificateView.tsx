import React, { useState } from 'react';
import { ArrowLeft, Award, Printer } from 'lucide-react';
import { Book, Language } from '../types';
import { translations } from '../utils/translations';

interface CertificateViewProps {
  book: Book;
  currentLang: Language;
  readerName: string;
  onBackToLibrary: () => void;
}

export const CertificateView: React.FC<CertificateViewProps> = ({
  book,
  currentLang,
  readerName: initialReaderName,
  onBackToLibrary,
}) => {
  const t = translations[currentLang];
  const [readerName, setReaderName] = useState(initialReaderName);
  const bookTitle = book.title[currentLang] || book.title.ru;
  const author = book.author[currentLang] || book.author.ru;
  const locale = currentLang === 'kk' ? 'kk-KZ' : currentLang === 'ru' ? 'ru-RU' : 'en-US';
  const awardedDate = new Intl.DateTimeFormat(locale, { dateStyle: 'long' }).format(new Date());

  return (
    <main className="mx-auto max-w-4xl space-y-6 px-4 py-8 sm:px-6 md:py-12">
      <div className="flex flex-col gap-4 border-b border-stone-200 pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Award className="h-7 w-7 text-amber-700" />
          <h1 className="font-display-book text-2xl font-bold text-stone-900">
            {t.certificateTitle}
          </h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={onBackToLibrary}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-stone-300 bg-white px-4 py-2.5 text-xs font-semibold text-stone-700 transition hover:bg-stone-50"
          >
            <ArrowLeft className="h-4 w-4" />
            {t.backToLibrary}
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-amber-700 px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-amber-800"
          >
            <Printer className="h-4 w-4" />
            {t.printCertificate}
          </button>
        </div>
      </div>

      <label className="flex flex-col gap-2 rounded-xl bg-stone-100 p-4 text-xs sm:flex-row sm:items-center sm:justify-between">
        <span className="font-semibold text-stone-700">{t.readerNamePrompt}</span>
        <input
          type="text"
          value={readerName}
          onChange={(event) => setReaderName(event.target.value)}
          placeholder={t.enterYourName}
          className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-xs font-medium text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-900 sm:w-64"
        />
      </label>

      <section
        id="printable-certificate"
        className="relative space-y-4 overflow-hidden rounded-2xl border-2 border-amber-900/20 bg-white p-4 text-center shadow-xs sm:space-y-6 sm:border-4 sm:p-8 md:p-12"
      >
        <div className="space-y-4 rounded-lg border border-amber-800/40 bg-amber-50/20 p-4 sm:space-y-6 sm:p-6 md:p-8">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-amber-800 sm:text-xs">
              {t.brand} · {t.certificateSubtitle}
            </span>
            <h2 className="font-display-book text-xl font-bold text-stone-900 sm:text-3xl">
              {t.certificateTitle}
            </h2>
          </div>

          <div className="space-y-1 py-1 sm:py-2">
            <p className="text-xs text-stone-500">{t.certifiedThat}</p>
            <p className="break-words font-display-book text-xl font-bold text-amber-900 underline decoration-amber-300 underline-offset-4 sm:text-3xl">
              {readerName || t.readerNamePrompt}
            </p>
          </div>

          <div className="mx-auto max-w-lg space-y-1">
            <p className="text-xs text-stone-600">{t.completedBookAndPassed}</p>
            <p className="break-words font-display-book text-lg font-bold text-stone-900 sm:text-xl">
              «{bookTitle}»
            </p>
            <p className="text-xs font-medium text-stone-500">{author}</p>
          </div>

          <div className="flex justify-center border-t border-stone-200 pt-3 text-xs sm:pt-4">
            <div>
              <span className="block text-[11px] text-stone-400 sm:text-xs">{t.dateAwarded}</span>
              <span className="text-sm font-bold text-stone-900 sm:text-base">{awardedDate}</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
