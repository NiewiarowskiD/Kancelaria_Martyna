import type { BlogArticle } from './supabase';

/** Artykuły pobrane w czasie buildu (prerender). W przeglądarce zawsze null. */
let prefetched: BlogArticle[] | null = null;

export function setPrefetchedArticles(articles: BlogArticle[] | null) {
  prefetched = articles;
}

export function getPrefetchedArticles(): BlogArticle[] | null {
  return typeof window === 'undefined' ? prefetched : null;
}
