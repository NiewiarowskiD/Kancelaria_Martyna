import { CITIES, EMAIL, OG_IMAGE, PHONE, SITE_NAME, SITE_URL } from './site';

export const legalServiceLd = {
  '@context': 'https://schema.org',
  '@type': ['LegalService', 'Attorney'],
  '@id': `${SITE_URL}/#kancelaria`,
  name: SITE_NAME,
  alternateName: 'Radca prawny Martyna Obecna',
  url: SITE_URL,
  image: OG_IMAGE,
  logo: `${SITE_URL}/logo.svg`,
  telephone: '+48505810279',
  email: EMAIL,
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Porady prawne online (e-porada).',
  priceRange: 'Porada prawna 000 zł',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Warszawa',
    addressRegion: 'mazowieckie',
    addressCountry: 'PL',
  },
  areaServed: [
    { '@type': 'Country', name: 'Polska' },
    ...CITIES.map((name) => ({ '@type': 'City', name })),
  ],
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '17:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '10:00',
      closes: '16:00',
    },
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: PHONE,
    contactType: 'customer service',
    availableLanguage: 'pl',
  },
  employee: {
    '@type': 'Person',
    name: 'Martyna Obecna',
    jobTitle: 'Radca prawny',
  },
};

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}${it.path}`,
    })),
  };
}

export function articleLd(a: {
  title: string;
  description: string;
  path: string;
  image?: string | null;
  published: string;
  modified: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: a.title,
    description: a.description,
    mainEntityOfPage: `${SITE_URL}${a.path}`,
    image: a.image || OG_IMAGE,
    datePublished: a.published,
    dateModified: a.modified,
    author: { '@type': 'Person', name: 'Martyna Obecna', jobTitle: 'Radca prawny' },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.svg` },
    },
  };
}
