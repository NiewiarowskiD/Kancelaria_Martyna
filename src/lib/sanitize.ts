import DOMPurify from 'dompurify';

/** Na serwerze (prerender) renderujemy wyłącznie statyczne, zaufane treści z kodu. */
export function sanitizeHtml(html: string): string {
  if (typeof window === 'undefined') return html;
  return DOMPurify.sanitize(html);
}
