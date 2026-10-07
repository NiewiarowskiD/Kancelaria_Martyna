import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Alert from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import CircularProgress from '@mui/material/CircularProgress';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import LogoutIcon from '@mui/icons-material/Logout';
import LockIcon from '@mui/icons-material/Lock';
import { supabase, isSupabaseConfigured, type BlogArticle } from '../lib/supabase';
import RichTextEditor from '../components/RichTextEditor';
import { ADMIN_CATEGORIES, canonicalCategory } from '../lib/categories';

interface ArticleFormData {
  title: string;
  excerpt: string;
  content: string;
  category: string;
  image_url: string;
  published: boolean;
}

const emptyForm: ArticleFormData = {
  title: '',
  excerpt: '',
  content: '',
  category: 'Ogólne',
  image_url: '',
  published: true,
};

export default function Admin() {
  const [authed, setAuthed] = useState(false);
  const [authChecking, setAuthChecking] = useState(isSupabaseConfigured);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loginLoading, setLoginLoading] = useState(false);

  const [articles, setArticles] = useState<BlogArticle[]>([]);
  const [loadingArticles, setLoadingArticles] = useState(true);
  const [articlesError, setArticlesError] = useState<string | null>(null);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<ArticleFormData>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  useEffect(() => {
    if (!supabase) return;
    const client = supabase;
    const checkSession = async () => {
      const {
        data: { session },
      } = await client.auth.getSession();
      if (session) setAuthed(true);
      setAuthChecking(false);
    };
    checkSession();

    const { data: sub } = client.auth.onAuthStateChange((_event, session) => {
      setAuthed(!!session);
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  const fetchArticles = async () => {
    setLoadingArticles(true);
    setArticlesError(null);
    if (!supabase) {
      setArticlesError('Baza danych nie jest skonfigurowana.');
      setLoadingArticles(false);
      return;
    }
    const { data, error } = await supabase
      .from('blog_articles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      setArticlesError('Nie udało się pobrać artykułów.');
    } else {
      setArticles(data || []);
    }
    setLoadingArticles(false);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (authed) fetchArticles();
  }, [authed]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) return;
    setLoginLoading(true);
    setLoginError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email: loginEmail,
      password: loginPassword,
    });

    if (error) {
      setLoginError(
        error.message === 'Invalid login credentials'
          ? 'Nieprawidłowy e-mail lub hasło.'
          : error.message,
      );
    }
    setLoginLoading(false);
  };

  const handleLogout = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    setLoginEmail('');
    setLoginPassword('');
  };

  const openCreateDialog = () => {
    setEditingId(null);
    setFormData(emptyForm);
    setSaveError(null);
    setDialogOpen(true);
  };

  const openEditDialog = (article: BlogArticle) => {
    setEditingId(article.id);
    setFormData({
      title: article.title,
      excerpt: article.excerpt || '',
      content: article.content || '',
      category: canonicalCategory(article.category),
      image_url: article.image_url || '',
      published: article.published,
    });
    setSaveError(null);
    setDialogOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) return;
    setSaving(true);
    setSaveError(null);

    const payload = {
      title: formData.title,
      excerpt: formData.excerpt || null,
      content: formData.content || null,
      category: formData.category,
      image_url: formData.image_url || null,
      published: formData.published,
      updated_at: new Date().toISOString(),
    };

    if (editingId) {
      const { error } = await supabase.from('blog_articles').update(payload).eq('id', editingId);
      if (error) {
        setSaveError(error.message);
        setSaving(false);
        return;
      }
    } else {
      const { error } = await supabase.from('blog_articles').insert(payload);
      if (error) {
        setSaveError(error.message);
        setSaving(false);
        return;
      }
    }

    setSaving(false);
    setDialogOpen(false);
    fetchArticles();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Czy na pewno chcesz usunąć ten artykuł?')) return;
    if (!supabase) return;
    const { error } = await supabase.from('blog_articles').delete().eq('id', id);
    if (error) {
      alert('Nie udało się usunąć artykułu: ' + error.message);
    } else {
      fetchArticles();
    }
  };

  if (!isSupabaseConfigured) {
    return (
      <Box sx={{ py: { xs: 6, md: 10 }, px: 2 }}>
        <Box sx={{ maxWidth: 500, mx: 'auto' }}>
          <Alert severity="error" sx={{ py: 3 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Baza danych nie jest skonfigurowana
            </Typography>
            <Typography variant="body2">
              Panel administracyjny wymaga połączenia z bazą danych. Upewnij się, że plik .env
              zawiera VITE_SUPABASE_URL i VITE_SUPABASE_ANON_KEY.
            </Typography>
          </Alert>
        </Box>
      </Box>
    );
  }

  if (authChecking) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 12 }}>
        <CircularProgress sx={{ color: 'secondary.main' }} />
      </Box>
    );
  }

  if (!authed) {
    return (
      <Box sx={{ py: { xs: 6, md: 10 }, px: 2 }}>
        <Box sx={{ maxWidth: 450, mx: 'auto' }}>
          <Card sx={{ border: '1px solid', borderColor: 'divider' }}>
            <CardContent sx={{ p: { xs: 3, md: 5 } }}>
              <Box sx={{ textAlign: 'center', mb: 3 }}>
                <LockIcon sx={{ fontSize: 48, color: 'secondary.main' }} />
                <Typography variant="h4" sx={{ mt: 1, color: 'secondary.dark' }}>
                  Panel administracyjny
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
                  Zaloguj się, aby zarządzać artykułami na blogu.
                </Typography>
              </Box>
              {loginError && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {loginError}
                </Alert>
              )}
              <Box component="form" onSubmit={handleLogin}>
                <Stack spacing={2.5}>
                  <TextField
                    label="E-mail"
                    type="email"
                    required
                    fullWidth
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                  <TextField
                    label="Hasło"
                    type="password"
                    required
                    fullWidth
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    fullWidth
                    size="large"
                    disabled={loginLoading}
                    sx={{ color: 'primary.main', fontWeight: 600, py: 1.5 }}
                  >
                    {loginLoading ? <CircularProgress size={24} /> : 'Zaloguj się'}
                  </Button>
                </Stack>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ py: { xs: 6, md: 10 }, px: { xs: 2, md: 4 } }}>
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
          <Box>
            <Typography variant="overline" sx={{ color: 'secondary.main', letterSpacing: '0.2em' }}>
              CMS
            </Typography>
            <Typography variant="h3" sx={{ mt: 0.5 }}>
              Zarządzanie artykułami
            </Typography>
          </Box>
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<AddIcon />}
              onClick={openCreateDialog}
              sx={{ color: 'primary.main', fontWeight: 600 }}
            >
              Nowy artykuł
            </Button>
            <Button
              variant="outlined"
              startIcon={<LogoutIcon />}
              onClick={handleLogout}
              sx={{ borderColor: 'divider', color: 'text.primary' }}
            >
              Wyloguj
            </Button>
          </Stack>
        </Stack>

        {articlesError && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {articlesError}
          </Alert>
        )}

        {loadingArticles ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress sx={{ color: 'secondary.main' }} />
          </Box>
        ) : articles.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h5" sx={{ color: 'text.secondary' }}>
              Brak artykułów
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1, mb: 3 }}>
              Kliknij "Nowy artykuł", aby dodać pierwszy wpis.
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<AddIcon />}
              onClick={openCreateDialog}
              sx={{ color: 'primary.main', fontWeight: 600 }}
            >
              Nowy artykuł
            </Button>
          </Box>
        ) : (
          <Stack spacing={2}>
            {articles.map((article) => (
              <Card
                key={article.id}
                sx={{ display: 'flex', border: '1px solid', borderColor: 'divider' }}
              >
                <CardMedia
                  component="img"
                  sx={{ width: 160, objectFit: 'cover' }}
                  height="140"
                  image={article.image_url || '/photo-book.webp'}
                  alt={article.title}
                />
                <CardContent
                  sx={{
                    flexGrow: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Box sx={{ flexGrow: 1 }}>
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                      <Chip
                        label={canonicalCategory(article.category)}
                        size="small"
                        sx={{ bgcolor: 'secondary.main', color: 'primary.main', fontWeight: 600 }}
                      />
                      {!article.published && (
                        <Chip
                          label="Wersja robocza"
                          size="small"
                          variant="outlined"
                          color="default"
                        />
                      )}
                    </Stack>
                    <Typography variant="h6" sx={{ mb: 0.5 }}>
                      {article.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {article.excerpt || 'Brak opisu'}
                    </Typography>
                  </Box>
                  <Stack direction="row" spacing={1}>
                    <IconButton
                      onClick={() => openEditDialog(article)}
                      sx={{ color: 'secondary.main' }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(article.id)}
                      sx={{ color: 'error.main' }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Stack>
        )}

        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md" fullWidth>
          <form onSubmit={handleSave}>
            <DialogTitle sx={{ bgcolor: 'primary.main', color: 'secondary.main' }}>
              {editingId ? 'Edytuj artykuł' : 'Nowy artykuł'}
            </DialogTitle>
            <DialogContent sx={{ pt: 3, pb: 1 }}>
              {saveError && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {saveError}
                </Alert>
              )}
              <Stack spacing={2.5} sx={{ mt: 1 }}>
                <TextField
                  label="Tytuł"
                  required
                  fullWidth
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
                <TextField
                  label="Kategoria"
                  required
                  fullWidth
                  select
                  SelectProps={{ native: true }}
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  {ADMIN_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </TextField>
                <TextField
                  label="Krótki opis (excerpt)"
                  fullWidth
                  multiline
                  rows={2}
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                />
                <TextField
                  label="URL zdjęcia"
                  fullWidth
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  helperText="Link do zdjęcia nagłówkowego (opcjonalne)"
                />
                <RichTextEditor
                  label="Treść artykułu"
                  value={formData.content}
                  onChange={(html) => setFormData({ ...formData, content: html })}
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.published}
                      onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                      sx={{
                        '& .MuiSwitch-switchBase.Mui-checked': { color: 'secondary.main' },
                        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                          backgroundColor: 'secondary.main',
                        },
                      }}
                    />
                  }
                  label="Opublikowany"
                />
              </Stack>
            </DialogContent>
            <DialogActions sx={{ p: 3 }}>
              <Button onClick={() => setDialogOpen(false)} sx={{ color: 'text.secondary' }}>
                Anuluj
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                disabled={saving}
                sx={{ color: 'primary.main', fontWeight: 600 }}
              >
                {saving ? (
                  <CircularProgress size={24} />
                ) : editingId ? (
                  'Zapisz zmiany'
                ) : (
                  'Dodaj artykuł'
                )}
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </Box>
    </Box>
  );
}
