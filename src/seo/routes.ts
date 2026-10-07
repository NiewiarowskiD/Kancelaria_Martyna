export const PATHS = {
  home: '/',
  about: '/o-kancelarii',
  specializations: '/specjalizacje',
  price: '/cennik',
  online: '/porady-online',
  blog: '/blog',
  contact: '/kontakt',
  rodo: '/polityka-prywatnosci',
  notaPrawna: '/nota-prawna',
  regulamin: '/regulamin',
  admin: '/admin',
} as const;

export type PageKey = keyof typeof PATHS;

export const SPECIALIZATION_LABELS = [
  'Prawo cywilne',
  'Prawo karne',
  'Prawo rodzinne',
  'Prawo spadkowe',
  'Prawo gospodarcze',
  'Prawo pracy',
  'Upadłość konsumencka',
];

export const specializationHash = (index: number) => `#spec-${index}`;

export const blogPath = (slug: string) => `${PATHS.blog}/${slug}`;

const PL: Record<string, string> = {
  ą: 'a',
  ć: 'c',
  ę: 'e',
  ł: 'l',
  ń: 'n',
  ó: 'o',
  ś: 's',
  ź: 'z',
  ż: 'z',
};

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[ąćęłńóśźż]/g, (c) => PL[c])
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

/** Unikalne slugi artykułów (przy powtórzeniu tytułu dopisujemy numer). */
export function articleSlugs(articles: { id: string; title: string }[]): Map<string, string> {
  const used = new Set<string>();
  const map = new Map<string, string>();
  for (const a of articles) {
    const base = slugify(a.title) || 'artykul';
    let slug = base;
    let i = 2;
    while (used.has(slug)) slug = `${base}-${i++}`;
    used.add(slug);
    map.set(a.id, slug);
  }
  return map;
}

export interface PageMeta {
  title: string;
  description: string;
}

export const PAGE_META: Record<string, PageMeta> = {
  '/': {
    title: 'Martyna Obecna – Kancelaria Radcy Prawnego',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  '/o-kancelarii': {
    title: 'O Kancelarii – Martyna Obecna, radca prawny',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  '/specjalizacje': {
    title: 'Specjalizacje – Kancelaria Martyna Obecna',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  '/cennik': {
    title: 'Cennik – Kancelaria Martyna Obecna',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  '/porady-online': {
    title: 'Porady prawne online (e-porada) – Martyna Obecna',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  '/blog': {
    title: 'Blog – artykuły i porady prawne | Martyna Obecna',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  '/nota-prawna': {
    title: 'Nota prawna | Martyna Obecna',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  '/regulamin': {
    title: 'Regulamin serwisu i e-porad | Martyna Obecna',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  '/kontakt': {
    title: 'Kontakt – Kancelaria Martyna Obecna',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  '/polityka-prywatnosci': {
    title: 'Polityka prywatności i cookies | Martyna Obecna',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
};

export const STATIC_PATHS = Object.keys(PAGE_META);
