import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import BalanceIcon from '@mui/icons-material/Balance';
import GavelIcon from '@mui/icons-material/Gavel';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import DescriptionIcon from '@mui/icons-material/Description';
import BusinessIcon from '@mui/icons-material/Business';
import WorkIcon from '@mui/icons-material/Work';
import Seo from '../seo/Seo';
import CtaBand from '../components/CtaBand';
import Reveal from '../components/Reveal';
import { COLORS } from '../theme';
import { legalServiceLd } from '../seo/jsonld';
import { PAGE_META, PATHS, specializationHash } from '../seo/routes';

const LOREM =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.';

const story = [
  {
    n: '01',
    title: 'Lorem ipsum dolor sit amet',
    text: LOREM,
    img: '/photo-statue.webp',
    alt: 'Figura Temidy z wagą',
  },
  {
    n: '02',
    title: 'Consectetur adipiscing elit',
    text: LOREM,
    img: '/photo-library.webp',
    alt: 'Wnętrze biblioteki prawniczej',
  },
  {
    n: '03',
    title: 'Sed do eiusmod tempor',
    text: LOREM,
    img: '/photo-book.webp',
    alt: 'Otwarta księga i pióro',
  },
];

const areas = [
  { title: 'Prawo cywilne', Icon: BalanceIcon },
  { title: 'Prawo karne', Icon: GavelIcon },
  { title: 'Prawo rodzinne', Icon: FamilyRestroomIcon },
  { title: 'Prawo spadkowe', Icon: DescriptionIcon },
  { title: 'Prawo gospodarcze', Icon: BusinessIcon },
  { title: 'Prawo pracy', Icon: WorkIcon },
];

/** Przewijana opowieść: po lewej zdjęcie zmienia się wraz z przewijaniem opisów po prawej. */
function StoryScroll() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.index));
        });
      },
      { rootMargin: '-45% 0px -45% 0px' },
    );
    refs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', px: { xs: 2, md: 4 }, py: { xs: 8, md: 12 } }}>
      <Grid container spacing={{ xs: 0, md: 8 }}>
        <Grid size={{ xs: 12, md: 6 }} sx={{ display: { xs: 'none', md: 'block' } }}>
          <Box
            sx={{
              position: 'sticky',
              top: 110,
              height: 'calc(100vh - 160px)',
              maxHeight: 640,
              borderRadius: '32px',
              overflow: 'hidden',
              boxShadow: '0 30px 60px rgba(20,35,43,0.15)',
            }}
          >
            {story.map((s, i) => (
              <Box
                key={s.n}
                component="img"
                src={s.img}
                alt={s.alt}
                loading={i === 0 ? 'eager' : 'lazy'}
                sx={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  opacity: active === i ? 1 : 0,
                  transform: active === i ? 'scale(1)' : 'scale(1.06)',
                  transition: 'opacity 0.8s ease, transform 1.2s ease',
                }}
              />
            ))}
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          {story.map((s, i) => (
            <Box
              key={s.n}
              ref={(el: HTMLDivElement | null) => {
                refs.current[i] = el;
              }}
              data-index={i}
              sx={{
                minHeight: { xs: 'auto', md: '80vh' },
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                mb: { xs: 8, md: 0 },
              }}
            >
              <Box
                component="img"
                src={s.img}
                alt={s.alt}
                loading="lazy"
                sx={{
                  display: { xs: 'block', md: 'none' },
                  width: '100%',
                  height: 240,
                  objectFit: 'cover',
                  borderRadius: '24px',
                  mb: 3,
                }}
              />
              <Reveal>
                <Typography
                  sx={{
                    fontFamily: 'inherit',
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    letterSpacing: '0.2em',
                    color: 'secondary.main',
                    mb: 1.5,
                  }}
                >
                  {s.n}
                </Typography>
                <Typography variant="h3" component="h2" sx={{ mb: 2 }}>
                  {s.title}
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3 }}>
                  {s.text}
                </Typography>
                <Button
                  component={Link}
                  to={PATHS.about}
                  color="secondary"
                  endIcon={<ArrowForwardIcon />}
                  sx={{ px: 0, '&:hover': { bgcolor: 'transparent', textDecoration: 'underline' } }}
                >
                  Dowiedz się więcej
                </Button>
              </Reveal>
            </Box>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
}

