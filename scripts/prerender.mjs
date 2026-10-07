// Prerender: generuje statyczny HTML dla każdej podstrony + sitemap.xml.
// Uruchamiany po `vite build` i `vite build --ssr` (patrz "build" w package.json).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { JSDOM } from 'jsdom';
import createDOMPurify from 'dompurify';
import { createClient } from '@supabase/supabase-js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const serverDir = path.join(root, 'dist-server');

// Zmienne środowiskowe: z procesu lub z plików .env*
function loadEnv() {
  for (const f of ['.env', '.env.local', '.env.production']) {
    const p = path.join(root, f);
    if (!fs.existsSync(p)) continue;
    for (const line of fs.readFileSync(p, 'utf8').split('\n')) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (m && process.env[m[1]] === undefined)
        process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
    }
  }
}
loadEnv();

const SITE_URL = (process.env.VITE_SITE_URL || 'https://example.com').replace(/\/$/, '');

const { render, STATIC_PATHS, articleSlugs, blogPath } = await import(
  pathToFileURL(path.join(serverDir, 'entry-server.js')).href
);

// Artykuły z bazy (opcjonalnie – bez konfiguracji Supabase prerenderujemy tylko strony statyczne)
let articles = null; // null = brak danych (blog zostanie wczytany w przeglądarce)
if (process.env.VITE_SUPABASE_URL && process.env.VITE_SUPABASE_ANON_KEY) {
  try {
    const supabase = createClient(
      process.env.VITE_SUPABASE_URL,
      process.env.VITE_SUPABASE_ANON_KEY,
    );
    const { data, error } = await supabase
      .from('blog_articles')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false });
    if (error) throw error;
    const purify = createDOMPurify(new JSDOM('').window);
    articles = (data || []).map((a) => ({
      ...a,
      content: a.content ? purify.sanitize(a.content) : a.content,
    }));
    console.log(`Prerender: pobrano ${articles.length} artykułów z bazy`);
  } catch (e) {
    console.warn('Prerender: nie udało się pobrać artykułów, pomijam blog:', e.message);
  }
} else {
  console.warn(
    'Prerender: brak VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY – pomijam artykuły bloga',
  );
}

const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');

function writePage(urlPath, html) {
  const dir = urlPath === '/' ? dist : path.join(dist, urlPath);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html);
}

function build(urlPath) {
  const { html, styles, head } = render(urlPath, articles);
  return template
    .replace('<!--app-head-->', `${head}\n    ${styles}`)
    .replace('<!--app-html-->', html);
}

const articleList = articles || [];
const slugs = articleSlugs(articleList);
const paths = [...STATIC_PATHS, ...articleList.map((a) => blogPath(slugs.get(a.id)))];
const lastmod = new Date().toISOString().slice(0, 10);

for (const p of paths) {
  writePage(p, build(p));
  console.log('Prerender:', p);
}

// Strona 404 (serwowana przez Vercel dla nieistniejących adresów)
fs.writeFileSync(path.join(dist, '404.html'), build('/404-not-found'));

const entries = paths.map((p) => {
  const art = articleList.find((a) => blogPath(slugs.get(a.id)) === p);
  const mod = art ? String(art.updated_at || art.created_at).slice(0, 10) : lastmod;
  const priority =
    p === '/'
      ? '1.0'
      : p.startsWith('/specjalizacje') || p === '/cennik' || p === '/o-kancelarii'
        ? '0.8'
        : '0.6';
  return `  <url>\n    <loc>${SITE_URL}${p === '/' ? '/' : p}</loc>\n    <lastmod>${mod}</lastmod>\n    <priority>${priority}</priority>\n  </url>`;
});
fs.writeFileSync(
  path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join('\n')}\n</urlset>\n`,
);
console.log(`Prerender: zapisano ${paths.length} stron i sitemap.xml`);

fs.rmSync(serverDir, { recursive: true, force: true });
