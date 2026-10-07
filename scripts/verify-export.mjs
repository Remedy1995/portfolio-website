import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import path from 'node:path';

const root = path.resolve('out');
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
const errors = [];
let checked = 0;

function files(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const file = path.join(directory, entry.name);
    return entry.isDirectory() ? files(file) : [file];
  });
}

function verify(reference, source) {
  if (!reference || reference.startsWith('#') || /^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(reference)) return;
  const sourcePath = '/' + path.relative(root, source).split(path.sep).join('/');
  const pathname = decodeURIComponent(new URL(reference.replaceAll('&amp;', '&'), `https://example.invalid${basePath}${sourcePath}`).pathname);
  if (basePath && pathname !== basePath && !pathname.startsWith(`${basePath}/`)) {
    errors.push(`${sourcePath}: URL escapes the site prefix: ${reference}`);
    return;
  }
  const file = path.join(root, pathname.slice(basePath.length));
  if (!existsSync(file) || (statSync(file).isDirectory() && !existsSync(path.join(file, 'index.html')))) {
    errors.push(`${sourcePath}: missing target: ${reference}`);
  }
  checked++;
}

const exported = files(root);
for (const file of exported) {
  if (file.endsWith('.html')) {
    const html = readFileSync(file, 'utf8');
    for (const tag of html.matchAll(/<(?:a|img|link|source|video|script)\b[^>]*>/g)) {
      if (/\brel="(?:preconnect|dns-prefetch)"/.test(tag[0])) continue;
      for (const match of tag[0].matchAll(/\b(?:src|href|poster)="([^"]*)"/g)) verify(match[1], file);
    }
  } else if (file.endsWith('.css')) {
    for (const match of readFileSync(file, 'utf8').matchAll(/url\(\s*["']?([^"')]+)["']?\s*\)/g)) verify(match[1], file);
  }
}
if (errors.length) {
  console.error([...new Set(errors)].join('\n'));
  process.exit(1);
}
console.log(`Verified ${checked} local links and assets in the static export (base path: ${basePath || '/'}).`);
