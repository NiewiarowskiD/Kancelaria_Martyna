import { Link } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { LegalList, LegalP, LegalPage, LegalSection } from '../components/Legal';
import { PATHS } from '../seo/routes';
import { EMAIL, PHONE, PHONE_HREF, SITE_NAME } from '../seo/site';

const companyData: [string, string][] = [
  ['Nazwa', SITE_NAME],
  ['NIP', '000-000-00-00'],
  ['REGON', '000000000'],
  ['Bank', 'Nazwa banku'],
  ['Numer rachunku', '00 0000 0000 0000 0000 0000 0000'],
];

export default function Kontakt() {
  return (
    <LegalPage path="/kontakt" title="Kontakt">
      <LegalP>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit - sed do eiusmod tempor incididunt
        ut labore et dolore magna aliqua.
      </LegalP>

      <LegalSection first heading="Dane kontaktowe">
        <LegalP>
          <strong>{SITE_NAME}</strong>
        </LegalP>
        <LegalList>
          <li>
            Telefon: <a href={PHONE_HREF}>{PHONE}</a>
          </li>
          <li>
            E-mail: <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </li>
          <li>Adres do korespondencji: ul. Przykładowa 1, 00-000 Warszawa</li>
        </LegalList>
        <LegalP>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Podany adres służy wyłącznie do
          korespondencji.
        </LegalP>
      </LegalSection>

      <LegalSection heading="Godziny pracy">
        <LegalP>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris:</LegalP>
        <LegalList>
          <li>od poniedziałku do piątku – w godzinach od 9.00 do 17.00,</li>
          <li>sobota i niedziela – nieczynne.</li>
        </LegalList>
        <LegalP>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
          nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
          deserunt mollit anim id est laborum.
        </LegalP>
      </LegalSection>

      <LegalSection heading="Jak umówić poradę prawną">
        <LegalP>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </LegalP>
        <LegalP>
          Zasady rozliczeń określa zakładka <Link to={PATHS.price}>Cennik</Link>.
        </LegalP>
        <LegalP>W celu umówienia konsultacji prosimy o:</LegalP>
        <LegalList ordered>
          <li>
            kontakt telefoniczny pod numerem <a href={PHONE_HREF}>{PHONE}</a> lub e-mail:{' '}
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>,
          </li>
          <li>ustalenie terminu oraz formy konsultacji (spotkanie albo porada online),</li>
          <li>przygotowanie dokumentów dotyczących sprawy.</li>
        </LegalList>
      </LegalSection>

      <LegalSection heading="Dane do faktury i rachunek bankowy">
        <Table
          size="small"
          sx={{ mb: 2, '& td, & th': { fontSize: '1rem', borderColor: 'divider' } }}
        >
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 700, width: { xs: '40%', sm: '30%' } }}>Dane</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Wartość</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {companyData.map(([label, value]) => (
              <TableRow key={label}>
                <TableCell component="th" scope="row" sx={{ color: 'text.primary' }}>
                  {label}
                </TableCell>
                <TableCell sx={{ color: 'text.secondary' }}>{value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <LegalP>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor.
        </LegalP>
      </LegalSection>
    </LegalPage>
  );
}
