import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { supabase, type BlogArticle } from '../lib/supabase';
import { DEMO_ARTICLES } from '../lib/demoArticles';
import { Link as RouterLink, useParams } from 'react-router-dom';
import Seo from '../seo/Seo';
import { articleLd, breadcrumbLd } from '../seo/jsonld';
import { articleSlugs, blogPath, PAGE_META, PATHS } from '../seo/routes';
import { getPrefetchedArticles } from '../lib/prefetch';
import { sanitizeHtml } from '../lib/sanitize';
import { BLOG_CATEGORIES, canonicalCategory } from '../lib/categories';

const defaultCategories = ['Wszystkie', ...BLOG_CATEGORIES];

export default function Blog() {
  const { slug } = useParams();
  const prefetched = getPrefetchedArticles();
  const [articles, setArticles] = useState<BlogArticle[]>(
    prefetched ?? (supabase ? [] : DEMO_ARTICLES),
  );
  const [loading, setLoading] = useState(prefetched === null && Boolean(supabase));
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('Wszystkie');

  const error = fetchError;

  useEffect(() => {
    if (!supabase) return;
    let cancelled = false;
    supabase
      .from('blog_articles')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false })
      .then(({ data, error: dbError }) => {
        if (cancelled) return;
        if (dbError) {
          setFetchError('Nie udało się pobrać artykułów. Spróbuj ponownie później.');
        } else {
          setArticles(data || []);
        }
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const slugs = articleSlugs(articles);
  const selectedArticle = slug ? (articles.find((a) => slugs.get(a.id) === slug) ?? null) : null;

  const categories = Array.from(
    new Set([...defaultCategories, ...articles.map((a) => canonicalCategory(a.category))]),
  );

  const filteredArticles =
    selectedCategory === 'Wszystkie'
      ? articles
      : articles.filter((a) => canonicalCategory(a.category) === selectedCategory);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('pl-PL', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  if (slug && loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 12 }}>
        <Seo {...PAGE_META['/blog']} path={blogPath(slug)} noindex />
        <CircularProgress sx={{ color: 'secondary.main' }} />
      </Box>
    );
  }

  if (slug && !selectedArticle) {
    return (
      <Box sx={{ py: 12, px: 2, textAlign: 'center' }}>
        <Seo
          title="Nie znaleziono artykułu"
          description="Nie znaleziono artykułu."
          path={blogPath(slug)}
          noindex
        />
        <Typography variant="h2" component="h1" sx={{ mb: 2 }}>
          Nie znaleziono artykułu
        </Typography>
        <Button component={RouterLink} to={PATHS.blog} sx={{ color: 'secondary.main' }}>
          Wróć do bloga
        </Button>
      </Box>
    );
  }

  if (selectedArticle) {
    const path = blogPath(slug as string);
    const description = (
      selectedArticle.excerpt ||
      (selectedArticle.content || '')
        .replace(/<[^>]+>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
    ).slice(0, 160);
    return (
      <Box sx={{ py: { xs: 6, md: 10 }, px: { xs: 2, md: 4 } }}>
        <Seo
          title={`${selectedArticle.title} | Martyna Obecna`}
          description={description}
          path={path}
          type="article"
          image={selectedArticle.image_url || undefined}
          jsonLd={[
            articleLd({
              title: selectedArticle.title,
              description,
              path,
              image: selectedArticle.image_url,
              published: selectedArticle.created_at,
              modified: selectedArticle.updated_at,
            }),
            breadcrumbLd([
              { name: 'Strona główna', path: '/' },
              { name: 'Blog', path: PATHS.blog },
              { name: selectedArticle.title, path },
            ]),
          ]}
        />
        <Box sx={{ maxWidth: 800, mx: 'auto' }}>
          <Button
            component={RouterLink}
            to={PATHS.blog}
            startIcon={<ArrowBackIcon />}
            sx={{ color: 'secondary.main', mb: 3 }}
          >
            Wróć do bloga
          </Button>

          <Chip
            label={canonicalCategory(selectedArticle.category)}
            sx={{
              bgcolor: 'secondary.main',
              color: 'primary.main',
              fontWeight: 600,
              mb: 2,
            }}
          />

          <Typography variant="h2" component="h1" sx={{ mb: 2 }}>
            {selectedArticle.title}
          </Typography>

          <Typography variant="caption" sx={{ color: 'text.secondary', mb: 4, display: 'block' }}>
            {formatDate(selectedArticle.created_at)}
          </Typography>

          {selectedArticle.image_url && (
            <Box
              component="img"
              src={selectedArticle.image_url}
              alt={selectedArticle.title}
              sx={{ width: '100%', maxHeight: 400, objectFit: 'cover', borderRadius: 2, mb: 4 }}
            />
          )}

          {selectedArticle.excerpt && (
            <Typography variant="h6" sx={{ color: 'text.secondary', mb: 3, fontStyle: 'italic' }}>
              {selectedArticle.excerpt}
            </Typography>
          )}

          <Box
            sx={{
              lineHeight: 1.8,
              color: 'text.primary',
              '& p': { mb: 2 },
              '& h2, & h3': { mt: 3, mb: 1.5, fontWeight: 600 },
              '& ul, & ol': { pl: 3, mb: 2 },
              '& strong': { fontWeight: 700 },
              '& a': { color: 'secondary.main' },
            }}
            dangerouslySetInnerHTML={{
              __html: sanitizeHtml(selectedArticle.content || 'Brak treści artykułu.'),
            }}
          />
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ py: { xs: 6, md: 10 }, px: { xs: 2, md: 4 } }}>
      <Seo {...PAGE_META['/blog']} path="/blog" />
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
        <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6 } }}>
          <Typography variant="overline" sx={{ color: 'secondary.main', letterSpacing: '0.2em' }}>
            BLOG
          </Typography>
          <Typography align="center" variant="h2" component="h1" sx={{ mt: 1, mb: 2 }}>
            Artykuły i porady prawne
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 700, mx: 'auto' }}>
            Znajdź artykuły z zakresu prawa, które mogą Cię interesować. Wybierz kategorię, aby
            filtrować treści.
          </Typography>
        </Box>

        <Stack
          direction="row"
          spacing={1}
          sx={{ flexWrap: 'wrap', gap: 1, mb: 5, justifyContent: 'center' }}
        >
          {categories.map((cat) => (
            <Chip
              key={cat}
              label={cat}
              onClick={() => setSelectedCategory(cat)}
              color={selectedCategory === cat ? 'secondary' : 'default'}
              variant={selectedCategory === cat ? 'filled' : 'outlined'}
              sx={{
                px: 1,
                py: 2,
                fontSize: '0.9rem',
                fontWeight: selectedCategory === cat ? 600 : 400,
                ...(selectedCategory !== cat && {
                  borderColor: 'divider',
                  color: 'text.primary',
                  '&:hover': { borderColor: 'secondary.main' },
                }),
              }}
            />
          ))}
        </Stack>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress sx={{ color: 'secondary.main' }} />
          </Box>
        ) : error ? (
          <Typography color="error" sx={{ textAlign: 'center', py: 4 }}>
            {error}
          </Typography>
        ) : filteredArticles.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h5" sx={{ color: 'text.secondary' }}>
              Brak artykułów w tej kategorii
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
              Wybierz inną kategorię lub sprawdź później.
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={4}>
            {filteredArticles.map((article) => (
              <Grid key={article.id} size={{ xs: 12, sm: 6, md: 4 }}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'pointer',
                    border: '1px solid',
                    borderColor: 'divider',
                    '&:hover': {
                      borderColor: 'secondary.main',
                      boxShadow: '0 8px 30px rgba(197,165,114,0.15)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                  component={RouterLink}
                  to={blogPath(slugs.get(article.id) as string)}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={article.image_url || '/photo-book.webp'}
                    alt={article.title}
                  />
                  <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Chip
                      label={canonicalCategory(article.category)}
                      size="small"
                      sx={{
                        bgcolor: 'secondary.main',
                        color: 'primary.main',
                        fontWeight: 600,
                        alignSelf: 'flex-start',
                        mb: 2,
                      }}
                    />
                    <Typography variant="h5" component="h2" sx={{ mb: 1, lineHeight: 1.3 }}>
                      {article.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: 'text.secondary', mb: 2, flexGrow: 1 }}
                    >
                      {article.excerpt || 'Kliknij, aby przeczytać pełny artykuł...'}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      {formatDate(article.created_at)}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
}
