import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import PhoneIcon from '@mui/icons-material/Phone';
import EditIcon from '@mui/icons-material/Edit';
import { PATHS } from '../seo/routes';
import { PHONE_HREF } from '../seo/site';

export const MOBILE_CTA_HEIGHT = 64;

/** Przyklejony pasek „Zadzwoń / Napisz” widoczny tylko na telefonach i małych tabletach. */
export default function MobileCtaBar() {
  return (
    <Box
      component="nav"
      aria-label="Szybki kontakt"
      sx={{
        display: { xs: 'flex', md: 'none' },
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: 0,
        height: MOBILE_CTA_HEIGHT,
        gap: 1.5,
        alignItems: 'center',
        px: 2,
        bgcolor: 'background.paper',
        borderTop: '2px solid',
        borderColor: 'secondary.main',
        zIndex: (t) => t.zIndex.appBar,
        paddingBottom: 'env(safe-area-inset-bottom)',
        boxSizing: 'content-box',
      }}
    >
      <Button
        component="a"
        href={PHONE_HREF}
        variant="contained"
        color="secondary"
        startIcon={<PhoneIcon />}
        sx={{ flex: 1, py: 1.1, fontWeight: 700 }}
      >
        Zadzwoń
      </Button>
      <Button
        component={RouterLink}
        to={PATHS.online}
        variant="outlined"
        color="secondary"
        startIcon={<EditIcon />}
        sx={{ flex: 1, py: 1.1, fontWeight: 700 }}
      >
        Napisz
      </Button>
    </Box>
  );
}
