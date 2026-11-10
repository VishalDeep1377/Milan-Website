import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

function getAllSrcFiles(dir) {
  let results = [];
  const list = readdirSync(dir);
  for (const file of list) {
    const fullPath = join(dir, file);
    const stat = statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllSrcFiles(fullPath));
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      results.push(fullPath);
    }
  }
  return results;
}

const srcDir = fileURLToPath(new URL('../src', import.meta.url));
const allFiles = getAllSrcFiles(srcDir);
const combinedSrc = allFiles.map((f) => readFileSync(f, 'utf8')).join('\n');
const data = readFileSync(new URL('../src/events.ts', import.meta.url), 'utf8');

const checks = [
  ['event dataset exists', data.includes('export const events')],
  ['search control exists', combinedSrc.includes('Search events') || combinedSrc.includes('search-box')],
  ['category filtering exists', combinedSrc.includes('activeCategory')],
  ['registration validation exists', combinedSrc.includes('validateRegistrationForm') || combinedSrc.includes('const validate') || combinedSrc.includes('function validate')],
  ['empty state exists', combinedSrc.includes('No events found.')],
  ['event details modal exists', combinedSrc.includes('role="dialog"')],
];

let failed = false;
for (const [name, ok] of checks) {
  console.log(`${ok ? 'PASS' : 'FAIL'} ${name}`);
  if (!ok) failed = true;
}
if (failed) process.exit(1);
