import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Seo from '../seo/Seo';
import { PAGE_META, PATHS } from '../seo/routes';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import ChatIcon from '@mui/icons-material/Chat';
import Link from '@mui/material/Link';
import { COLORS } from '../theme';

const options = [
  {
    icon: <VideoCameraFrontIcon sx={{ fontSize: 40, color: 'secondary.main' }} />,
    title: 'Konsultacja wideo',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    icon: <PhoneIcon sx={{ fontSize: 40, color: 'secondary.main' }} />,
    title: 'Konsultacja telefoniczna',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    icon: <ChatIcon sx={{ fontSize: 40, color: 'secondary.main' }} />,
    title: 'Porada tekstowa',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    icon: <EmailIcon sx={{ fontSize: 40, color: 'secondary.main' }} />,
    title: 'Analiza dokumentów',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
];

export default function OnlineAdvice() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);

    try {
      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-contact-email`;
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body.error || `Błąd serwera (${response.status})`);
      }

      setSubmitted(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Wystąpił nieoczekiwany błąd.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box sx={{ py: { xs: 6, md: 10 }, px: { xs: 2, md: 4 } }}>
      <Seo {...PAGE_META['/porady-online']} path="/porady-online" />
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
          <Typography variant="overline" sx={{ color: 'secondary.main', letterSpacing: '0.2em' }}>
            PORADY ONLINE
          </Typography>
          <Typography variant="h2" component="h1" sx={{ mt: 1, mb: 2 }}>
            Pomoc prawna bez wychodzenia z domu
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 700, mx: 'auto' }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </Typography>
        </Box>

        <Grid container spacing={4} sx={{ mb: 6 }}>
          {options.map((opt, i) => (
            <Grid key={i} size={{ xs: 12, sm: 6, md: 3 }}>
              <Card
                sx={{
                  height: '100%',
                  textAlign: 'center',
                  py: 4,
                  px: 2,
                  border: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <CardContent>
                  <Box sx={{ mb: 2 }}>{opt.icon}</Box>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    {opt.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {opt.desc}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card sx={{ bgcolor: COLORS.mint, color: 'text.primary', height: '100%' }}>
              <CardContent sx={{ p: { xs: 3, md: 5 } }}>
                <Typography variant="h4" sx={{ color: 'secondary.main', mb: 3 }}>
                  Jak to działa?
                </Typography>
                <Stack spacing={2.5}>
                  <Box>
                    <Typography variant="h6" sx={{ color: 'secondary.dark' }}>
                      1. Wyślij zapytanie
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing.
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ color: 'secondary.dark' }}>
                      2. Otrzymaj odpowiedź
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing.
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ color: 'secondary.dark' }}>
                      3. Spotkanie online
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing.
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ color: 'secondary.dark' }}>
                      4. Pisemna opinia
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing.
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Card sx={{ height: '100%', border: '1px solid', borderColor: 'divider' }}>
              <CardContent sx={{ p: { xs: 3, md: 5 } }}>
                <Typography variant="h4" sx={{ mb: 3, color: 'secondary.dark' }}>
                  Formularz kontaktowy
                </Typography>
                {submitted ? (
                  <Alert severity="success" sx={{ py: 3 }}>
                    <Typography variant="h6">Dziękujemy za wiadomość!</Typography>
                    <Typography variant="body2">
                      Skontaktujemy się z Tobą w ciągu 24 godzin.
                    </Typography>
                  </Alert>
                ) : (
                  <Box component="form" onSubmit={handleSubmit}>
                    {submitError && (
                      <Alert severity="error" sx={{ mb: 2 }}>
                        {submitError}
                      </Alert>
                    )}
                    <Stack spacing={2.5}>
                      <TextField
                        label="Imię i nazwisko"
                        required
                        fullWidth
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                      />
                      <TextField
                        label="Adres e-mail"
                        type="email"
                        required
                        fullWidth
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                      />
                      <TextField
                        label="Numer telefonu"
                        fullWidth
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      />
                      <TextField
                        label="Opis sprawy"
                        required
                        fullWidth
                        multiline
                        rows={4}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                      />

                      {/* DODANA KLAUZULA INFORMACYJNA RODO / REGULAMIN */}
                      <Typography
                        variant="caption"
                        sx={{ color: 'text.secondary', display: 'block', textAlign: 'left' }}
                      >
                        Wysyłając wiadomość, akceptujesz zasady kontaktu określone w naszym{' '}
                        <Link
                          component={RouterLink}
                          to={PATHS.rodo}
                          variant="caption"
                          sx={{
                            color: 'secondary.dark',
                            fontWeight: 600,
                            cursor: 'pointer',
                            verticalAlign: 'baseline',
                          }}
                        >
                          Regulaminie i Polityce prywatności
                        </Link>
                        . Twoje dane nie są zapisywane na stronie i trafiają bezpośrednio na
                        skrzynkę e-mail Kancelarii.
                      </Typography>

                      <Button
                        type="submit"
                        variant="contained"
                        color="secondary"
                        fullWidth
                        size="large"
                        disabled={submitting}
                        sx={{ color: 'primary.main', fontWeight: 600, py: 1.5 }}
                      >
                        {submitting ? <CircularProgress size={24} /> : 'Wyślij zapytanie'}
                      </Button>
                    </Stack>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
