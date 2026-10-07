import { Link } from 'react-router-dom';
import {
  LegalEmail,
  LegalList,
  LegalP,
  LegalPage,
  LegalPhone,
  LegalSection,
} from '../components/Legal';
import { PATHS } from '../seo/routes';

export default function NotaPrawna() {
  return (
    <LegalPage path="/nota-prawna" title="Nota prawna">
      <LegalSection first heading="Informacje o usługodawcy">
        <LegalP>Właścicielem i administratorem serwisu internetowego www.example.com jest:</LegalP>
        <LegalP>
          <strong>Martyna Obecna, radca prawny</strong>, prowadząca działalność pod nazwą{' '}
          <strong>Kancelaria Radcy Prawnego Martyna Obecna</strong>.
        </LegalP>
        <LegalP>
          Adres do korespondencji: ul. Przykładowa 1, 00-000 Warszawa
          <br />
          NIP: 000-000-00-00
          <br />
          Telefon: <LegalPhone />
          <br />
          E-mail: <LegalEmail />
        </LegalP>
      </LegalSection>

      <LegalSection heading="Informacje o wykonywanym zawodzie">
        <LegalList>
          <li>Tytuł zawodowy: radca prawny, nadany w Rzeczypospolitej Polskiej.</li>
          <li>Samorząd zawodowy: właściwa Okręgowa Izba Radców Prawnych.</li>
          <li>
            Numer wpisu na listę radców prawnych: [numer wpisu]. Wpis można zweryfikować w Krajowym
            Rejestrze Radców Prawnych pod adresem{' '}
            <a href="https://rejestrradcow.pl" target="_blank" rel="noopener noreferrer">
              rejestrradcow.pl
            </a>
            .
          </li>
          <li>
            Zasady wykonywania zawodu określają:
            <ul>
              <li>
                ustawa z dnia 6 lipca 1982 r. o radcach prawnych (t.j. Dz.U. z 2024 r. poz. 499 ze
                zm.),
              </li>
              <li>
                Kodeks Etyki Radcy Prawnego, uchwalony uchwałą nr 3/2014 Nadzwyczajnego Krajowego
                Zjazdu Radców Prawnych z dnia 22 listopada 2014 r. (tekst jednolity ogłoszony
                uchwałą nr 884/XI/2023 Prezydium Krajowej Rady Radców Prawnych z dnia 7 lutego 2023
                r.).
              </li>
            </ul>
          </li>
          <li>
            Kodeks Etyki Radcy Prawnego jest dostępny na stronie internetowej Krajowej Izby Radców
            Prawnych:{' '}
            <a href="https://kirp.pl" target="_blank" rel="noopener noreferrer">
              kirp.pl
            </a>
            .
          </li>
          <li>
            Radca prawny podlega obowiązkowemu ubezpieczeniu od odpowiedzialności cywilnej za szkody
            wyrządzone w związku z wykonywaniem czynności zawodowych.
          </li>
        </LegalList>
      </LegalSection>

      <LegalSection heading="Charakter informacji zamieszczonych w serwisie">
        <LegalP>
          Treści publikowane w serwisie, w tym artykuły w zakładce „Blog”, mają charakter wyłącznie
          informacyjny i edukacyjny. Nie stanowią porady prawnej ani opinii prawnej w rozumieniu
          przepisów ustawy o radcach prawnych i nie mogą zastąpić indywidualnej konsultacji z radcą
          prawnym. Każda sprawa wymaga odrębnej analizy stanu faktycznego i prawnego.
        </LegalP>
        <LegalP>
          Treści opisują stan prawny z dnia ich publikacji. Kancelaria dokłada starań, aby były
          rzetelne i aktualne, nie ponosi jednak odpowiedzialności za skutki decyzji podjętych
          wyłącznie na ich podstawie.
        </LegalP>
      </LegalSection>

      <LegalSection heading="Nawiązanie współpracy">
        <LegalP>
          Samo przesłanie wiadomości e-mail, kontakt telefoniczny lub skorzystanie z formularza w
          serwisie nie oznacza zawarcia umowy o świadczenie pomocy prawnej. Do zawarcia umowy
          dochodzi po uzgodnieniu jej warunków, w tym zasad wynagrodzenia, przed rozpoczęciem
          świadczenia pomocy prawnej.
        </LegalP>
      </LegalSection>

      <LegalSection heading="Tajemnica zawodowa">
        <LegalP>
          Informacje przekazane radcy prawnemu w związku z udzielaniem pomocy prawnej, również w
          formie porady online (e-porady), są objęte tajemnicą zawodową na zasadach określonych w
          art. 3 ust. 3–6 ustawy o radcach prawnych. Prosimy jednak, aby przy pierwszym kontakcie
          nie przekazywać szczegółowych informacji o sprawie ani dokumentów, dopóki forma i warunki
          współpracy nie zostaną ustalone.
        </LegalP>
      </LegalSection>

      <LegalSection heading="Prawa autorskie">
        <LegalP>
          Treści, grafiki, logo i układ serwisu są chronione na podstawie ustawy z dnia 4 lutego
          1994 r. o prawie autorskim i prawach pokrewnych (t.j. Dz.U. z 2025 r. poz. 24 ze zm.).
          Kopiowanie, rozpowszechnianie lub wykorzystywanie ich w celach komercyjnych bez zgody
          właściciela serwisu jest zabronione. Dozwolone jest przytaczanie fragmentów w granicach
          dozwolonego użytku, z podaniem źródła.
        </LegalP>
      </LegalSection>

      <LegalSection heading="Odnośniki do innych stron">
        <LegalP>
          Serwis może zawierać odnośniki do stron internetowych podmiotów trzecich. Kancelaria nie
          odpowiada za treść tych stron ani za stosowane przez nie zasady ochrony prywatności.
        </LegalP>
      </LegalSection>

      <LegalSection heading="Ochrona danych osobowych">
        <LegalP>
          Zasady przetwarzania danych osobowych oraz stosowania plików cookies określa{' '}
          <Link to={PATHS.rodo}>Polityka prywatności</Link>.
        </LegalP>
        <LegalP>
          Informacje zamieszczone na tej stronie stanowią wykonanie obowiązku informacyjnego
          określonego w art. 5 ustawy z dnia 18 lipca 2002 r. o świadczeniu usług drogą
          elektroniczną (t.j. Dz.U. z 2024 r. poz. 1513 ze zm.).
        </LegalP>
      </LegalSection>
    </LegalPage>
  );
}
