import { useEffect } from 'react';
import { buildHeadTags, headCollector, type SeoProps } from './head';

export type { SeoProps };

const MANAGED = 'data-seo';

export default function Seo(props: SeoProps) {
  if (typeof document === 'undefined') {
    // eslint-disable-next-line react-hooks/immutability
    headCollector.current = props;
    return null;
  }
  const ldKey = JSON.stringify(props.jsonLd);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    document.head.querySelectorAll(`[${MANAGED}]`).forEach((el) => el.remove());
    document.head
      .querySelectorAll(
        'title, meta[name="description"], link[rel="canonical"], meta[name="robots"], meta[property^="og:"], meta[name^="twitter:"], script[type="application/ld+json"]',
      )
      .forEach((el) => el.remove());
    document.title = props.title;
    const tpl = document.createElement('template');
    tpl.innerHTML = buildHeadTags(props);
    tpl.content.querySelectorAll('meta, link, script').forEach((el) => {
      el.setAttribute(MANAGED, '');
      document.head.appendChild(el);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.title, props.description, props.path, props.noindex, props.image, props.type, ldKey]);
  return null;
}
