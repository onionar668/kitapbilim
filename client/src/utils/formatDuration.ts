import { Language } from '../types';

function russianForm(value: number, one: string, few: string, many: string): string {
  const mod100 = value % 100;
  if (mod100 >= 11 && mod100 <= 14) return many;

  const mod10 = value % 10;
  if (mod10 === 1) return one;
  if (mod10 >= 2 && mod10 <= 4) return few;
  return many;
}

export function formatDuration(seconds: number, language: Language): string {
  const safeSeconds = Number.isFinite(seconds) ? Math.max(0, Math.floor(seconds)) : 0;
  const hours = Math.floor(safeSeconds / 3600);
  const minutes = Math.floor((safeSeconds % 3600) / 60);
  const remainingSeconds = safeSeconds % 60;
  const parts: string[] = [];

  if (hours > 0) {
    const unit = language === 'ru'
      ? russianForm(hours, 'ч', 'ч', 'ч')
      : language === 'kk' ? 'сағ' : hours === 1 ? 'hr' : 'hrs';
    parts.push(`${hours} ${unit}`);
  }
  if (minutes > 0 || (hours === 0 && remainingSeconds === 0)) {
    const unit = language === 'ru'
      ? russianForm(minutes, 'мин', 'мин', 'мин')
      : language === 'kk' ? 'мин' : minutes === 1 ? 'min' : 'mins';
    parts.push(`${minutes} ${unit}`);
  }
  if (remainingSeconds > 0 && hours === 0) {
    const unit = language === 'ru'
      ? russianForm(remainingSeconds, 'сек', 'сек', 'сек')
      : language === 'kk' ? 'сек' : remainingSeconds === 1 ? 'sec' : 'secs';
    parts.push(`${remainingSeconds} ${unit}`);
  }

  return parts.join(' ');
}
