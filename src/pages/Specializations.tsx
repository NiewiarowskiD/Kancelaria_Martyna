import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import BusinessIcon from '@mui/icons-material/Business';
import GavelIcon from '@mui/icons-material/Gavel';
import WorkIcon from '@mui/icons-material/Work';
import DescriptionIcon from '@mui/icons-material/Description';
import BalanceIcon from '@mui/icons-material/Balance';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import type { SvgIconComponent } from '@mui/icons-material';
import Seo from '../seo/Seo';
import CtaBand from '../components/CtaBand';
import Reveal from '../components/Reveal';
import { breadcrumbLd } from '../seo/jsonld';
import { PAGE_META, PATHS } from '../seo/routes';
import { richTextStyles } from '../styles/richTextStyles';

interface SubSpecialization {
  title: string;
  description: string;
}

interface Specialization {
  title: string;
  Icon: SvgIconComponent;
  description: string;
  subItems: SubSpecialization[];
}

const LOREM =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';

const intro = `<p>${LOREM}</p><p>Prowadzimy sprawy dotyczące między innymi:</p><ul><li>lorem ipsum dolor sit amet</li><li>consectetur adipiscing elit</li><li>sed do eiusmod tempor incididunt</li><li>ut labore et dolore magna aliqua</li></ul>`;

const subItems: SubSpecialization[] = [
  { title: 'Lorem ipsum dolor sit amet', description: `<p>${LOREM}</p>` },
  { title: 'Consectetur adipiscing elit', description: `<p>${LOREM}</p>` },
  { title: 'Sed do eiusmod tempor incididunt', description: `<p>${LOREM}</p>` },
];

const specializations: Specialization[] = [
  { title: 'Prawo cywilne', Icon: BalanceIcon, description: intro, subItems },
  { title: 'Prawo karne', Icon: GavelIcon, description: intro, subItems },
  { title: 'Prawo rodzinne', Icon: FamilyRestroomIcon, description: intro, subItems },
  { title: 'Prawo spadkowe', Icon: DescriptionIcon, description: intro, subItems },
  { title: 'Prawo gospodarcze', Icon: BusinessIcon, description: intro, subItems },
  { title: 'Prawo pracy', Icon: WorkIcon, description: intro, subItems },
  { title: 'Upadłość konsumencka', Icon: AccountBalanceWalletIcon, description: intro, subItems },
];

export default function Specializations() {
  const { hash, key } = useLocation();
  const [expanded, setExpanded] = useState<number | false>(false);
  const [expandedSub, setExpandedSub] = useState<number | false>(false);

  // Wybór specjalizacji z menu (#spec-N) rozwija odpowiedni kafelek i przewija do niego
  useEffect(() => {
    if (!hash.startsWith('#spec-')) return;
    const index = parseInt(hash.replace('#spec-', ''), 10);
    if (isNaN(index) || index >= specializations.length) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setExpanded(index);
    setExpandedSub(false);
    const timer = setTimeout(() => {
      const element = document.getElementById(`spec-${index}`);
      if (element) {
        const y = element.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [hash, key]);

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
      <Box sx={{ maxWidth: 900, mx: 'auto' }}>
        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
          <Typography variant="overline" sx={{ color: 'secondary.main' }}>
            SPECJALIZACJE
          </Typography>
          <Typography variant="h2" component="h1" sx={{ mt: 1, mb: 2 }}>
            Obszary praktyki
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 720, mx: 'auto' }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {specializations.map(({ title, Icon, description, subItems: subs }, index) => {
            const isExpanded = expanded === index;
            return (
              <Reveal key={title} delay={index * 40}>
                <Accordion
                  expanded={isExpanded}
                  id={`spec-${index}`}
                  onChange={(_e, open) => {
                    setExpanded(open ? index : false);
                    setExpandedSub(false);
                  }}
                  disableGutters
                  elevation={0}
                  sx={{
                    border: '1px solid',
                    borderColor: isExpanded ? 'secondary.main' : 'divider',
                    borderRadius: '18px !important',
                    bgcolor: 'background.paper',
                    transition: 'all 0.3s ease',
                    '&:before': { display: 'none' },
                    '&:hover': {
                      borderColor: 'secondary.light',
                      boxShadow: '0 10px 30px rgba(47,125,115,0.10)',
                    },
                  }}
                >
                  <AccordionSummary
                    expandIcon={
                      isExpanded ? (
                        <RemoveIcon sx={{ color: 'secondary.main' }} />
                      ) : (
                        <AddIcon sx={{ color: 'secondary.main' }} />
                      )
                    }
                    sx={{
                      p: { xs: 2, md: 3 },
                      '& .MuiAccordionSummary-content': { alignItems: 'center', m: 0 },
                    }}
                  >
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: '14px',
                        bgcolor: 'rgba(47,125,115,0.10)',
                        display: 'grid',
                        placeItems: 'center',
                        mr: 2,
                        flexShrink: 0,
                      }}
                    >
                      <Icon sx={{ fontSize: 26, color: 'secondary.main' }} />
                    </Box>
                    <Typography variant="h5" component="h2" sx={{ m: 0 }}>
                      {title}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ p: { xs: 2, md: 4 }, pt: 0 }}>
                    <Box
                      sx={{ color: 'text.secondary', lineHeight: 1.8, ...richTextStyles }}
                      dangerouslySetInnerHTML={{ __html: description }}
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mt: 2 }}>
                      {subs.map((sub, subIdx) => {
                        const isSubExpanded = expandedSub === subIdx;
                        return (
                          <Accordion
                            key={sub.title}
                            expanded={isSubExpanded}
                            onChange={(_e, open) => setExpandedSub(open ? subIdx : false)}
                            disableGutters
                            elevation={0}
                            sx={{
                              border: '1px solid',
                              borderColor: 'divider',
                              borderRadius: '12px !important',
                              bgcolor: 'transparent',
                              '&:before': { display: 'none' },
                            }}
                          >
                            <AccordionSummary
                              expandIcon={
                                isSubExpanded ? (
                                  <RemoveIcon fontSize="small" sx={{ color: 'secondary.main' }} />
                                ) : (
                                  <AddIcon fontSize="small" sx={{ color: 'secondary.main' }} />
                                )
                              }
                              sx={{ minHeight: 48, '& .MuiAccordionSummary-content': { my: 1 } }}
                            >
                              <Typography variant="h6" component="h3">
                                {sub.title}
                              </Typography>
                            </AccordionSummary>
                            <AccordionDetails sx={{ pt: 0, pb: 2, px: 2 }}>
                              <Box
                                sx={{ color: 'text.secondary', lineHeight: 1.7, ...richTextStyles }}
                                dangerouslySetInnerHTML={{ __html: sub.description }}
                              />
                            </AccordionDetails>
                          </Accordion>
                        );
                      })}
                    </Box>
                  </AccordionDetails>
                </Accordion>
              </Reveal>
            );
          })}
        </Box>

        <Box sx={{ mt: { xs: 6, md: 10 } }}>
          <CtaBand title="Skontaktuj się z nami" />
        </Box>
      </Box>
    </Box>
  );
}
