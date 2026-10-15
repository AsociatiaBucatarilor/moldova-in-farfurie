# Moldova în Farfurie

Landing page pentru proiectul „Moldova în Farfurie” by Chef's Forum, construit pe Payload CMS 3 + Next.js 15,
pornind de la exemplul oficial de localizare. Limbi: română (`/`), rusă (`/ru`), engleză (`/en`).

## Pornire locală

```bash
pnpm install
pnpm dev           # http://localhost:3000, admin la /admin
pnpm seed          # încarcă conținutul din design (32 de raioane, imagini, texte ro/ru/en)
```

Baza de date: Postgres local, setat prin `DATABASE_URL` în `.env` (vezi `.env.example`).
Alternativ, Postgres în Docker: `docker compose up -d` și `DATABASE_URL` din comentariul din `docker-compose.yml`.

## Conținut în admin

- **Raioane** — câte un document pe raion: zona (Nord/Centru/Sud), conturul de pe hartă, linkurile YouTube
  pentru episod și teaser, copertă, „Locuri și patrimoniu”, „La masa locului”, obiective și gastronomie.
  Fără link YouTube, pop-up-ul afișează „în curând”.
- **Pagina principală** (global) — hero și trailer, textele hărții, grila de raioane, citat, parteneri, footer.

Textele de interfață (butoane, etichete) sunt în `src/i18n/messages/*.json`.

## Harta

`src/components/landing/mapShapes.ts` conține contururile SVG ale celor 37 de unități administrative,
generate din [geoBoundaries](https://www.geoboundaries.org/) (CC BY 4.0). Unitățile fără document în
colecția Raioane (Chișinău, Bălți, Bender, UTA Găgăuzia, Stînga Nistrului) apar gri și nu sunt clicabile.
