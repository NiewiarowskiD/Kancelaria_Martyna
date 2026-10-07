import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { BODY_FONT } from '../theme';
import { PATHS, SPECIALIZATION_LABELS, specializationHash, type PageKey } from '../seo/routes';

const navFont = BODY_FONT;

const navItems: { key: PageKey; label: string }[] = [
  { key: 'home', label: 'Strona główna' },
  { key: 'about', label: 'O Kancelarii' },
  { key: 'specializations', label: 'Specjalizacje' },
  { key: 'price', label: 'Cennik' },
  { key: 'online', label: 'Porady online' },
  { key: 'contact', label: 'Kontakt' },
];

const specializationList = SPECIALIZATION_LABELS.map((label, i) => ({
  label,
  to: { pathname: PATHS.specializations, hash: specializationHash(i) },
}));

export default function Navbar() {
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSpecOpen, setMobileSpecOpen] = useState(false);

  const isActive = (key: PageKey) =>
    key === 'home'
      ? pathname === '/'
      : pathname === PATHS[key] || pathname.startsWith(`${PATHS[key]}/`);
  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          bgcolor: 'rgba(255,255,255,0.86)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid',
          borderColor: 'divider',
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar
          sx={{
            py: 0.5,
            width: '100%',
            maxWidth: 1500,
            mx: 'auto',
            px: { xs: 2, md: 4, lg: 6 },
            gap: '20px',
          }}
        >
          <Box
            component={Link}
            to={PATHS.home}
            aria-label="Martyna Obecna – Kancelaria Radcy Prawnego – strona główna"
            sx={{ flexShrink: 0, display: 'flex', alignItems: 'center', cursor: 'pointer' }}
          >
            <Box
              component="img"
              src="/logo.svg"
              alt="Martyna Obecna – Kancelaria Prawna"
              sx={{
                height: { xs: 30, md: 30, lg: 42 },
                width: 'auto',
                display: 'block',
              }}
            />
          </Box>

          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              flex: 1,
              flexShrink: 0,
              justifyContent: 'flex-end',
              gap: 0.5,
            }}
          >
            {navItems.map((item) => (
              <Box
                key={item.key}
                sx={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  '&:hover .dropdown-menu': {
                    opacity: 1,
                    visibility: 'visible',
                    transform: 'translateY(0)',
                    pointerEvents: 'auto',
                  },
                }}
              >
                <Button
                  component={Link}
                  to={PATHS[item.key]}
                  sx={{
                    fontFamily: navFont,
                    fontSize: { md: '0.75rem', lg: '0.875rem' },
                    whiteSpace: 'nowrap',
                    color: isActive(item.key) ? 'secondary.main' : 'text.primary',
                    fontWeight: isActive(item.key) ? 600 : 400,
                    borderBottom: '2px solid',
                    borderColor: isActive(item.key) ? 'secondary.main' : 'transparent',
                    borderRadius: 0,
                    px: { md: 0.6, lg: 1.5 },
                    height: '100%',
                    '&:hover': {
                      color: 'secondary.main',
                      backgroundColor: 'rgba(47,125,115,0.08)',
                    },
                  }}
                >
                  {item.label}
                </Button>

                {item.key === 'specializations' && (
                  <Box
                    className="dropdown-menu"
                    sx={{
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      pt: 1,
                      minWidth: 240,
                      opacity: 0,
                      visibility: 'hidden',
                      transform: 'translateY(10px)',
                      transition: 'all 0.3s ease',
                      pointerEvents: 'none',
                      zIndex: 1200,
                    }}
                  >
                    <Paper
                      elevation={8}
                      sx={{
                        bgcolor: 'background.paper',
                        border: '1px solid',
                        borderColor: 'secondary.main',
                        borderRadius: 1,
                        overflow: 'hidden',
                        py: 1,
                      }}
                    >
                      {specializationList.map((spec) => (
                        <MenuItem
                          key={spec.label}
                          component={Link}
                          to={spec.to}
                          sx={{
                            color: 'text.primary',
                            typography: 'body2',
                            fontFamily: navFont,
                            py: 1.5,
                            px: 3,
                            '&:hover': {
                              bgcolor: 'rgba(47,125,115,0.10)',
                              color: 'secondary.main',
                            },
                          }}
                        >
                          {spec.label}
                        </MenuItem>
                      ))}
                    </Paper>
                  </Box>
                )}
              </Box>
            ))}
          </Box>

          <Box
            sx={{
              flexShrink: 0,
              ml: { xs: 'auto', md: 0 },
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Button
              component={Link}
              to={PATHS.contact}
              variant="contained"
              color="secondary"
              sx={{
                display: { xs: 'none', md: 'inline-flex' },
                ml: 1,
                py: 0.9,
                px: 2.4,
                whiteSpace: 'nowrap',
              }}
            >
              Umów konsultację
            </Button>
            <IconButton
              aria-label="Otwórz menu"
              sx={{ display: { xs: 'flex', md: 'none' }, color: 'secondary.main' }}
              onClick={() => setMobileOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        anchor="right"
        PaperProps={{ sx: { width: 280, bgcolor: 'background.paper' } }}
      >
        <List sx={{ mt: 2 }}>
          {navItems.map((item) => {
            if (item.key === 'specializations') {
              return (
                <Box key={item.key}>
                  <ListItem disablePadding>
                    <ListItemButton
                      component={Link}
                      to={PATHS.specializations}
                      onClick={closeMobile}
                      sx={{
                        color: isActive(item.key) ? 'secondary.main' : 'text.primary',
                        borderLeft: isActive(item.key) ? '4px solid' : '4px solid transparent',
                        borderColor: 'secondary.main',
                      }}
                    >
                      <ListItemText
                        primary={item.label}
                        primaryTypographyProps={{ sx: { fontFamily: navFont } }}
                      />
                    </ListItemButton>
                    <IconButton
                      aria-label="Rozwiń listę specjalizacji"
                      onClick={() => setMobileSpecOpen(!mobileSpecOpen)}
                      sx={{ mr: 1 }}
                    >
                      {mobileSpecOpen ? (
                        <ExpandLess sx={{ color: 'secondary.main' }} />
                      ) : (
                        <ExpandMore sx={{ color: 'text.primary' }} />
                      )}
                    </IconButton>
                  </ListItem>
                  <Collapse in={mobileSpecOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {specializationList.map((spec) => (
                        <ListItemButton
                          key={spec.label}
                          component={Link}
                          to={spec.to}
                          sx={{ pl: 4 }}
                          onClick={closeMobile}
                        >
                          <ListItemText
                            primary={spec.label}
                            primaryTypographyProps={{
                              variant: 'body2',
                              color: 'text.secondary',
                              sx: { fontFamily: navFont },
                            }}
                          />
                        </ListItemButton>
                      ))}
                    </List>
                  </Collapse>
                </Box>
              );
            }

            return (
              <ListItem key={item.key} disablePadding>
                <ListItemButton
                  component={Link}
                  to={PATHS[item.key]}
                  onClick={closeMobile}
                  sx={{
                    color: isActive(item.key) ? 'secondary.main' : 'text.primary',
                    borderLeft: isActive(item.key) ? '4px solid' : '4px solid transparent',
                    borderColor: 'secondary.main',
                  }}
                >
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{ sx: { fontFamily: navFont } }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Drawer>
    </>
  );
}
