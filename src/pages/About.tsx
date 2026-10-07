import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import VerifiedIcon from '@mui/icons-material/Verified';
import Seo from '../seo/Seo';
import CtaBand from '../components/CtaBand';
import Reveal from '../components/Reveal';
import { PAGE_META, PATHS } from '../seo/routes';

const LOREM =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';

const facts = [
  { Icon: SchoolIcon, title: 'Wykształcenie', text: LOREM },
  { Icon: WorkIcon, title: 'Praktyka zawodowa', text: LOREM },
  { Icon: VerifiedIcon, title: 'Uprawnienia', text: LOREM },
];

export default function About() {
  return (
    <Box>
      <Seo {...PAGE_META['/o-kancelarii']} path="/o-kancelarii" />

      {/* Zdjęcie jako główny element, opis na zdjęciu u dołu */}
      <Box
        sx={{
          position: 'relative',
          height: { xs: 'calc(100vh - 64px)', md: 'calc(100vh - 72px)' },
          minHeight: 560,
          maxHeight: 920,
          overflow: 'hidden',
          bgcolor: '#CFE5DF',
        }}
      >
        <Box
          component="img"
          src="/portrait.webp"
          alt="Martyna Obecna, radca prawny"
          sx={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: { xs: '66% center', md: 'center' },
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(20,35,43,0) 35%, rgba(20,35,43,0.55) 72%, rgba(20,35,43,0.82) 100%)',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            px: { xs: 2, md: 4 },
            pb: { xs: 4, md: 7 },
          }}
        >
          <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
            <Box sx={{ maxWidth: 720, color: '#fff' }}>
              <Typography variant="overline" sx={{ color: '#BFE3DB' }}>
                O Kancelarii
              </Typography>
              <Typography variant="h1" sx={{ color: '#fff', mt: 1, mb: 2 }}>
                Martyna Obecna
              </Typography>
              <Typography
                variant="h5"
                component="p"
                sx={{ color: '#E3F1ED', fontWeight: 500, mb: 2 }}
              >
                Radca prawny
              </Typography>
              <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.88)', mb: 3 }}>
                {LOREM}
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Button
                  component={Link}
                  to={PATHS.contact}
                  variant="contained"
                  color="secondary"
                  size="large"
                >
                  Umów konsultację
                </Button>
                <Button
                  component={Link}
                  to={PATHS.specializations}
                  variant="outlined"
                  size="large"
                  sx={{
                    color: '#fff',
                    borderColor: 'rgba(255,255,255,0.7)',
                    '&:hover': { borderColor: '#fff', bgcolor: 'rgba(255,255,255,0.1)' },
                  }}
                >
                  Specjalizacje
                </Button>
              </Stack>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box sx={{ maxWidth: 1200, mx: 'auto', px: { xs: 2, md: 4 }, py: { xs: 8, md: 12 } }}>
        <Grid container spacing={4}>
          {facts.map(({ Icon, title, text }, i) => (
            <Grid key={title} size={{ xs: 12, md: 4 }}>
              <Reveal delay={i * 90}>
                <Box
                  sx={{
                    height: '100%',
                    p: 4,
                    borderRadius: '24px',
                    bgcolor: 'background.paper',
                    border: '1px solid',
                    borderColor: 'divider',
                  }}
                >
                  <Box
                    sx={{
                      width: 52,
                      height: 52,
                      borderRadius: '16px',
                      bgcolor: 'rgba(47,125,115,0.10)',
                      display: 'grid',
                      placeItems: 'center',
                      mb: 2.5,
                    }}
                  >
                    <Icon sx={{ color: 'secondary.main' }} />
                  </Box>
                  <Typography variant="h5" component="h2" sx={{ mb: 1.5 }}>
                    {title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {text}
                  </Typography>
                </Box>
              </Reveal>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: { xs: 8, md: 12 } }}>
          <Reveal>
            <Typography variant="h3" component="h2" sx={{ mb: 2 }}>
              Zakres pomocy prawnej
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 820, mb: 2 }}>
              {LOREM}
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 820 }}>
              {LOREM}
            </Typography>
          </Reveal>
        </Box>

        <Box sx={{ mt: { xs: 8, md: 12 } }}>
          <Reveal>
            <CtaBand />
          </Reveal>
        </Box>
      </Box>
    </Box>
  );
}
