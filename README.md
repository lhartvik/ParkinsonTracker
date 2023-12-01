# ParkinsonTracker

Et verktøy for å registrere når man tar tabletter og hvor mye man skjelver gjennom dagen.

## Lagrer vibrasjonsdata
Lagrer så mange målepunkter som tas i løpet av 10 sekunder. Avhenger av telefon. Jeg får ca 250 målepunkter.

## Viser et estimat på hvor mye man skjelver
Trekker fra gjennomsnittet, viser gjennomsnittlig absoluttverdi etter det.

## Lagrer Pilledata
Lagrer tidspunkt for hver pille man tar så man kan se om det er noen korrelasjon mellom skjelving og medisinbruk

## Laster opp til Firebase
Når man først tar opptak av vibrasjonsdata holdes det i komponenten. Deretter kan det lagres på telefonen hvis man velger å beholde opptaket, og når man ønsker kan det senere overføres til skyen.
Tidspunkter for piller, hvilket legemiddel og styrke lagres rett på telefonens AsyncStorage og kan lastes opp senere sammen med de andre dataene.

# Android
## Google-services.json
For å kunne koble til Firebase må man legge denne fila fra Firebase inn i android/app-folderen. Man må selv starte et prosjekt der og laste ned denne filen Settings/project settings My apps er det nedlastingslenke.

## Feil
Error: spawn ./gradlew EACCES
at ChildProcess._handle.onexit (node:internal/child_process:283:19)
at onErrorNT (node:internal/child_process:476:16)
at process.processTicksAndRejections (node:internal/process/task_queues:82:21)
### Løsning
chmod a+rx android/gradlew

# Videre analyse av de lagrede dataene
[Annet repo med litt Python og litt Java](https://github.com/lhartvik/fftshakedatautkast)


# Installasjon
Inntil jeg får lagt det ut på Android store må man installere Android Studio og deploye appen til telefon, som har aktivert utviklermodus og åpnet tilgang.

# Iphone
Ikke støttet ennå

