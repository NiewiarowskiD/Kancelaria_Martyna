import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { COLORS } from '../theme';
import { PATHS } from '../seo/routes';
import { EMAIL, PHONE, PHONE_HREF, SITE_NAME } from '../seo/site';

const linkSx = {
  color: 'text.secondary',
  textDecoration: 'none',
  '&:hover': { color: 'secondary.dark', textDecoration: 'underline' },
};

const headingSx = { color: 'text.primary', mb: 2 };

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: COLORS.mist,
        color: 'text.primary',
        borderTop: '1px solid',
        borderColor: 'divider',
        py: { xs: 5, md: 8 },
        px: { xs: 2, md: 4 },
        '& .MuiTypography-body2': { fontSize: '0.95rem' },
      }}
    >
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
        <Grid container spacing={5}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Box
              component="img"
              src="/logo.svg"
              alt="Martyna Obecna – Kancelaria Radcy Prawnego"
              sx={{ width: 260, maxWidth: '100%', height: 'auto', display: 'block', mb: 2 }}
            />
            <Typography variant="body2" sx={{ color: 'text.secondary', maxWidth: 340 }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore.
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography variant="h6" sx={headingSx}>
              Kontakt
            </Typography>
            <Stack spacing={1.5}>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <PhoneIcon sx={{ color: 'secondary.main', fontSize: 20 }} />
                <Typography variant="body2" component="a" href={PHONE_HREF} sx={linkSx}>
                  {PHONE}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <EmailIcon sx={{ color: 'secondary.main', fontSize: 20 }} />
                <Typography variant="body2" component="a" href={`mailto:${EMAIL}`} sx={linkSx}>
                  {EMAIL}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1.5} alignItems="flex-start">
                <LocationOnIcon sx={{ color: 'secondary.main', fontSize: 20, mt: 0.2 }} />
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Lorem ipsum dolor sit amet
                  <br />
                  Porady prawne online dla Klientów z całej Polski
                </Typography>
              </Stack>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 2 }}>
            <Typography variant="h6" sx={headingSx}>
              Godziny pracy
            </Typography>
            <Stack spacing={1}>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <AccessTimeIcon sx={{ color: 'secondary.main', fontSize: 20 }} />
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Pon.–pt.: 9:00–17:00
                </Typography>
              </Stack>
              <Typography variant="body2" sx={{ color: 'text.secondary', pl: 4.5 }}>
                Sob.–nd.: nieczynne
              </Typography>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography variant="h6" sx={headingSx}>
              Informacje
            </Typography>
            <Stack spacing={1.2}>
              <Typography variant="body2" component={Link} to={PATHS.notaPrawna} sx={linkSx}>
                Nota prawna
              </Typography>
              <Typography variant="body2" component={Link} to={PATHS.rodo} sx={linkSx}>
                Polityka prywatności
              </Typography>
              <Typography variant="body2" component={Link} to={PATHS.regulamin} sx={linkSx}>
                Regulamin serwisu i świadczenia porad prawnych online (e-porad)
              </Typography>
            </Stack>
          </Grid>
        </Grid>

        <Box
          sx={{
            mt: 5,
            pt: 2.5,
            borderTop: '1px solid',
            borderColor: 'divider',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 1,
          }}
        >
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            © {new Date().getFullYear()} {SITE_NAME}. Wszelkie prawa zastrzeżone.
          </Typography>
          <Link
            to={PATHS.admin}
            aria-label="Panel administracyjny"
            rel="nofollow"
            style={{ display: 'inline-flex' }}
          >
            <AdminPanelSettingsIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
