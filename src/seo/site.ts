export const SITE_URL =
  (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/$/, '') ||
  'https://example.com';
export const SITE_NAME = 'Kancelaria Radcy Prawnego Martyna Obecna';
export const OWNER_NAME = 'Martyna Obecna';
export const PHONE = '+48 000 000 000';
export const PHONE_HREF = 'tel:+48000000000';
export const EMAIL = 'kontakt@example.com';
export const OG_IMAGE = `${SITE_URL}/og-image.png`;

export const CITIES = ['Warszawa', 'Kraków', 'Wrocław', 'Gdańsk'];
