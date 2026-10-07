import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { COLORS } from '../theme';
import { PATHS } from '../seo/routes';

interface CtaBandProps {
  title?: string;
  text?: string;
}

/** Jasny pasek z wezwaniem do działania, używany na końcu podstron. */
export default function CtaBand({
  title = 'Potrzebujesz pomocy prawnej?',
  text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
}: CtaBandProps) {
  return (
    <Box
      sx={{
        maxWidth: 1000,
        mx: 'auto',
        textAlign: 'center',
        borderRadius: '8px',
        px: { xs: 3, md: 8 },
        py: { xs: 5, md: 7 },
        background: `linear-gradient(135deg, ${COLORS.mint} 0%, #F3F9F7 100%)`,
        border: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Typography variant="h3" component="h2" sx={{ mb: 2 }}>
        {title}
      </Typography>
      <Typography
        variant="body1"
        sx={{ color: 'text.secondary', mb: 4, maxWidth: 620, mx: 'auto' }}
      >
        {text}
      </Typography>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
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
          to={PATHS.online}
          variant="outlined"
          color="secondary"
          size="large"
        >
          Porada online
        </Button>
      </Stack>
    </Box>
  );
}
