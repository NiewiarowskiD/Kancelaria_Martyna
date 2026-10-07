import type { BlogArticle } from './supabase';

const LOREM =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';

const content = `<p>${LOREM}</p><h2>Lorem ipsum dolor sit amet</h2><p>${LOREM}</p><ul><li>lorem ipsum dolor sit amet</li><li>consectetur adipiscing elit</li><li>sed do eiusmod tempor</li></ul><p>${LOREM}</p>`;

/** Przykładowe wpisy pokazywane, gdy blog nie jest połączony z bazą danych (wersja demonstracyjna). */
export const DEMO_ARTICLES: BlogArticle[] = [
  {
    id: 'demo-1',
    title: 'Lorem ipsum dolor sit amet, consectetur adipiscing',
    excerpt: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    content,
    category: 'Prawo cywilne',
    image_url: null,
    published: true,
    created_at: '2026-09-10T10:00:00Z',
    updated_at: '2026-09-10T10:00:00Z',
  },
  {
    id: 'demo-2',
    title: 'Ut enim ad minim veniam, quis nostrud exercitation',
    excerpt: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.',
    content,
    category: 'Prawo rodzinne',
    image_url: null,
    published: true,
    created_at: '2026-09-03T10:00:00Z',
    updated_at: '2026-09-03T10:00:00Z',
  },
  {
    id: 'demo-3',
    title: 'Excepteur sint occaecat cupidatat non proident',
    excerpt: 'Sunt in culpa qui officia deserunt mollit anim id est laborum.',
    content,
    category: 'Prawo pracy',
    image_url: null,
    published: true,
    created_at: '2026-08-27T10:00:00Z',
    updated_at: '2026-08-27T10:00:00Z',
  },
];
