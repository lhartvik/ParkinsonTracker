# ParkinsonTracker

Et verktøy for å registrere når man tar tabletter og hvor mye man skjelver gjennom dagen.

## Lagrer vibrasjonsdata
Lagrer så mange målepunkter som tas med et visst antall millisekunder i løpet av 10 sekunder

## Viser et estimat på hvor mye man skjelver
Trekker fra gjennomsnittet, viser gjennomsnittlig absoluttverdi etter det. Det er meningen å lage et verktøy som henter ut bølgelengdene signalet består av og analysere og separere hva som kan være pust, blodtrykk, og annet, fra signalet som er et symptom på Parkinson.

## Lagrer Pilledata
Lagrer tidspunkt for hver pille man tar så man kan se om det er noen korrelasjon mellom skjelving og medisinbruk

## Laster opp til Firebase
Når man først tar opptak av vibrasjonsdata holdes det i komponenten. Deretter kan det lagres på telefonen, og når man ønsker kan det overføres til skyen.
Tidspunkter for piller lagres rett på telefonens AsyncStorage og kan lastes opp senere.

## Google-services.json
For å kunne koble til Firebase må man legge en fil fra Firebase inn i android/app-folderen. Man må selv starte et prosjekt der og laste ned denne filen Settings/project settings My apps er det nedlastingslenke.
