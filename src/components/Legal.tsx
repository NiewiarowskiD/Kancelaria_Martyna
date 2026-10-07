import type { ReactNode } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Seo from '../seo/Seo';
import { PAGE_META } from '../seo/routes';

interface LegalPageProps {
  path: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
}

/** Wspólny układ stron prawnych (nota prawna, polityka prywatności, regulamin). */
export function LegalPage({ path, title, subtitle, children }: LegalPageProps) {
  return (
    <Box sx={{ py: { xs: 6, md: 10 }, px: { xs: 2, md: 4 } }}>
      <Seo {...PAGE_META[path]} path={path} />
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
        <Typography
          variant="overline"
          component="h1"
          sx={{
            color: 'secondary.main',
            letterSpacing: '0.2em',
            display: 'block',
            mb: subtitle ? 0.5 : 2,
          }}
        >
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
            {subtitle}
          </Typography>
        )}
        <Card
          sx={{
            bgcolor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
            p: { xs: 3, md: 5 },
          }}
        >
          <CardContent
            sx={{
              '& .MuiTypography-root': { mb: 2 },
              '& a': { color: 'secondary.dark', textUnderlineOffset: '3px' },
            }}
          >
            {children}
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

interface LegalSectionProps {
  heading: string;
  id?: string;
  first?: boolean;
  children: ReactNode;
}

/** Sekcja z nagłówkiem H2 i linią oddzielającą od poprzedniej. */
export function LegalSection({ heading, id, first, children }: LegalSectionProps) {
  return (
    <>
      {!first && <Divider sx={{ my: 4 }} />}
      <Typography
        variant="h5"
        component="h2"
        id={id}
        sx={{ fontWeight: 600, color: 'text.primary', mb: 2, scrollMarginTop: 100 }}
      >
        {heading}
      </Typography>
      {children}
    </>
  );
}

export function LegalP({ children }: { children: ReactNode }) {
  return (
    <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
      {children}
    </Typography>
  );
}

const listSx = {
  color: 'text.secondary',
  pl: 3,
  mb: 2,
  lineHeight: 1.8,
  '& li': { mb: 1, textAlign: 'left' },
  '& ul, & ol': { mt: 1, mb: 0 },
  '& ul ul, & ol ul': { listStyleType: '"– "' },
  '& li ul': { listStyleType: '"– "' },
};

/** Lista punktowana (`ordered` – numerowana). Zagnieżdżone listy punktowane mają myślniki. */
export function LegalList({
  ordered,
  dash,
  children,
}: {
  ordered?: boolean;
  dash?: boolean;
  children: ReactNode;
}) {
  return (
    <Box
      component={ordered ? 'ol' : 'ul'}
      sx={dash ? { ...listSx, listStyleType: '"– "' } : listSx}
    >
      {children}
    </Box>
  );
}

/** Dane kontaktowe wpisane w dokumentach prawnych (zgodnie z przekazanymi tekstami). */
export const LEGAL_EMAIL = 'kontakt@example.com';

export function LegalEmail() {
  return <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>;
}

export function LegalPhone() {
  return <a href="tel:+48000000000">+48 000 000 000</a>;
}
