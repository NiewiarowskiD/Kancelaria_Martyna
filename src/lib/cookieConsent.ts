export const STORAGE_KEY = 'cookie-consent';

export type CookieConsent = 'all' | 'necessary';

export function getCookieConsent(): CookieConsent | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === 'all' || value === 'necessary' ? value : null;
  } catch {
    return null;
  }
}
