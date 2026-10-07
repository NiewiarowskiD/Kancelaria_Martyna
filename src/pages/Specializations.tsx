import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonBase from '@mui/material/ButtonBase';
import Fade from '@mui/material/Fade';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import BusinessIcon from '@mui/icons-material/Business';
import GavelIcon from '@mui/icons-material/Gavel';
import WorkIcon from '@mui/icons-material/Work';
import DescriptionIcon from '@mui/icons-material/Description';
import BalanceIcon from '@mui/icons-material/Balance';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import type { SvgIconComponent } from '@mui/icons-material';
import Seo from '../seo/Seo';
import CtaBand from '../components/CtaBand';
import { COLORS } from '../theme';
import { breadcrumbLd } from '../seo/jsonld';
import { PAGE_META, PATHS, specializationHash } from '../seo/routes';

interface Specialization {
  title: string;
  Icon: SvgIconComponent;
  description: string;
  bullets: string[];
  subItems: { title: string; text: string }[];
}

const LOREM =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';

const bullets = [
  'Lorem ipsum dolor sit amet',
  'Consectetur adipiscing elit',
  'Sed do eiusmod tempor incididunt',
  'Ut labore et dolore magna aliqua',
];

const subItems = [
  {
    title: 'Lorem ipsum dolor',
    text: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    title: 'Consectetur elit',
    text: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
  },
  {
    title: 'Sed do eiusmod',
    text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse.',
  },
];

const make = (title: string, Icon: SvgIconComponent): Specialization => ({
  title,
  Icon,
  description: LOREM,
  bullets,
  subItems,
});

const specializations: Specialization[] = [
  make('Prawo cywilne', BalanceIcon),
  make('Prawo karne', GavelIcon),
  make('Prawo rodzinne', FamilyRestroomIcon),
  make('Prawo spadkowe', DescriptionIcon),
  make('Prawo gospodarcze', BusinessIcon),
  make('Prawo pracy', WorkIcon),
  make('Upadłość konsumencka', AccountBalanceWalletIcon),
];

function indexFromHash(hash: string): number {
  if (!hash.startsWith('#spec-')) return 0;
  const index = parseInt(hash.replace('#spec-', ''), 10);
  return Number.isNaN(index) || index < 0 || index >= specializations.length ? 0 : index;
}

