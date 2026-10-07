import { lazy, Suspense, useEffect } from 'react';
import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import theme from './theme';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import OnlineAdvice from './pages/OnlineAdvice';
import Blog from './pages/Blog';
import MobileCtaBar, { MOBILE_CTA_HEIGHT } from './components/MobileCtaBar';
import Specializations from './pages/Specializations';
import CookieBanner from './components/CookieBanner';
import Navbar from './components/Navbar';
import Price from './pages/PriceList';
import Rodo from './pages/Rodo';
import Kontakt from './pages/Kontakt';
import NotaPrawna from './pages/NotaPrawna';
import Regulamin from './pages/Regulamin';
import Seo from './seo/Seo';

// Panel admina (wraz z edytorem TipTap) ładowany dopiero po wejściu na /admin
const Admin = lazy(() => import('./pages/Admin'));
import { Link } from 'react-router-dom';
import { PATHS } from './seo/routes';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);
  return null;
}

function SkipLink() {
  const skip = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const main = document.getElementById('main-content');
    main?.focus();
    main?.scrollIntoView();
  };
  return (
    <Box
      component="a"
      href="#main-content"
      onClick={skip}
      sx={{
        position: 'fixed',
        top: 8,
        left: 8,
        zIndex: (t) => t.zIndex.tooltip + 1,
        px: 2,
        py: 1,
        bgcolor: 'secondary.main',
        color: 'primary.main',
        fontWeight: 700,
        borderRadius: 1,
        textDecoration: 'none',
        transform: 'translateY(-200%)',
        '&:focus': { transform: 'translateY(0)' },
      }}
    >
      Przejdź do treści
    </Box>
  );
}

function Layout() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        bgcolor: 'background.default',
        pb: { xs: `${MOBILE_CTA_HEIGHT}px`, md: 0 },
      }}
    >
      <SkipLink />
      <ScrollToTop />
      <Navbar />
      <Box component="main" id="main-content" tabIndex={-1} sx={{ flexGrow: 1, outline: 'none' }}>
        <Outlet />
      </Box>
      <Footer />
      <MobileCtaBar />
    </Box>
  );
}

function NotFound() {
  return (
    <Box sx={{ py: 12, px: 2, textAlign: 'center' }}>
      <Seo title="Nie znaleziono strony" description="Nie znaleziono strony." path="/404" noindex />
      <Typography variant="h2" component="h1" sx={{ mb: 2 }}>
        Nie znaleziono strony
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        Adres, który otworzyłeś, nie istnieje lub został zmieniony.
      </Typography>
      <Button component={Link} to={PATHS.home} variant="outlined" color="secondary">
        Wróć na stronę główną
      </Button>
    </Box>
  );
}

export function AppRoutes() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route element={<Layout />}>
          <Route path={PATHS.home} element={<Home />} />
          <Route path={PATHS.about} element={<About />} />
          <Route path={PATHS.specializations} element={<Specializations />} />
          <Route path={PATHS.price} element={<Price />} />
          <Route path={PATHS.online} element={<OnlineAdvice />} />
          <Route path={PATHS.blog} element={<Blog />} />
          <Route path={PATHS.contact} element={<Kontakt />} />
          <Route path={`${PATHS.blog}/:slug`} element={<Blog />} />
          <Route path={PATHS.rodo} element={<Rodo />} />
          <Route path={PATHS.notaPrawna} element={<NotaPrawna />} />
          <Route path={PATHS.regulamin} element={<Regulamin />} />
          <Route
            path={PATHS.admin}
            element={
              <>
                <Seo
                  title="Panel administracyjny"
                  description="Panel administracyjny"
                  path={PATHS.admin}
                  noindex
                />
                <Suspense fallback={null}>
                  <Admin />
                </Suspense>
              </>
            }
          />
          <Route path="/rodo" element={<Navigate to={PATHS.rodo} replace />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <CookieBanner />
    </ThemeProvider>
  );
}

export default AppRoutes;
