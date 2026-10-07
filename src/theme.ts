import { createTheme, responsiveFontSizes } from '@mui/material/styles';

// Czcionki (samodzielnie hostowane przez @fontsource, patrz src/main.tsx).
// Aby zmienić parę czcionek, podmień poniższe stałe i importy w main.tsx.
export const HEADING_FONT = '"Playfair Display", Georgia, "Times New Roman", serif';
export const BODY_FONT = '"DM Sans", "Helvetica Neue", Arial, sans-serif';

// Paleta: jasna, świeża („szałwia i atrament”).
export const COLORS = {
  ink: '#14232B',
  inkSoft: '#52646B',
  accent: '#2F7D73',
  accentDark: '#1F5C54',
  accentLight: '#5FA89D',
  mint: '#E3F1ED',
  mist: '#EEF4F2',
  bg: '#F7F9F8',
  line: '#DCE6E2',
};

let theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: COLORS.ink,
      light: '#34464F',
      dark: '#0B151A',
      contrastText: '#ffffff',
    },
    secondary: {
      main: COLORS.accent,
      light: COLORS.accentLight,
      dark: COLORS.accentDark,
      contrastText: '#ffffff',
    },
    background: {
      default: COLORS.bg,
      paper: '#ffffff',
    },
    text: {
      primary: COLORS.ink,
      secondary: COLORS.inkSoft,
    },
    divider: COLORS.line,
  },
  shape: { borderRadius: 14 },
  typography: {
    fontFamily: BODY_FONT,
    h1: { fontFamily: HEADING_FONT, fontWeight: 600, fontSize: '3rem', letterSpacing: '-0.02em' },
    h2: {
      fontFamily: HEADING_FONT,
      fontWeight: 600,
      fontSize: '2.4rem',
      letterSpacing: '-0.015em',
    },
    h3: { fontFamily: HEADING_FONT, fontWeight: 600, fontSize: '1.9rem', letterSpacing: '-0.01em' },
    h4: { fontFamily: HEADING_FONT, fontWeight: 600, fontSize: '1.6rem' },
    h5: { fontFamily: HEADING_FONT, fontWeight: 600, fontSize: '1.35rem' },
    h6: { fontFamily: HEADING_FONT, fontWeight: 600, fontSize: '1.2rem' },
    body1: { fontFamily: BODY_FONT, fontSize: '1.1rem', lineHeight: 1.7 },
    body2: { fontFamily: BODY_FONT, fontSize: '1rem', lineHeight: 1.65 },
    button: {
      fontFamily: BODY_FONT,
      textTransform: 'none',
      fontWeight: 600,
      letterSpacing: '0.01em',
    },
    caption: { fontFamily: BODY_FONT },
    overline: { fontFamily: BODY_FONT, fontWeight: 600, letterSpacing: '0.16em' },
  },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { borderRadius: 999, padding: '11px 28px' },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          boxShadow: '0 10px 40px rgba(20,35,43,0.06)',
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: { fontFamily: BODY_FONT, fontSize: '1.1rem' },
        html: { scrollBehavior: 'smooth' },
        // Widoczny fokus dla nawigacji klawiaturą
        ':focus-visible': {
          outline: `2px solid ${COLORS.ink}`,
          outlineOffset: '2px',
          boxShadow: `0 0 0 4px ${COLORS.accentLight}`,
        },
      },
    },
    MuiAppBar: {
      defaultProps: { elevation: 0 },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontFamily: BODY_FONT, fontWeight: 500 },
      },
    },
  },
});

// Nagłówki skalują się w dół na mniejszych ekranach
theme = responsiveFontSizes(theme, { factor: 2.5 });

export default theme;
