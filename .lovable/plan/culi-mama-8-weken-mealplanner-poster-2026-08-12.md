# Culi Mama — 8-weken Mealplanner Poster

Een webpagina met de complete 8-wekenplanner voor eerste hapjes, in Culi Mama huisstijl, die je 1-op-1 kunt printen of opslaan als PDF-poster.

## Huisstijl

- Kleuren: `#ff4001` (oranjerood, accent/koppen), `#ffeb99` (zacht geel, vlakken), `#b7d9ff` (lichtblauw, tweede vlak), plus off-white achtergrond en donkere tekstkleur voor leesbaarheid.
- Typografie: Poppins voor alle lopende tekst en tabellen. Le Petit Cochon voor de titels — dit is geen Google Font, dus stuur het fontbestand (woff2/otf/ttf) door; tot die tijd gebruik ik Poppins in de koppen zodat er niets breekt.
- Logo: stuur je aan; ik plaats het linksboven in de posterkop en in de webheader. Zonder bestand zet ik voorlopig een tekstueel "culi mama" op dezelfde plek.

## Wat de pagina toont

Kop met logo, titel "Eerste hapjes — 8 wekenschema" en de leeftijdsindicatie 4-6 maanden.

Daaronder acht weekblokken, elk met:
- Weeknummer + thema (Wennen, Pinda-introductie, Ei-introductie, Mengen, etc.)
- Een raster van 7 dagen (ma t/m zo) als kaarten
- Per dag: hapje 1 (fruit) en/of hapje 2 (groente), met per hapje de portiegrootte in ijsblokjes (1x / 2x) en de exacte allergeen-hoeveelheid waar die geldt (½ tl pindakaas, 1 el ei, ¼ ei, ...)
- Allergenen visueel gemarkeerd met een eigen kleurstip/label: pinda en ei elk een vaste kleur uit het palet, zodat je in één oogopslag ziet welke dag een allergeendag is
- Voetnoten per week waar die in het schema staan (banaan/kiwi vers prakken, opbouwdagen ma-wo aaneengesloten, terug naar 1 ijsblokje mag)

Bovenaan een compacte strook met de basisregels en de officiële opbouwschema's voor pinda en ei (dag 1/2/3 + onderhoud), plus een legenda voor de portie- en allergeeniconen.

Onderaan een korte disclaimer-regel over reactie/huisarts en overleg bij eczeem of allergie in de familie.

## Printen

Knop "Download / print poster" die de browser-printdialoog opent. Print-CSS zorgt dat het geheel op staand A2 past (en netjes schaalt naar A3/A4), zonder navigatie of knoppen, met volledige kleurweergave en zonder weekblokken die over een paginarand vallen.

## Niet in scope

Boodschappenlijst en preptips laat ik weg — die stonden niet in je selectie. Zeg het als je ze alsnog in een zijkolom wilt.

## Technisch

- Eén route (`/`) die de placeholder vervangt; schema-data in een los databestand zodat tekstwijzigingen makkelijk zijn.
- Palet en fonts als design tokens in `src/styles.css`, Poppins via Google Fonts link in de root route.
- Poster-, week- en dagkaart als aparte componenten; print-layout via een `@media print` blok.
- Geen backend nodig.
