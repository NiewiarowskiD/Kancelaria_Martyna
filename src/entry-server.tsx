/* eslint-disable react-refresh/only-export-components */
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import createEmotionServer from '@emotion/server/create-instance';
import App from './App';
import { buildHeadTags, headCollector } from './seo/head';
import { setPrefetchedArticles } from './lib/prefetch';
import type { BlogArticle } from './lib/supabase';

export function render(url: string, articles: BlogArticle[] | null = null) {
  setPrefetchedArticles(articles);
  headCollector.current = null;
  const cache = createCache({ key: 'css' });
  const { extractCriticalToChunks, constructStyleTagsFromChunks } = createEmotionServer(cache);
  const html = renderToString(
    <CacheProvider value={cache}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </CacheProvider>,
  );
  const chunks = extractCriticalToChunks(html);
  const styles = constructStyleTagsFromChunks(chunks);
  const seo = headCollector.current;
  return { html, styles, head: seo ? buildHeadTags(seo) : '' };
}

export { STATIC_PATHS, articleSlugs, blogPath } from './seo/routes';