export default function Home() {
  return (
    <Box>
      <Seo {...PAGE_META['/']} path="/" jsonLd={legalServiceLd} />

      {/* HERO: jedno duże zdjęcie + wstęp */}
      <Box
        sx={{
          position: 'relative',
          minHeight: { xs: 'calc(100vh - 64px)', md: 'calc(100vh - 72px)' },
          display: 'flex',
          alignItems: 'center',
          backgroundImage: 'url(/photo-hero.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center right',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: {
              xs: 'linear-gradient(180deg, rgba(247,249,248,0.94) 0%, rgba(247,249,248,0.82) 60%, rgba(247,249,248,0.55) 100%)',
              md: 'linear-gradient(90deg, rgba(247,249,248,0.97) 0%, rgba(247,249,248,0.9) 38%, rgba(247,249,248,0.35) 68%, rgba(247,249,248,0) 100%)',
            },
          }}
        />
        <Box
          sx={{
            position: 'relative',
            maxWidth: 1200,
            width: '100%',
            mx: 'auto',
            px: { xs: 2, md: 4 },
          }}
        >
          <Box sx={{ maxWidth: 620 }}>
            <Typography variant="overline" sx={{ color: 'secondary.main' }}>
              Kancelaria Radcy Prawnego
            </Typography>
            <Typography variant="h1" sx={{ mt: 1, mb: 2.5 }}>
              Radca prawny Martyna Obecna
            </Typography>
            <Typography
              variant="h5"
              component="p"
              sx={{ color: 'secondary.dark', mb: 2.5, fontWeight: 500 }}
            >
              Lorem ipsum dolor sit amet
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4 }}>
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
                to={PATHS.about}
                variant="outlined"
                color="primary"
                size="large"
              >
                Poznaj kancelarię
              </Button>
            </Stack>
          </Box>
        </Box>
        <Box
          aria-hidden
          sx={{
            position: 'absolute',
            bottom: 24,
            left: '50%',
            transform: 'translateX(-50%)',
            color: 'secondary.main',
            animation: 'bounce 2s infinite',
            '@keyframes bounce': {
              '0%, 100%': { transform: 'translate(-50%, 0)' },
              '50%': { transform: 'translate(-50%, 10px)' },
            },
          }}
        >
          <KeyboardArrowDownIcon sx={{ fontSize: 40 }} />
        </Box>
      </Box>

      {/* PRZEWIJANA OPOWIEŚĆ */}
      <StoryScroll />

      {/* OBSZARY */}
      <Box sx={{ bgcolor: COLORS.mist, py: { xs: 8, md: 12 }, px: { xs: 2, md: 4 } }}>
        <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
          <Reveal>
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <Typography variant="overline" sx={{ color: 'secondary.main' }}>
                Specjalizacje
              </Typography>
              <Typography variant="h2" component="h2" sx={{ mt: 1 }}>
                W czym pomagamy
              </Typography>
            </Box>
          </Reveal>
          <Grid container spacing={3}>
            {areas.map(({ title, Icon }, i) => (
              <Grid key={title} size={{ xs: 12, sm: 6, md: 4 }}>
                <Reveal delay={i * 70}>
                  <Box
                    component={Link}
                    to={{ pathname: PATHS.specializations, hash: specializationHash(i) }}
                    sx={{
                      display: 'block',
                      height: '100%',
                      textDecoration: 'none',
                      color: 'inherit',
                      bgcolor: 'background.paper',
                      borderRadius: '24px',
                      p: 4,
                      border: '1px solid',
                      borderColor: 'divider',
                      transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                      '&:hover': {
                        transform: 'translateY(-6px)',
                        boxShadow: '0 20px 40px rgba(47,125,115,0.14)',
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 56,
                        height: 56,
                        borderRadius: '16px',
                        bgcolor: 'rgba(47,125,115,0.10)',
                        display: 'grid',
                        placeItems: 'center',
                        mb: 2.5,
                      }}
                    >
                      <Icon sx={{ color: 'secondary.main', fontSize: 30 }} />
                    </Box>
                    <Typography variant="h5" component="h3" sx={{ mb: 1 }}>
                      {title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod.
                    </Typography>
                  </Box>
                </Reveal>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>

      <Box sx={{ py: { xs: 8, md: 12 }, px: { xs: 2, md: 4 } }}>
        <Reveal>
          <CtaBand />
        </Reveal>
      </Box>
    </Box>
  );
}
