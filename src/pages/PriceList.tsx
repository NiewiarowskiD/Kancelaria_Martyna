import { LegalList, LegalP, LegalPage, LegalSection } from '../components/Legal';
import CtaBand from '../components/CtaBand';
import Box from '@mui/material/Box';

export default function Price() {
  return (
    <>
      <LegalPage path="/cennik" title="Cennik">
        <LegalP>
          <strong>Koszt pierwszej porady prawnej wynosi 000 zł</strong>, lorem ipsum dolor sit amet,
          consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
          aliqua.
        </LegalP>

        <LegalSection first heading="Porada prawna – 000 zł">
          <LegalP>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </LegalP>
          <LegalP>Podczas porady:</LegalP>
          <LegalList>
            <li>lorem ipsum dolor sit amet, consectetur adipiscing elit,</li>
            <li>sed do eiusmod tempor incididunt ut labore,</li>
            <li>ut enim ad minim veniam, quis nostrud exercitation,</li>
            <li>duis aute irure dolor in reprehenderit.</li>
          </LegalList>
        </LegalSection>

        <LegalSection heading="Wynagrodzenie za prowadzenie sprawy">
          <LegalP>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non
            proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </LegalP>
          <LegalP>Przy wycenie bierzemy pod uwagę w szczególności:</LegalP>
          <LegalList>
            <li>lorem ipsum dolor sit amet,</li>
            <li>consectetur adipiscing elit,</li>
            <li>sed do eiusmod tempor incididunt,</li>
            <li>ut labore et dolore magna aliqua.</li>
          </LegalList>
        </LegalSection>

        <LegalSection heading="Jak wygląda wycena">
          <LegalList ordered>
            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
            <li>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</li>
            <li>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</li>
          </LegalList>
        </LegalSection>

        <LegalSection heading="Czego nie obejmuje honorarium">
          <LegalP>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Kwoty wskazujemy w wysokości brutto.
          </LegalP>
        </LegalSection>
      </LegalPage>
      <Box sx={{ px: { xs: 2, md: 4 }, pb: { xs: 6, md: 10 } }}>
        <CtaBand />
      </Box>
    </>
  );
}
