import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Collapse from '@mui/material/Collapse';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import { MOBILE_CTA_HEIGHT } from './MobileCtaBar';
import { COLORS } from '../theme';
import { sendContact } from '../lib/sendContact';
import { PATHS } from '../seo/routes';
import { OWNER_NAME, PHONE, PHONE_HREF } from '../seo/site';

type Step = 'message' | 'contact' | 'sending' | 'sent';

interface ChatMessage {
  id: number;
  from: 'bot' | 'user';
  text: string;
}

const GREETING =
  'Dzień dobry! Opisz tutaj krótko swój problem prawny. Po wiadomości poproszę o numer telefonu i adres e-mail, aby kancelaria mogła się z Tobą skontaktować.';

const QUICK_REPLIES = [
  'Chcę umówić poradę prawną',
  'Mam pytanie o cennik',
  'Chcę omówić swoją sprawę',
];

const TEASER_KEY = 'chat-teaser-dismissed';

export default function ChatWidget() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [teaser, setTeaser] = useState(false);
  const [step, setStep] = useState<Step>('message');
  const [messages, setMessages] = useState<ChatMessage[]>([{ id: 0, from: 'bot', text: GREETING }]);
  const [draft, setDraft] = useState('');
  const [userMessage, setUserMessage] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState(''); // pułapka na boty (honeypot)
  const [error, setError] = useState<string | null>(null);
  const idRef = useRef(1);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);

  const add = (from: ChatMessage['from'], text: string) =>
    setMessages((m) => [...m, { id: idRef.current++, from, text }]);

  // Zachęta wyświetlana raz na sesję po kilku sekundach
  useEffect(() => {
    try {
      if (sessionStorage.getItem(TEASER_KEY)) return;
    } catch {
      /* brak dostępu do sessionStorage */
    }
    const t = setTimeout(() => setTeaser(true), 6000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'end' });
  }, [messages, step, open]);

  useEffect(() => {
    if (open && step === 'message') inputRef.current?.focus();
  }, [open, step]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        launcherRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  if (pathname.startsWith(PATHS.admin)) return null;

  const dismissTeaser = () => {
    setTeaser(false);
    try {
      sessionStorage.setItem(TEASER_KEY, '1');
    } catch {
      /* ignoruj */
    }
  };

  const openChat = () => {
    dismissTeaser();
    setOpen(true);
  };

  const submitMessage = (text: string) => {
    const value = text.trim();
    if (!value || step !== 'message') return;
    add('user', value);
    setUserMessage(value);
    setDraft('');
    setStep('contact');
    setTimeout(
      () =>
        add(
          'bot',
          'Dziękuję za wiadomość. Zostaw proszę swoje imię, numer telefonu oraz adres e-mail, a kancelaria skontaktuje się z Tobą.',
        ),
      450,
    );
  };

  const submitContact = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    if (website) return; // bot
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    if (trimmedName.length < 2) return setError('Podaj imię.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmedEmail))
      return setError('Podaj poprawny adres e-mail.');
    const trimmedPhone = phone.trim();
    if (trimmedPhone.replace(/\D/g, '').length < 9) return setError('Podaj poprawny numer telefonu.');
    if (!consent) return setError('Zaznacz zgodę na kontakt w tej sprawie.');
    setStep('sending');
    try {
      await sendContact({
        name: trimmedName,
        email: trimmedEmail,
        phone: trimmedPhone,
        message: `[Wiadomość z czatu na stronie]\n\n${userMessage}`,
      });
      setStep('sent');
      add(
        'bot',
        `Wiadomość wysłana. Skontaktujemy się z Tobą telefonicznie lub e-mailowo, zwykle w ciągu 24 godzin. Jeśli sprawa jest pilna, zadzwoń: ${PHONE}.`,
      );
    } catch {
      setStep('contact');
      setError('Nie udało się wysłać wiadomości. Spróbuj ponownie lub zadzwoń.');
    }
  };

  const reset = () => {
    setMessages([{ id: idRef.current++, from: 'bot', text: GREETING }]);
    setStep('message');
    setUserMessage('');
    setDraft('');
    setError(null);
    setConsent(false);
  };

  const bottomOffset = { xs: `${MOBILE_CTA_HEIGHT + 16}px`, md: '24px' };

  return (
    <>
      {/* Okno czatu */}
      {open && (
        <Paper
          role="dialog"
          aria-label={`Czat z ${OWNER_NAME}`}
          elevation={0}
          sx={{
            position: 'fixed',
            right: { xs: 12, md: 24 },
            bottom: { xs: `${MOBILE_CTA_HEIGHT + 16}px`, md: '96px' },
            width: { xs: 'calc(100vw - 24px)', sm: 380 },
            height: { xs: `calc(100dvh - ${MOBILE_CTA_HEIGHT + 88}px)`, sm: 540 },
            maxHeight: 'calc(100dvh - 120px)',
            zIndex: 1250,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            borderRadius: '8px',
            border: '1px solid',
            borderColor: 'divider',
            boxShadow: '0 30px 80px rgba(20,35,43,0.28)',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              px: 2,
              py: 1.5,
              color: '#fff',
              background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accentDark})`,
            }}
          >
            <Box sx={{ position: 'relative' }}>
              <Avatar
                src="/avatar.webp"
                alt={OWNER_NAME}
                sx={{ width: 46, height: 46, border: '2px solid rgba(255,255,255,0.8)' }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  right: 0,
                  bottom: 0,
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  bgcolor: '#58D68D',
                  border: '2px solid #fff',
                }}
              />
            </Box>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography sx={{ fontWeight: 700, lineHeight: 1.2 }}>{OWNER_NAME}</Typography>
              <Typography variant="caption" sx={{ opacity: 0.9 }}>
                Radca prawny · opisz swoją sprawę
              </Typography>
            </Box>
            <IconButton
              aria-label="Zamknij czat"
              onClick={() => setOpen(false)}
              sx={{ color: '#fff' }}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          <Box
            aria-live="polite"
            sx={{
              flex: 1,
              overflowY: 'auto',
              px: 2,
              py: 2,
              bgcolor: COLORS.bg,
              display: 'flex',
              flexDirection: 'column',
              gap: 1.2,
            }}
          >
            {messages.map((m) => (
              <Box
                key={m.id}
                sx={{
                  alignSelf: m.from === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '86%',
                  px: 1.8,
                  py: 1.1,
                  borderRadius: m.from === 'user' ? '8px 8px 2px 8px' : '8px 8px 8px 2px',
                  bgcolor: m.from === 'user' ? 'secondary.main' : '#fff',
                  color: m.from === 'user' ? '#fff' : 'text.primary',
                  border: m.from === 'user' ? 'none' : '1px solid',
                  borderColor: 'divider',
                  fontSize: '0.95rem',
                  lineHeight: 1.5,
                  whiteSpace: 'pre-wrap',
                  overflowWrap: 'anywhere',
                }}
              >
                {m.text}
              </Box>
            ))}

            {step === 'message' && messages.length === 1 && (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 0.5 }}>
                {QUICK_REPLIES.map((q) => (
                  <Chip
                    key={q}
                    label={q}
                    clickable
                    variant="outlined"
                    color="secondary"
                    onClick={() => submitMessage(q)}
                  />
                ))}
              </Box>
            )}

            <Collapse in={step === 'contact' || step === 'sending'} unmountOnExit>
              <Box
                component="form"
                onSubmit={submitContact}
                noValidate
                sx={{
                  bgcolor: '#fff',
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: '8px',
                  p: 2,
                }}
              >
                <TextField
                  label="Imię"
                  size="small"
                  fullWidth
                  required
                  autoComplete="given-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  sx={{ mb: 1.5 }}
                />
                <TextField
                  label="Adres e-mail"
                  type="email"
                  size="small"
                  fullWidth
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  sx={{ mb: 1.5 }}
                />
                <TextField
                  label="Numer telefonu"
                  type="tel"
                  size="small"
                  fullWidth
                  required
                  autoComplete="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  sx={{ mb: 1 }}
                />
                {/* pole-pułapka, niewidoczne dla ludzi */}
                <Box
                  aria-hidden
                  sx={{
                    position: 'absolute',
                    left: '-9999px',
                    width: 1,
                    height: 1,
                    overflow: 'hidden',
                  }}
                >
                  <input
                    tabIndex={-1}
                    autoComplete="off"
                    name="website"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                </Box>
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      color="secondary"
                    />
                  }
                  label={
                    <Typography variant="caption" sx={{ color: 'text.secondary', lineHeight: 1.4 }}>
                      Zgadzam się na kontakt w sprawie mojej wiadomości. Zapoznałem się z{' '}
                      <Link to={PATHS.rodo} style={{ color: COLORS.accentDark }}>
                        Polityką prywatności
                      </Link>
                      .
                    </Typography>
                  }
                  sx={{ alignItems: 'flex-start', m: 0, mb: 1 }}
                />
                {error && (
                  <Typography
                    role="alert"
                    variant="caption"
                    sx={{ color: 'error.main', display: 'block', mb: 1 }}
                  >
                    {error}
                  </Typography>
                )}
                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  fullWidth
                  disabled={step === 'sending'}
                  startIcon={
                    step === 'sending' ? (
                      <CircularProgress size={16} color="inherit" />
                    ) : (
                      <SendIcon />
                    )
                  }
                >
                  {step === 'sending' ? 'Wysyłanie…' : 'Wyślij wiadomość'}
                </Button>
              </Box>
            </Collapse>

            {step === 'sent' && (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 0.5 }}>
                <Button
                  component="a"
                  href={PHONE_HREF}
                  size="small"
                  variant="contained"
                  color="secondary"
                >
                  Zadzwoń
                </Button>
                <Button size="small" variant="outlined" color="secondary" onClick={reset}>
                  Napisz kolejną wiadomość
                </Button>
              </Box>
            )}
            <div ref={endRef} />
          </Box>

          {/* Pole wpisywania wiadomości */}
          <Box
            component="form"
            onSubmit={(e) => {
              e.preventDefault();
              submitMessage(draft);
            }}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              p: 1.2,
              borderTop: '1px solid',
              borderColor: 'divider',
              bgcolor: '#fff',
            }}
          >
            <InputBase
              inputRef={inputRef}
              fullWidth
              multiline
              maxRows={3}
              placeholder={step === 'message' ? 'Opisz swój problem…' : 'Najpierw zostaw dane kontaktowe powyżej'}
              disabled={step !== 'message'}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  submitMessage(draft);
                }
              }}
              inputProps={{ 'aria-label': 'Treść wiadomości' }}
              sx={{
                px: 1.5,
                py: 0.8,
                borderRadius: '6px',
                bgcolor: COLORS.mist,
                fontSize: '0.95rem',
              }}
            />
            <IconButton
              type="submit"
              aria-label="Wyślij"
              disabled={step !== 'message' || !draft.trim()}
              sx={{
                bgcolor: 'secondary.main',
                color: '#fff',
                '&:hover': { bgcolor: 'secondary.dark' },
                '&.Mui-disabled': { bgcolor: COLORS.line, color: '#fff' },
              }}
            >
              <SendIcon fontSize="small" />
            </IconButton>
          </Box>
        </Paper>
      )}

      {/* Zachęta */}
      {teaser && !open && (
        <Paper
          elevation={0}
          sx={{
            position: 'fixed',
            right: { xs: 16, md: 24 },
            bottom: { xs: `${MOBILE_CTA_HEIGHT + 84}px`, md: '96px' },
            zIndex: 1200,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            pl: 2,
            pr: 0.5,
            py: 0.8,
            borderRadius: '8px 8px 2px 8px',
            border: '1px solid',
            borderColor: 'divider',
            boxShadow: '0 12px 30px rgba(20,35,43,0.16)',
            maxWidth: 260,
          }}
        >
          <Typography
            component="button"
            type="button"
            onClick={openChat}
            sx={{
              all: 'unset',
              cursor: 'pointer',
              fontSize: '0.92rem',
              lineHeight: 1.4,
              color: 'text.primary',
            }}
          >
            Opisz swój problem prawny tutaj.
          </Typography>
          <IconButton size="small" aria-label="Ukryj zachętę" onClick={dismissTeaser}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Paper>
      )}

      {/* Przycisk otwierający czat */}
      <Box
        component="button"
        ref={launcherRef}
        type="button"
        onClick={() => (open ? setOpen(false) : openChat())}
        aria-expanded={open}
        aria-label={open ? 'Zamknij czat' : 'Otwórz czat: opisz swój problem'}
        sx={{
          position: 'fixed',
          right: { xs: 16, md: 24 },
          bottom: bottomOffset,
          zIndex: 1200,
          display: 'flex',
          alignItems: 'center',
          gap: 1.2,
          p: 0.7,
          pr: { xs: 0.7, md: 2.4 },
          border: 'none',
          cursor: 'pointer',
          font: 'inherit',
          color: '#fff',
          borderRadius: '6px',
          background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accentDark})`,
          boxShadow: '0 14px 34px rgba(31,92,84,0.45)',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 18px 40px rgba(31,92,84,0.5)' },
          '&::after': {
            content: '""',
            position: 'absolute',
            inset: 0,
            borderRadius: '6px',
            boxShadow: `0 0 0 0 ${COLORS.accentLight}`,
            animation: open ? 'none' : 'chatPulse 2.6s ease-out infinite',
            pointerEvents: 'none',
          },
          '@keyframes chatPulse': {
            '0%': { boxShadow: `0 0 0 0 rgba(95,168,157,0.55)` },
            '70%': { boxShadow: `0 0 0 16px rgba(95,168,157,0)` },
            '100%': { boxShadow: `0 0 0 0 rgba(95,168,157,0)` },
          },
          '@media (prefers-reduced-motion: reduce)': { '&::after': { animation: 'none' } },
        }}
      >
        <Box sx={{ position: 'relative', display: 'flex' }}>
          {open ? (
            <Box sx={{ width: 48, height: 48, display: 'grid', placeItems: 'center' }}>
              <CloseIcon />
            </Box>
          ) : (
            <>
              <Avatar
                src="/avatar.webp"
                alt=""
                sx={{ width: 48, height: 48, border: '2px solid rgba(255,255,255,0.85)' }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  right: -2,
                  bottom: -2,
                  width: 15,
                  height: 15,
                  display: 'grid',
                  placeItems: 'center',
                  borderRadius: '50%',
                  bgcolor: '#fff',
                  color: 'secondary.main',
                }}
              >
                <ChatBubbleIcon sx={{ fontSize: 10 }} />
              </Box>
            </>
          )}
        </Box>
        {!open && (
          <Typography
            sx={{ display: { xs: 'none', md: 'block' }, fontWeight: 700, whiteSpace: 'nowrap' }}
          >
            Opisz swój problem
          </Typography>
        )}
      </Box>
    </>
  );
}
