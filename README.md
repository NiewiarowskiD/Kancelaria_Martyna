# Martyna Obecna – szablon strony kancelarii (wersja demonstracyjna)

Jasna, nowoczesna strona kancelarii radcy prawnego: React 19 + TypeScript + Vite + MUI,
z prerenderingiem statycznego HTML (SEO) i opcjonalnym blogiem w Supabase.
Wszystkie teksty to lorem ipsum, a dane kontaktowe i firmowe to wartości przykładowe.

## Uruchomienie

```
npm install
npm run dev        # podgląd lokalny
npm run build      # build + prerender do katalogu dist/
npm run lint
npm run format
```

## Co zmienić przy wdrożeniu dla klienta

- `src/seo/site.ts`: nazwa, telefon, e-mail, adres strony (`VITE_SITE_URL`).
- `src/pages/*`: teksty (lorem ipsum), `src/seo/routes.ts`: tytuły i opisy SEO.
- `public/`: logo (`logo.svg`, `logo-mark.svg`), ikony, `og-image.png`, zdjęcia
  (`photo-*.webp`), portret (`portrait.webp`, obecnie ilustracja zastępcza).
- Strony prawne (`NotaPrawna`, `Rodo`, `Regulamin`): teksty wzorcowe z danymi zastępczymi.
  Przed publikacją trzeba je dostosować do rzeczywistego podmiotu.

## Wygląd

- Paleta i czcionki: `src/theme.ts` (czcionki: Playfair Display + DM Sans, pakiety `@fontsource`).
- Strona główna: zdjęcie na całą szerokość, potem przewijana opowieść (zdjęcie po lewej zmienia
  się wraz z opisami po prawej), karty specjalizacji i pasek wezwania do działania.
- O Kancelarii: zdjęcie jako główny element, opis na zdjęciu u dołu.

## Blog i formularz (opcjonalnie)

Bez konfiguracji blog pokazuje przykładowe wpisy. Aby podłączyć Supabase, utwórz plik `.env`:

```
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
VITE_SITE_URL=https://twoja-domena.pl
```
