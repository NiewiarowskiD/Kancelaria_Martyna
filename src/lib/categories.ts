export const BLOG_CATEGORIES = [
  'Prawo cywilne',
  'Prawo karne',
  'Prawo rodzinne',
  'Prawo spadkowe',
  'Prawo gospodarcze',
  'Prawo pracy',
  'Upadłość konsumencka',
];

/** Kategorie do wyboru w panelu admina (lista bloga + kategoria ogólna). */
export const ADMIN_CATEGORIES = [...BLOG_CATEGORIES, 'Prawo nieruchomości', 'Ogólne'];

/** Ujednolica zapis kategorii (wielkość liter, spacje), żeby "Prawo Cywilne" i "Prawo cywilne" były jedną kategorią. */
export function canonicalCategory(category: string): string {
  const trimmed = category.trim();
  return ADMIN_CATEGORIES.find((c) => c.toLowerCase() === trimmed.toLowerCase()) ?? trimmed;
}
