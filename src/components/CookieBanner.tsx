import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Slide from '@mui/material/Slide';

import { getCookieConsent, STORAGE_KEY, type CookieConsent } from '../lib/cookieConsent';

interface CookieBannerProps {
  onPolicyClick?: () => void;
  onChange?: (consent: CookieConsent) => void;
}

export default function CookieBanner({ onPolicyClick, onChange }: CookieBannerProps) {
  // Na serwerze (prerender) banner się nie renderuje – pojawia się dopiero w przeglądarce
  const [open, setOpen] = useState(
    () => typeof window !== 'undefined' && getCookieConsent() === null,
  );

  const save = (consent: CookieConsent) => {
    try {
      localStorage.setItem(STORAGE_KEY, consent);
    } catch {
      /* brak dostępu do localStorage – banner i tak się zamknie */
    }
    setOpen(false);
    onChange?.(consent);
  };

  const buttonSx = {
    minWidth: 190,
    color: 'secondary.main',
    borderColor: 'secondary.main',
    '&:hover': { borderColor: 'secondary.main', bgcolor: 'rgba(47,125,115,0.08)' },
  };

  return (
    <Slide direction="up" in={open} mountOnEnter unmountOnExit>
      <Paper
        role="dialog"
        aria-label="Zgoda na pliki cookies"
        elevation={8}
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: (t) => t.zIndex.snackbar,
          bgcolor: 'background.paper',
          color: 'text.primary',
          borderTop: '3px solid',
          borderColor: 'secondary.main',
          borderRadius: 0,
          px: { xs: 2, md: 4 },
          py: { xs: 2, md: 2.5 },
        }}
      >
        <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={{ xs: 2, md: 4 }}
            alignItems={{ md: 'center' }}
            justifyContent="space-between"
          >
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Ta strona korzysta z plików cookies. Niezbędne pliki zapewniają jej prawidłowe
              działanie. Za Twoją zgodą możemy używać również plików analitycznych.{' '}
              {onPolicyClick && (
                <Box
                  component="span"
                  onClick={onPolicyClick}
                  sx={{
                    color: 'secondary.main',
                    cursor: 'pointer',
                    '&:hover': { textDecoration: 'underline' },
                  }}
                >
                  Polityka prywatności
                </Box>
              )}
            </Typography>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ flexShrink: 0 }}>
              <Button variant="outlined" sx={buttonSx} onClick={() => save('necessary')}>
                Tylko niezbędne
              </Button>
              <Button variant="outlined" sx={buttonSx} onClick={() => save('all')}>
                Akceptuję wszystkie
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Paper>
    </Slide>
  );
}
