import {
  LegalEmail,
  LegalList,
  LegalP,
  LegalPage,
  LegalPhone,
  LegalSection,
} from '../components/Legal';

export default function Rodo() {
  return (
    <LegalPage
      path="/polityka-prywatnosci"
      title="Polityka prywatności i plików cookies"
      subtitle="serwisu www.example.com"
    >
      <LegalSection first heading="1. Administrator danych osobowych">
        <LegalP>
          Administratorem Pani/Pana danych osobowych jest{' '}
          <strong>Martyna Obecna, radca prawny</strong>, prowadząca{' '}
          <strong>Kancelarię Radcy Prawnego Martyna Obecna</strong> (dalej: „Administrator” lub
          „Kancelaria”).
        </LegalP>
        <LegalP>Dane kontaktowe Administratora:</LegalP>
        <LegalList>
          <li>adres do korespondencji: ul. Przykładowa 1, 00-000 Warszawa,</li>
          <li>
            e-mail: <LegalEmail />,
          </li>
          <li>
            telefon: <LegalPhone />
          </li>
        </LegalList>
        <LegalP>
          Administrator nie wyznaczył inspektora ochrony danych. W sprawach związanych z ochroną
          danych osobowych prosimy o kontakt na wskazane wyżej dane.
        </LegalP>
        <LegalP>
          Niniejsza polityka stanowi wykonanie obowiązku informacyjnego, o którym mowa w art. 13 i
          14 rozporządzenia Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r.
          w sprawie ochrony osób fizycznych w związku z przetwarzaniem danych osobowych i w sprawie
          swobodnego przepływu takich danych oraz uchylenia dyrektywy 95/46/WE (ogólne
          rozporządzenie o ochronie danych, dalej: „RODO”).
        </LegalP>
      </LegalSection>

      <LegalSection heading="2. Skąd pochodzą dane osobowe">
        <LegalP>
          Administrator przetwarza dane osobowe przekazane bezpośrednio przez osobę, której dane
          dotyczą, w szczególności podczas:
        </LegalP>
        <LegalList>
          <li>kontaktu telefonicznego lub mailowego,</li>
          <li>umawiania konsultacji,</li>
          <li>udzielania porady prawnej, także w formie porady online (e-porady),</li>
          <li>wykonywania umowy o świadczenie pomocy prawnej.</li>
        </LegalList>
        <LegalP>
          W związku ze świadczeniem pomocy prawnej Administrator może również przetwarzać dane osób
          trzecich, np. strony przeciwnej, świadków lub członków rodziny Klienta. Dane te pochodzą
          od Klienta, z akt sprawy lub z rejestrów publicznych.
        </LegalP>
      </LegalSection>

      <LegalSection heading="3. Cele i podstawy prawne przetwarzania">
        <LegalP>Dane osobowe są przetwarzane w następujących celach:</LegalP>
        <LegalList ordered>
          <li>
            <strong>Odpowiedź na zapytanie i umówienie konsultacji</strong> (art. 6 ust. 1 lit. b
            RODO). Przetwarzanie jest niezbędne do podjęcia działań na żądanie osoby, której dane
            dotyczą, przed zawarciem umowy.
          </li>
          <li>
            <strong>Zawarcie i wykonanie umowy o świadczenie pomocy prawnej</strong>, w tym
            udzielenie porady prawnej stacjonarnie lub online (art. 6 ust. 1 lit. b RODO).
          </li>
          <li>
            <strong>Wypełnienie obowiązków prawnych ciążących na Administratorze</strong> (art. 6
            ust. 1 lit. c RODO), w szczególności:
            <ul>
              <li>obowiązków wynikających z przepisów podatkowych i rachunkowych,</li>
              <li>obowiązków wynikających z ustawy z dnia 6 lipca 1982 r. o radcach prawnych,</li>
              <li>
                w przypadkach przewidzianych w ustawie z dnia 1 marca 2018 r. o przeciwdziałaniu
                praniu pieniędzy oraz finansowaniu terroryzmu: obowiązków wynikających z tej ustawy.
              </li>
            </ul>
          </li>
          <li>
            <strong>Ustalenie, dochodzenie lub obrona roszczeń</strong> (art. 6 ust. 1 lit. f RODO).
            Prawnie uzasadnionym interesem Administratora jest ochrona jego praw.
          </li>
          <li>
            <strong>Prowadzenie korespondencji niezwiązanej z umową</strong> (art. 6 ust. 1 lit. f
            RODO). Prawnie uzasadnionym interesem Administratora jest udzielanie odpowiedzi na
            kierowane do niego wiadomości.
          </li>
          <li>
            <strong>Szczególne kategorie danych</strong> (np. dane o stanie zdrowia) w zakresie, w
            jakim jest to niezbędne do udzielenia pomocy prawnej (art. 9 ust. 2 lit. f RODO).
            Dotyczy to ustalenia, dochodzenia lub obrony roszczeń oraz działań w ramach sprawowania
            wymiaru sprawiedliwości.
          </li>
          <li>
            <strong>Dane dotyczące wyroków skazujących oraz czynów zabronionych.</strong>{' '}
            Przetwarzane są w zakresie niezbędnym do świadczenia pomocy prawnej, w tym obrony w
            sprawach karnych i reprezentacji pokrzywdzonych (art. 10 RODO w związku z przepisami
            ustawy o radcach prawnych oraz przepisami postępowania karnego).
          </li>
          <li>
            <strong>Statystyka odwiedzin serwisu</strong>, wyłącznie na podstawie zgody (art. 6 ust.
            1 lit. a RODO), o której mowa w pkt 11.
          </li>
        </LegalList>
      </LegalSection>

      <LegalSection heading="4. Dobrowolność podania danych">
        <LegalP>Podanie danych jest dobrowolne, ale niezbędne do:</LegalP>
        <LegalList>
          <li>udzielenia odpowiedzi na zapytanie,</li>
          <li>umówienia konsultacji,</li>
          <li>zawarcia i wykonania umowy o świadczenie pomocy prawnej.</li>
        </LegalList>
        <LegalP>
          Niepodanie danych uniemożliwia świadczenie pomocy prawnej. W zakresie, w jakim podanie
          danych wynika z przepisów prawa (np. danych do wystawienia faktury), jest ono obowiązkowe.
        </LegalP>
      </LegalSection>

      <LegalSection heading="5. Okres przechowywania danych">
        <LegalP>Dane osobowe są przechowywane:</LegalP>
        <LegalList>
          <li>
            <strong>zapytania, które nie zakończyły się zawarciem umowy:</strong> przez okres
            niezbędny do udzielenia odpowiedzi, a następnie do upływu terminu przedawnienia
            ewentualnych roszczeń;
          </li>
          <li>
            <strong>dane przetwarzane w związku ze świadczeniem pomocy prawnej:</strong> przez okres
            określony w art. 5c ustawy o radcach prawnych, tj. co do zasady przez 10 lat od końca
            roku, w którym zakończyło się postępowanie. Po upływie tego okresu dane ulegają
            usunięciu;
          </li>
          <li>
            <strong>dokumentacja księgowa i podatkowa:</strong> przez 5 lat, licząc od końca roku
            kalendarzowego, w którym upłynął termin płatności podatku (art. 86 § 1 w związku z art.
            70 § 1 ustawy z dnia 29 sierpnia 1997 r. – Ordynacja podatkowa);
          </li>
          <li>
            <strong>
              dane przetwarzane na podstawie przepisów o przeciwdziałaniu praniu pieniędzy:
            </strong>{' '}
            przez okres wskazany w tej ustawie;
          </li>
          <li>
            <strong>dane przetwarzane na podstawie zgody:</strong> do czasu jej wycofania.
          </li>
        </LegalList>
      </LegalSection>

      <LegalSection heading="6. Odbiorcy danych">
        <LegalP>
          Dane osobowe mogą być przekazywane wyłącznie w zakresie niezbędnym do realizacji celów
          wskazanych powyżej:
        </LegalP>
        <LegalList>
          <li>
            <strong>podmiotom przetwarzającym dane na zlecenie Administratora</strong>, tj.:
            <ul>
              <li>dostawcom usług hostingowych i poczty elektronicznej,</li>
              <li>dostawcom narzędzi do wideokonferencji,</li>
              <li>dostawcom usług informatycznych,</li>
              <li>biuru rachunkowemu.</li>
            </ul>
            Podmioty te działają na podstawie umów powierzenia przetwarzania danych (art. 28 RODO);
          </li>
          <li>
            <strong>sądom, organom ścigania i innym organom publicznym</strong>, w zakresie
            wynikającym z prowadzonej sprawy lub przepisów prawa;
          </li>
          <li>
            <strong>innym radcom prawnym, adwokatom, biegłym lub tłumaczom</strong>, współpracującym
            przy prowadzeniu sprawy, wyłącznie za wiedzą Klienta;
          </li>
          <li>
            <strong>operatorom pocztowym i kurierom.</strong>
          </li>
        </LegalList>
      </LegalSection>

      <LegalSection heading="7. Przekazywanie danych poza Europejski Obszar Gospodarczy">
        <LegalP>
          Niektórzy dostawcy usług informatycznych (Google Ireland Ltd., dostawca poczty
          elektronicznej, oraz Cloudflare, Inc., dostawca hostingu serwisu) mogą przetwarzać dane na
          serwerach poza Europejskim Obszarem Gospodarczym, w szczególności w Stanach Zjednoczonych.
        </LegalP>
        <LegalP>W takim przypadku przekazanie odbywa się na podstawie:</LegalP>
        <LegalList>
          <li>
            decyzji Komisji Europejskiej stwierdzającej odpowiedni stopień ochrony (EU–US Data
            Privacy Framework), w odniesieniu do podmiotów objętych tym programem, lub
          </li>
          <li>
            standardowych klauzul umownych zatwierdzonych przez Komisję Europejską (art. 46 ust. 2
            lit. c RODO).
          </li>
        </LegalList>
        <LegalP>
          Kopię stosowanych zabezpieczeń można uzyskać, kontaktując się z Administratorem.
        </LegalP>
      </LegalSection>

      <LegalSection heading="8. Prawa osób, których dane dotyczą">
        <LegalP>Przysługuje Pani/Panu prawo do:</LegalP>
        <LegalList>
          <li>dostępu do danych osobowych oraz otrzymania ich kopii (art. 15 RODO),</li>
          <li>sprostowania danych (art. 16 RODO),</li>
          <li>usunięcia danych (art. 17 RODO),</li>
          <li>ograniczenia przetwarzania (art. 18 RODO),</li>
          <li>przenoszenia danych (art. 20 RODO),</li>
          <li>
            wniesienia sprzeciwu wobec przetwarzania opartego na prawnie uzasadnionym interesie
            (art. 21 RODO),
          </li>
          <li>
            cofnięcia zgody w dowolnym momencie, bez wpływu na zgodność z prawem przetwarzania
            dokonanego przed jej cofnięciem (art. 7 ust. 3 RODO).
          </li>
        </LegalList>
        <LegalP>
          <strong>Ograniczenia wynikające z tajemnicy zawodowej radcy prawnego:</strong>
        </LegalP>
        <LegalList>
          <li>
            zgodnie z art. 5a ust. 1 ustawy o radcach prawnych prawa określone w art. 15 ust. 1 i 3,
            art. 18 oraz art. 19 RODO przysługują w zakresie, w jakim ich realizacja nie narusza
            obowiązku zachowania tajemnicy zawodowej;
          </li>
          <li>
            zgodnie z art. 5a ust. 2 tej ustawy prawo sprzeciwu (art. 21 ust. 1 RODO) nie
            przysługuje w odniesieniu do danych pozyskanych w związku z udzielaniem pomocy prawnej;
          </li>
          <li>
            w odniesieniu do danych osób trzecich pozyskanych w związku ze świadczeniem pomocy
            prawnej Administrator nie realizuje obowiązku informacyjnego z art. 14 ust. 1–4 RODO, z
            uwagi na art. 14 ust. 5 lit. d RODO (tajemnica zawodowa).
          </li>
        </LegalList>
      </LegalSection>

      <LegalSection heading="9. Skarga do organu nadzorczego">
        <LegalP>
          Przysługuje Pani/Panu prawo wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych
          (ul. Stawki 2, 00-193 Warszawa), jeżeli uzna Pani/Pan, że przetwarzanie danych narusza
          przepisy RODO.
        </LegalP>
      </LegalSection>

      <LegalSection heading="10. Zautomatyzowane podejmowanie decyzji">
        <LegalP>
          Dane osobowe nie podlegają zautomatyzowanemu podejmowaniu decyzji, w tym profilowaniu
          (art. 22 RODO).
        </LegalP>
      </LegalSection>

      <LegalSection heading="11. Pliki cookies i podobne technologie">
        <LegalList ordered>
          <li>
            Serwis korzysta z plików cookies oraz technologii lokalnego przechowywania danych w
            przeglądarce (localStorage), zgodnie z art. 399 ustawy z dnia 12 lipca 2024 r. – Prawo
            komunikacji elektronicznej (Dz.U. z 2024 r. poz. 1221 ze zm.).
          </li>
          <li>
            <strong>Pliki niezbędne.</strong> Zapewniają prawidłowe działanie i bezpieczeństwo
            serwisu oraz zapamiętują wybór dokonany w banerze cookies. Nie wymagają zgody, ponieważ
            są niezbędne do świadczenia usługi żądanej przez użytkownika.
          </li>
          <li>
            <strong>Pliki analityczne.</strong> Służą do tworzenia anonimowych statystyk odwiedzin.
            Są stosowane wyłącznie po wyrażeniu zgody przez kliknięcie „Akceptuję wszystkie”.
            Dostawcą narzędzia analitycznego jest [nazwa narzędzia, np. Google Analytics 4 – Google
            Ireland Ltd.].
          </li>
          <li>
            <strong>Zmiana decyzji.</strong> Zgodę można w każdej chwili wycofać za pomocą ikony
            ustawień cookies widocznej w serwisie albo przez usunięcie plików cookies w ustawieniach
            przeglądarki. Ograniczenie stosowania plików niezbędnych może wpłynąć na działanie
            serwisu.
          </li>
          <li>
            <strong>Logi serwera.</strong> Przy każdym wejściu do serwisu dostawca hostingu
            automatycznie rejestruje podstawowe dane techniczne, tj. adres IP, datę i godzinę, typ
            przeglądarki i adres odwiedzanej podstrony. Dane te służą wyłącznie zapewnieniu
            bezpieczeństwa i prawidłowego działania serwisu (art. 6 ust. 1 lit. f RODO) i nie są
            łączone z innymi danymi.
          </li>
        </LegalList>
      </LegalSection>

      <LegalSection heading="12. Bezpieczeństwo korespondencji">
        <LegalP>
          Administrator stosuje środki techniczne i organizacyjne zapewniające ochronę danych
          osobowych, w tym szyfrowane połączenie (SSL/TLS).
        </LegalP>
        <LegalP>
          Prosimy, aby przy pierwszym kontakcie nie przesyłać szczegółowych informacji o sprawie ani
          dokumentów, w szczególności zawierających dane wrażliwe, do czasu ustalenia zasad
          współpracy.
        </LegalP>
      </LegalSection>

      <LegalSection heading="13. Zmiany polityki prywatności">
        <LegalP>
          Administrator może aktualizować niniejszą politykę w przypadku zmiany przepisów prawa lub
          sposobu działania serwisu. Aktualna wersja jest zawsze dostępna w serwisie.
        </LegalP>
        <LegalP>Data ostatniej aktualizacji: 15.10.2026 r.</LegalP>
      </LegalSection>
    </LegalPage>
  );
}
