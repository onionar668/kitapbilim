import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { initialBooks } from '../src/data/booksData';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outPath = join(__dirname, '../../server/database/data/books.json');

mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, JSON.stringify(initialBooks, null, 2), 'utf8');

console.log(`Exported ${initialBooks.length} books to ${outPath}`);
