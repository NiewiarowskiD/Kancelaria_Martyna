import { OG_IMAGE, SITE_NAME, SITE_URL } from './site';

export interface SeoProps {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
  image?: string;
  type?: 'website' | 'article';
  jsonLd?: object | object[];
}

/** Zbiera tagi <head> podczas renderowania po stronie serwera (prerender). */
export const headCollector: { current: SeoProps | null } = { current: null };

export function buildHeadTags(p: SeoProps): string {
  const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
  const url = `${SITE_URL}${p.path === '/' ? '/' : p.path}`;
  const image = p.image || OG_IMAGE;
  const tags = [
    `<title>${esc(p.title)}</title>`,
    `<meta name="description" content="${esc(p.description)}" />`,
    `<link rel="canonical" href="${url}" />`,
    p.noindex
      ? '<meta name="robots" content="noindex, nofollow" />'
      : '<meta name="robots" content="index, follow" />',
    `<meta property="og:type" content="${p.type || 'website'}" />`,
    `<meta property="og:site_name" content="${esc(SITE_NAME)}" />`,
    `<meta property="og:locale" content="pl_PL" />`,
    `<meta property="og:title" content="${esc(p.title)}" />`,
    `<meta property="og:description" content="${esc(p.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${esc(image)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(p.title)}" />`,
    `<meta name="twitter:description" content="${esc(p.description)}" />`,
    `<meta name="twitter:image" content="${esc(image)}" />`,
  ];
  if (p.image === undefined || image === OG_IMAGE) {
    tags.push(
      '<meta property="og:image:width" content="1200" />',
      '<meta property="og:image:height" content="630" />',
    );
  }
  const ld = p.jsonLd ? (Array.isArray(p.jsonLd) ? p.jsonLd : [p.jsonLd]) : [];
  for (const item of ld) {
    tags.push(
      `<script type="application/ld+json">${JSON.stringify(item).replace(/</g, '\\u003c')}</script>`,
    );
  }
  return tags.join('\n    ');
}