export default function Specializations() {
  const { hash } = useLocation();
  const navigate = useNavigate();
  const active = indexFromHash(hash);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [shown, setShown] = useState(true);

  // Krótkie „mignięcie” panelu przy zmianie dziedziny
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setShown(false);
    const t = setTimeout(() => setShown(true), 30);
    // Na telefonie przewija poziomą listę tak, by aktywna „pigułka” była widoczna
    tabRefs.current[active]?.scrollIntoView({ inline: 'center', block: 'nearest' });
    return () => clearTimeout(t);
  }, [active]);

  const select = (index: number) => {
    navigate(
      { pathname: PATHS.specializations, hash: specializationHash(index) },
      { replace: true, preventScrollReset: true },
    );
  };

  const onKeyDown = (e: KeyboardEvent, index: number) => {
    const last = specializations.length - 1;
    let next = index;
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = index === last ? 0 : index + 1;
    else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = index === 0 ? last : index - 1;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = last;
    else return;
    e.preventDefault();
    select(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <Box sx={{ py: { xs: 6, md: 10 }, px: { xs: 2, md: 4 } }}>
      <Seo
        {...PAGE_META['/specjalizacje']}
        path={PATHS.specializations}
        jsonLd={breadcrumbLd([
          { name: 'Strona główna', path: '/' },
          { name: 'Specjalizacje', path: PATHS.specializations },
        ])}
      />
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
        <Box sx={{ mb: { xs: 4, md: 6 } }}>
          <Typography variant="overline" sx={{ color: 'secondary.main' }}>
            SPECJALIZACJE
          </Typography>
          <Typography variant="h2" component="h1" sx={{ mt: 1, mb: 2 }}>
            Obszary praktyki
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 720 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </Typography>
        </Box>

        <Grid container spacing={{ xs: 3, md: 5 }}>
          {/* Lista dziedzin: pionowa na komputerze, przewijane „pigułki” na telefonie */}
          <Grid size={{ xs: 12, md: 4, lg: 3.5 }}>
            <Box
              role="tablist"
              aria-label="Specjalizacje"
              aria-orientation="vertical"
              sx={{
                display: 'flex',
                flexDirection: { xs: 'row', md: 'column' },
                gap: { xs: 1, md: 0.75 },
                overflowX: { xs: 'auto', md: 'visible' },
                pb: { xs: 1, md: 0 },
                position: { md: 'sticky' },
                top: { md: 100 },
                scrollbarWidth: 'none',
                '&::-webkit-scrollbar': { display: 'none' },
              }}
            >
              {specializations.map(({ title, Icon }, i) => {
                const on = i === active;
                return (
                  <ButtonBase
                    key={title}
                    ref={(el) => {
                      tabRefs.current[i] = el;
                    }}
                    role="tab"
                    id={`spec-tab-${i}`}
                    aria-selected={on}
                    aria-controls={`spec-panel-${i}`}
                    tabIndex={on ? 0 : -1}
                    onClick={() => select(i)}
                    onKeyDown={(e) => onKeyDown(e, i)}
                    sx={{
                      flexShrink: 0,
                      justifyContent: 'flex-start',
                      gap: 1.5,
                      textAlign: 'left',
                      fontFamily: 'inherit',
                      fontSize: '1rem',
                      fontWeight: 600,
                      whiteSpace: 'nowrap',
                      px: 2.2,
                      py: { xs: 1.1, md: 1.6 },
                      borderRadius: { xs: '999px', md: '16px' },
                      color: on ? 'text.primary' : 'text.secondary',
                      bgcolor: on ? 'background.paper' : 'transparent',
                      border: '1px solid',
                      borderColor: on ? 'divider' : 'transparent',
                      boxShadow: on ? '0 10px 28px rgba(20,35,43,0.08)' : 'none',
                      transition: 'all 0.25s ease',
                      '&:hover': { bgcolor: on ? 'background.paper' : 'rgba(47,125,115,0.07)' },
                    }}
                  >
                    <Icon
                      sx={{
                        fontSize: 22,
                        color: on ? 'secondary.main' : 'text.secondary',
                        display: { xs: 'none', md: 'block' },
                      }}
                    />
                    <Box component="span" sx={{ flex: 1 }}>
                      {title}
                    </Box>
                    <ArrowForwardIcon
                      sx={{
                        fontSize: 18,
                        color: 'secondary.main',
                        opacity: on ? 1 : 0,
                        display: { xs: 'none', md: 'block' },
                      }}
                    />
                  </ButtonBase>
                );
              })}
            </Box>
          </Grid>

          {/* Panel szczegółów. Wszystkie panele są w HTML (ważne dla SEO), widoczny jest tylko aktywny. */}
          <Grid size={{ xs: 12, md: 8, lg: 8.5 }}>
            {specializations.map(
              ({ title, Icon, description, bullets: items, subItems: subs }, i) => (
                <Box
                  key={title}
                  role="tabpanel"
                  id={`spec-panel-${i}`}
                  aria-labelledby={`spec-tab-${i}`}
                  hidden={i !== active}
                >
                  {i === active && (
                    <Fade in={shown} timeout={350}>
                      <Box
                        sx={{
                          bgcolor: 'background.paper',
                          border: '1px solid',
                          borderColor: 'divider',
                          borderRadius: '28px',
                          p: { xs: 3, md: 5 },
                          boxShadow: '0 20px 50px rgba(20,35,43,0.06)',
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2.5 }}>
                          <Box
                            sx={{
                              width: 56,
                              height: 56,
                              borderRadius: '16px',
                              bgcolor: 'rgba(47,125,115,0.10)',
                              display: 'grid',
                              placeItems: 'center',
                              flexShrink: 0,
                            }}
                          >
                            <Icon sx={{ color: 'secondary.main', fontSize: 30 }} />
                          </Box>
                          <Typography variant="h3" component="h2">
                            {title}
                          </Typography>
                        </Box>
                        <Typography
                          variant="body1"
                          sx={{ color: 'text.secondary', mb: 2.5, maxWidth: 720 }}
                        >
                          {description}
                        </Typography>
                        <Box
                          component="ul"
                          sx={{
                            m: 0,
                            mb: 3,
                            p: 0,
                            listStyle: 'none',
                            display: 'grid',
                            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                            gap: 1.2,
                          }}
                        >
                          {items.map((b) => (
                            <Box
                              key={b}
                              component="li"
                              sx={{
                                display: 'flex',
                                gap: 1.2,
                                alignItems: 'center',
                                color: 'text.secondary',
                                '&::before': {
                                  content: '""',
                                  width: 8,
                                  height: 8,
                                  borderRadius: '50%',
                                  bgcolor: 'secondary.main',
                                  flexShrink: 0,
                                },
                              }}
                            >
                              {b}
                            </Box>
                          ))}
                        </Box>
                        <Grid container spacing={2}>
                          {subs.map((s) => (
                            <Grid key={s.title} size={{ xs: 12, sm: 4 }}>
                              <Box
                                sx={{
                                  bgcolor: COLORS.mist,
                                  borderRadius: '20px',
                                  p: 2.5,
                                  height: '100%',
                                }}
                              >
                                <Typography variant="h6" component="h3" sx={{ mb: 1 }}>
                                  {s.title}
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                  {s.text}
                                </Typography>
                              </Box>
                            </Grid>
                          ))}
                        </Grid>
                        <Button
                          component={Link}
                          to={PATHS.contact}
                          variant="contained"
                          color="secondary"
                          size="large"
                          sx={{ mt: 4 }}
                        >
                          Umów konsultację
                        </Button>
                      </Box>
                    </Fade>
                  )}
                  {i !== active && (
                    <Box component="div" sx={{ display: 'none' }}>
                      <h2>{title}</h2>
                      <p>{description}</p>
                    </Box>
                  )}
                </Box>
              ),
            )}
          </Grid>
        </Grid>

        <Box sx={{ mt: { xs: 8, md: 12 } }}>
          <CtaBand title="Skontaktuj się z nami" />
        </Box>
      </Box>
    </Box>
  );
}
