import { Book, Language, UserStats } from '../types';

const STATS_KEY = 'kitapbilim_user_stats_v1';
const CUSTOM_BOOKS_KEY = 'kitapbilim_custom_books_v1';

const defaultStats: UserStats = {
  readerName: 'Оқырман / Читатель ',
  completedBookIds: [],
  attempts: [],
  totalReadingTimeMinutes: 0
};

export function getStoredStats(): UserStats {
  try {
    const raw = localStorage.getItem(STATS_KEY);
    if (!raw) return defaultStats;
    return JSON.parse(raw);
  } catch {
    return defaultStats;
  }
}

export function saveStoredStats(stats: UserStats): void {
  try {
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
  } catch (e) {
    console.error('Failed to save stats', e);
  }
}

export function getStoredCustomBooks(): Book[] {
  try {
    const raw = localStorage.getItem(CUSTOM_BOOKS_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveStoredCustomBooks(books: Book[]): void {
  try {
    localStorage.setItem(CUSTOM_BOOKS_KEY, JSON.stringify(books));
  } catch (e) {
    console.error('Failed to save custom books', e);
  }
}

export function deleteStoredCustomBook(bookId: string): Book[] {
  const current = getStoredCustomBooks();
  const updated = current.filter((b) => b.id !== bookId);
  saveStoredCustomBooks(updated);
  return updated;
}

export function evaluateOpenAnswer(
  answer: string,
  keyThemes: string[],
  lang: Language
): { score: number; feedback: Record<Language, string>; foundThemes: string[] } {
  const normalizedAnswer = answer.toLowerCase().trim();
  if (normalizedAnswer.length < 5) {
    return {
      score: 1,
      feedback: {
        kk: 'Жауап өте қысқа. Кітаптан түйген ойларыңызды кеңірек жазуға тырысыңыз.',
        ru: 'Ответ слишком краток. Постарайтесь подробнее раскрыть свои выводы о книге.',
        en: 'The response is very brief. Try elaborating further on your insights from the text.'
      },
      foundThemes: []
    };
  }

  const foundThemes = keyThemes.filter((theme) =>
    normalizedAnswer.includes(theme.toLowerCase())
  );

  const matchRatio = foundThemes.length / Math.max(keyThemes.length, 1);
  let score = 5;
  if (matchRatio >= 0.5) score = 10;
  else if (matchRatio >= 0.25 || normalizedAnswer.length > 50) score = 8;
  else if (normalizedAnswer.length > 25) score = 6;

  let feedback: Record<Language, string>;
  if (score >= 9) {
    feedback = {
      kk: 'Өте терең әрі сауатты талдау! Сіз шығарманың өзекті идеясын дәл ұстағансыз.',
      ru: 'Глубокий и зрелый читательский вывод! Вы точно уловили скрытые смыслы и философию произведения.',
      en: 'Profound and thoughtful reflection! You accurately captured the underlying philosophical essence of the text.'
    };
  } else if (score >= 6) {
    feedback = {
      kk: 'Жақсы тұжырым. Басты мағына ашылған, ойыңызды жүйелі жеткіздіңіз.',
      ru: 'Хорошее рассуждение. Главная мысль прослеживается, суть произведения передана верно.',
      en: 'Good reflection. The central motif is evident and your takeaway is articulated coherently.'
    };
  } else {
    feedback = {
      kk: 'Ойыңыз түсінікті, дегенмен кітаптағы негізгі идеялармен байланыстыра түсуге болады.',
      ru: 'Мысль ясна, однако стоит глубже сопоставить её с ключевыми темами и уроками книги.',
      en: 'Clear thought, though you could connect it more deeply with the core dilemmas of the work.'
    };
  }

  return { score, feedback, foundThemes };
}
