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

export default function Regulamin() {
  return (
    <LegalPage
      path="/regulamin"
      title="Regulamin serwisu i świadczenia porad prawnych online (e-porad)"
      subtitle="Kancelaria Radcy Prawnego Martyna Obecna · www.example.com"
    >
      <LegalSection first heading="§ 1. Postanowienia ogólne">
        <LegalList ordered>
          <li>
            Regulamin określa zasady korzystania z serwisu internetowego www.example.com (dalej:
            „Serwis”) oraz zasady świadczenia porad prawnych online (dalej: „e-porada”).
          </li>
          <li>
            Usługodawcą jest Martyna Obecna, radca prawny, prowadząca Kancelarię Radcy Prawnego
            Martyna Obecna (dalej: „Kancelaria”). Dane Kancelarii:
            <ul>
              <li>adres do korespondencji: ul. Przykładowa 1, 00-000 Warszawa</li>
              <li>NIP: 000-000-00-00</li>
              <li>
                e-mail: <LegalEmail />,
              </li>
              <li>
                telefon: <LegalPhone />
              </li>
            </ul>
          </li>
          <li>
            Regulamin wydano na podstawie art. 8 ust. 1 pkt 1 ustawy z dnia 18 lipca 2002 r. o
            świadczeniu usług drogą elektroniczną (t.j. Dz.U. z 2024 r. poz. 1513 ze zm.).
          </li>
          <li>
            Regulamin jest udostępniony nieodpłatnie w Serwisie w sposób umożliwiający jego
            pobranie, utrwalenie i wydrukowanie.
          </li>
        </LegalList>
      </LegalSection>

      <LegalSection heading="§ 2. Definicje">
        <LegalP>Użyte w Regulaminie określenia oznaczają:</LegalP>
        <LegalList dash>
          <li>
            <strong>Klient</strong> – osoba fizyczna, osoba prawna lub jednostka organizacyjna
            nieposiadająca osobowości prawnej, która korzysta z Serwisu lub zamawia e-poradę;
          </li>
          <li>
            <strong>Konsument</strong> – Klient będący konsumentem w rozumieniu art. 22¹ Kodeksu
            cywilnego; postanowienia dotyczące Konsumenta stosuje się również do osoby fizycznej
            zawierającej umowę bezpośrednio związaną z jej działalnością gospodarczą, gdy z treści
            umowy wynika, że nie ma ona dla niej charakteru zawodowego (art. 38a ustawy o prawach
            konsumenta);
          </li>
          <li>
            <strong>E-porada</strong> – porada prawna udzielana przez radcę prawnego bez
            jednoczesnej obecności stron: telefonicznie, za pomocą wideokonferencji albo w formie
            pisemnej odpowiedzi przesłanej pocztą elektroniczną;
          </li>
          <li>
            <strong>Oferta</strong> – wiadomość przesłana przez Kancelarię na trwałym nośniku, w
            szczególności e-mailem, określająca zakres, formę, termin i cenę e-porady;
          </li>
          <li>
            <strong>Oświadczenie o żądaniu wcześniejszego wykonania usługi</strong> – oświadczenie
            Konsumenta, o którym mowa w § 8 ust. 4.
          </li>
        </LegalList>
      </LegalSection>

      <LegalSection heading="§ 3. Usługi świadczone drogą elektroniczną">
        <LegalList ordered>
          <li>
            Kancelaria świadczy nieodpłatnie następujące usługi:
            <ul>
              <li>udostępnianie treści zamieszczonych w Serwisie, w tym artykułów na blogu,</li>
              <li>
                formularz kontaktowy, który umożliwia przesłanie zapytania lub prośby o umówienie
                konsultacji.
              </li>
            </ul>
          </li>
          <li>
            Umowa o świadczenie usług, o których mowa w ust. 1, zostaje zawarta z chwilą wejścia do
            Serwisu albo przesłania formularza i ulega rozwiązaniu z chwilą opuszczenia Serwisu albo
            udzielenia odpowiedzi na zapytanie.
          </li>
          <li>
            Treści zamieszczone w Serwisie mają charakter informacyjny i nie stanowią porady
            prawnej.
          </li>
          <li>
            Przesłanie zapytania, w tym za pomocą formularza kontaktowego, nie oznacza zawarcia
            umowy o świadczenie pomocy prawnej ani umowy o e-poradę i nie rodzi po stronie
            Kancelarii obowiązku jej udzielenia.
          </li>
          <li>Odpłatną usługą jest e-porada, której zasady określają § 5–8.</li>
        </LegalList>
      </LegalSection>

      <LegalSection heading="§ 4. Wymagania techniczne i zasady korzystania">
        <LegalList ordered>
          <li>
            Do korzystania z Serwisu potrzebne są:
            <ul>
              <li>urządzenie z dostępem do Internetu,</li>
              <li>aktualna przeglądarka internetowa z włączoną obsługą JavaScript,</li>
              <li>do kontaktu i e-porady: aktywny adres e-mail lub numer telefonu,</li>
              <li>
                do e-porady w formie wideokonferencji: kamera, mikrofon i oprogramowanie wskazane
                przez Kancelarię.
              </li>
            </ul>
          </li>
          <li>
            Zabronione jest dostarczanie za pośrednictwem Serwisu treści o charakterze bezprawnym.
          </li>
          <li>
            Korzystanie z sieci Internet wiąże się z typowymi zagrożeniami, takimi jak złośliwe
            oprogramowanie, phishing czy przechwycenie transmisji danych (art. 6 ustawy o
            świadczeniu usług drogą elektroniczną). Kancelaria stosuje szyfrowane połączenie. Zaleca
            się korzystanie z aktualnego oprogramowania antywirusowego oraz nieprzesyłanie danych
            wrażliwych przed ustaleniem zasad współpracy.
          </li>
        </LegalList>
      </LegalSection>

      <LegalSection heading="§ 5. Zawarcie umowy o e-poradę">
        <LegalList ordered>
          <li>
            Klient może zgłosić zainteresowanie e-poradą telefonicznie, mailowo lub przez formularz
            kontaktowy.
          </li>
          <li>
            W odpowiedzi Kancelaria przesyła Klientowi na trwałym nośniku Ofertę, Regulamin,
            Politykę prywatności oraz wzór formularza odstąpienia od umowy.
          </li>
          <li>
            Umowa zostaje zawarta z chwilą otrzymania przez Kancelarię akceptacji warunków Oferty i
            Regulaminu, przesłanej przez Klienta na trwałym nośniku, w szczególności e-mailem.
          </li>
          <li>
            Kancelaria może odmówić przedstawienia Oferty lub udzielenia e-porady, w szczególności:
            <ul>
              <li>w razie konfliktu interesów,</li>
              <li>gdy sprawa wymaga bezpośredniego zapoznania się z obszerną dokumentacją,</li>
              <li>
                gdy z innych przyczyn udzielenie porady byłoby sprzeczne z zasadami etyki radcy
                prawnego.
              </li>
            </ul>
          </li>
          <li>
            Po zawarciu umowy Kancelaria przesyła Klientowi na trwałym nośniku potwierdzenie jej
            zawarcia, nie później niż przed rozpoczęciem świadczenia usługi. Potwierdzenie zawiera
            dane do dokonania płatności oraz, w przypadku Konsumenta, potwierdzenie treści złożonego
            przez niego Oświadczenia o żądaniu wcześniejszego wykonania usługi.
          </li>
        </LegalList>
      </LegalSection>

      <LegalSection heading="§ 6. Cena i płatność">
        <LegalList ordered>
          <li>
            Cena e-porady wynosi 300 zł brutto (z VAT), chyba że w Ofercie wskazano inną cenę.
          </li>
          <li>
            Płatność następuje przelewem na rachunek bankowy wskazany w potwierdzeniu zawarcia
            umowy, w terminie w nim określonym, nie później niż przed terminem porady.
          </li>
          <li>Kancelaria wystawia fakturę lub rachunek.</li>
          <li>Kancelaria przystępuje do udzielenia e-porady po zaksięgowaniu wpłaty.</li>
          <li>
            Jeżeli Klient nie dokona płatności w terminie, Kancelaria wyznacza mu dodatkowy 3-dniowy
            termin do zapłaty. Po bezskutecznym upływie tego terminu Kancelaria może odstąpić od
            umowy (art. 491 § 1 Kodeksu cywilnego), o czym informuje Klienta na trwałym nośniku.
          </li>
        </LegalList>
      </LegalSection>

      <LegalSection heading="§ 7. Sposób i termin udzielenia e-porady">
        <LegalList ordered>
          <li>
            E-porada jest udzielana w uzgodnionym terminie i formie: telefonicznie, za pomocą
            wideokonferencji albo w formie pisemnej odpowiedzi.
          </li>
          <li>
            Porada jest udzielana na podstawie stanu faktycznego przedstawionego przez Klienta i
            przekazanych przez niego dokumentów. Kancelaria nie odpowiada za skutki podania
            niepełnych lub nieprawdziwych informacji.
          </li>
          <li>
            Informacje przekazane w ramach e-porady są objęte tajemnicą zawodową radcy prawnego
            (art. 3 ust. 3 ustawy o radcach prawnych).
          </li>
          <li>
            Jeżeli wpłata zostanie zaksięgowana po uzgodnionym terminie porady, strony ustalają nowy
            termin.
          </li>
          <li>
            W przypadku Konsumenta termin udzielenia e-porady ustala się z uwzględnieniem § 8 ust.
            7.
          </li>
        </LegalList>
      </LegalSection>

      <LegalSection heading="§ 8. Prawo odstąpienia od umowy (dotyczy Konsumentów)">
        <LegalList ordered>
          <li>
            Konsument może w terminie 14 dni od dnia zawarcia umowy odstąpić od niej bez podawania
            przyczyny (art. 27 ustawy z dnia 30 maja 2014 r. o prawach konsumenta).
          </li>
          <li>
            Aby odstąpić od umowy, Konsument składa jednoznaczne oświadczenie, np. e-mailem na adres{' '}
            <LegalEmail />. Może skorzystać z wzoru stanowiącego{' '}
            <a href="#zalacznik">Załącznik do Regulaminu</a>, ale nie jest to obowiązkowe. Do
            zachowania terminu wystarczy wysłanie oświadczenia przed jego upływem.
          </li>
          <li>
            Kancelaria zwraca płatność niezwłocznie, nie później niż w terminie 14 dni od otrzymania
            oświadczenia o odstąpieniu, przy użyciu takiego samego sposobu płatności, jakiego użył
            Konsument (art. 32 ustawy o prawach konsumenta).
          </li>
          <li>
            Konsument, który chce otrzymać e-poradę przed upływem terminu do odstąpienia od umowy,
            składa Oświadczenie o żądaniu wcześniejszego wykonania usługi. Oświadczenie składa się
            na trwałym nośniku, po otrzymaniu Oferty, wraz z akceptacją jej warunków. Oświadczenie
            nie może być złożone w formularzu kontaktowym.
          </li>
          <li>
            Jeżeli Konsument złożył Oświadczenie o żądaniu wcześniejszego wykonania usługi:
            <ul>
              <li>
                po pełnym wykonaniu usługi traci prawo odstąpienia od umowy (art. 38 ust. 1 pkt 1
                ustawy o prawach konsumenta);
              </li>
              <li>
                jeżeli odstąpi od umowy po rozpoczęciu, ale przed pełnym wykonaniem usługi, zapłaci
                za świadczenie spełnione do chwili odstąpienia (art. 35 ustawy o prawach
                konsumenta).
              </li>
            </ul>
          </li>
          <li>
            Złożenie Oświadczenia o żądaniu wcześniejszego wykonania usługi nie zwalnia Konsumenta z
            obowiązku zapłaty ceny na zasadach określonych w § 6.
          </li>
          <li>
            E-porada może zostać udzielona przed upływem terminu do odstąpienia od umowy wyłącznie
            wtedy, gdy Konsument złożył Oświadczenie o żądaniu wcześniejszego wykonania usługi.
            Jeżeli Konsument go nie złożył, Kancelaria udziela e-porady nie wcześniej niż po upływie
            14 dni od dnia zawarcia umowy.
          </li>
          <li>
            Oświadczenie o żądaniu wcześniejszego wykonania usługi ma następującą treść: „Żądam
            udzielenia e-porady przed upływem 14-dniowego terminu do odstąpienia od umowy i
            przyjmuję do wiadomości, że po jej pełnym wykonaniu utracę prawo odstąpienia od umowy.”
          </li>
          <li>
            Prawo odstąpienia od umowy, o którym mowa w niniejszym paragrafie, nie przysługuje
            Klientowi, który nie jest Konsumentem.
          </li>
        </LegalList>
      </LegalSection>

      <LegalSection heading="§ 9. Reklamacje">
        <LegalList ordered>
          <li>
            Reklamacje dotyczące Serwisu lub e-porady można składać e-mailem albo pisemnie na adres
            do korespondencji. Reklamacja powinna zawierać dane kontaktowe Klienta oraz opis
            zastrzeżeń.
          </li>
          <li>
            Kancelaria rozpatruje reklamację w terminie 14 dni od jej otrzymania. Jeżeli reklamację
            złożył Konsument, a Kancelaria nie odpowie w tym terminie, uważa się, że uznała
            reklamację (art. 7a ustawy o prawach konsumenta).
          </li>
          <li>
            Konsument może skorzystać z pozasądowych sposobów rozpatrywania reklamacji, w
            szczególności z pomocy miejskiego lub powiatowego rzecznika konsumentów.
          </li>
          <li>
            Skargi dotyczące wykonywania zawodu przez radcę prawnego można kierować do Rzecznika
            Dyscyplinarnego właściwej Okręgowej Izby Radców Prawnych.
          </li>
        </LegalList>
      </LegalSection>

      <LegalSection heading="§ 10. Dane osobowe">
        <LegalP>
          Zasady przetwarzania danych osobowych określa{' '}
          <Link to={PATHS.rodo}>Polityka prywatności i plików cookies</Link> dostępna w Serwisie.
        </LegalP>
      </LegalSection>

      <LegalSection heading="§ 11. Postanowienia końcowe">
        <LegalList ordered>
          <li>
            Zakres pomocy prawnej wykraczający poza e-poradę, w szczególności prowadzenie sprawy,
            wymaga zawarcia odrębnej umowy.
          </li>
          <li>
            W sprawach nieuregulowanych w Regulaminie stosuje się przepisy prawa polskiego, w
            szczególności Kodeksu cywilnego, ustawy o prawach konsumenta, ustawy o świadczeniu usług
            drogą elektroniczną oraz ustawy o radcach prawnych.
          </li>
          <li>
            Postanowienia Regulaminu nie wyłączają ani nie ograniczają uprawnień Konsumenta
            wynikających z bezwzględnie obowiązujących przepisów prawa.
          </li>
          <li>Zmiana Regulaminu nie wpływa na umowy zawarte przed jej wejściem w życie.</li>
          <li>Regulamin obowiązuje od dnia 15.10.2026 r.</li>
        </LegalList>
      </LegalSection>

      <LegalSection id="zalacznik" heading="Załącznik – wzór formularza odstąpienia od umowy">
        <LegalP>
          (formularz należy wypełnić i odesłać tylko w przypadku chęci odstąpienia od umowy)
        </LegalP>
        <LegalP>
          Adresat: Kancelaria Radcy Prawnego Martyna Obecna, ul. Przykładowa 1, 00-000 Warszawa,
          e-mail: <LegalEmail />
        </LegalP>
        <LegalP>
          Ja/My(*) niniejszym informuję/informujemy(*) o moim/naszym(*) odstąpieniu od umowy o
          świadczenie następującej usługi: ………………………………………………………
        </LegalP>
        <LegalP>Data zawarcia umowy: ………………………………………………………</LegalP>
        <LegalP>Imię i nazwisko konsumenta(-ów): ………………………………………………………</LegalP>
        <LegalP>Adres konsumenta(-ów): ………………………………………………………</LegalP>
        <LegalP>
          Podpis konsumenta(-ów) (tylko jeżeli formularz jest przesyłany w wersji papierowej):
          ………………………………………………………
        </LegalP>
        <LegalP>Data: ………………………………………………………</LegalP>
        <LegalP>(*) Niepotrzebne skreślić.</LegalP>
      </LegalSection>
    </LegalPage>
  );
}
