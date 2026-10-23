# Moldova în Farfurie

Landing page pentru proiectul „Moldova în Farfurie” by Chef's Forum, construit pe Payload CMS 3 + Next.js 15,
pornind de la exemplul oficial de localizare. Limbi: română (`/`), rusă (`/ru`), engleză (`/en`).

## Pornire locală

```bash
pnpm install
pnpm dev           # http://localhost:3000, admin la /admin
pnpm seed          # încarcă conținutul din design (32 de raioane, imagini, texte ro/ru/en) — resetează conținutul!
pnpm seed:legal    # completează doar politicile legale și titlul partenerilor (sigur pe producție)
```

## Conturi de administrator

Comenzile întreabă datele în terminal (parola se afișează ca `*` și nu se salvează nicăieri).
Lucrează pe baza din `DATABASE_URL`; pentru producție, în PowerShell:

```bash
$env:DATABASE_URL="<DATABASE_URL Neon din Vercel>"; $env:NODE_ENV="production"; pnpm create-user
```

- `pnpm create-user` — creează un cont nou (nume, email, parolă);
- `pnpm reset-password` — setează o parolă nouă unui cont existent și îl deblochează.

După 10 parole greșite la rând contul se blochează 5 minute; numărătoarea se resetează la
autentificarea reușită și când expiră blocarea.

## Migrații (producție)

Local, schema bazei se actualizează automat. Pentru producție, după orice schimbare de câmpuri:

```bash
pnpm migrate:create nume_schimbare
```

Vercel rulează `payload migrate` la fiecare deploy (scriptul `vercel-build`). Verificați fișierul generat:
scoateți liniile `ALTER COLUMN "prefix" SET/DROP DEFAULT 'local'` (vin din prefixul local al Vercel Blob)
și evitați să ștergeți tabele/coloane încă citite de versiunea live — migrația rulează înainte ca noul
deploy să devină activ.

Baza de date: Postgres local, setat prin `DATABASE_URL` în `.env` (vezi `.env.example`).
Alternativ, Postgres în Docker: `docker compose up -d` și `DATABASE_URL` din comentariul din `docker-compose.yml`.

## Conținut în admin

- **Raioane** — câte un document pe raion: zona (Nord/Centru/Sud), conturul de pe hartă, linkurile YouTube
  pentru episod și teaser, copertă, „Locuri și patrimoniu”, „La masa locului”, obiective și gastronomie.
  Fără link YouTube, pop-up-ul afișează „în curând”.
- **Pagina principală** (global) — hero și trailer, textele hărții, grila de raioane, citat, parteneri, footer și contacte.
- **Politici legale** (global) — Politica de confidențialitate (`/politica-de-confidentialitate`) și Politica de cookie-uri
  (`/politica-cookie`). Textele inițiale sunt un draft conform Legii nr. 133/2011 și trebuie verificate de un jurist.

Videoclipurile YouTube se încarcă doar după consimțământul vizitatorului (bannerul de cookie-uri).

Textele de interfață (butoane, etichete) sunt în `src/i18n/messages/*.json`.

## Harta

`src/components/landing/mapShapes.ts` conține contururile SVG ale celor 37 de unități administrative,
generate din [geoBoundaries](https://www.geoboundaries.org/) (CC BY 4.0). Unitățile fără document în
colecția Raioane (Chișinău, Bălți, Bender, UTA Găgăuzia, Stînga Nistrului) apar gri și nu sunt clicabile.
