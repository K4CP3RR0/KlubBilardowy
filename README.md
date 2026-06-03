# Klub Bilardowy

[](https://bilard.kacpercichorski.tech)
[](https://github.com/K4CP3RR0/KlubBilardowy/actions)
[](https://react.dev/)
[](https://www.typescriptlang.org/)

Strona internetowa klubu bilardowego budowana na potrzeby projektu z przedmiotu Systemy informatyczne - cennik, kontakt z mapą, logowanie użytkowników oraz panele dla klientów i pracowników.

**Demo:** [bilard.kacpercichorski.tech](https://bilard.kacpercichorski.tech)

## Funkcje

- Strona główna klubu
- Cennik usług
- Kontakt z mapą (Mapbox)
- Rejestracja i logowanie (Supabase)
- Panel użytkownika i panel pracownika
- Rezerwacje *(w przygotowaniu)*

## Stos technologiczny

- React 19 + TypeScript
- Vite 7
- Tailwind CSS 4
- React Router
- Supabase
- Mapbox GL / react-map-gl

## Wymagania

- Node.js 20+
- npm
- Konto Supabase
- Token Mapbox (dla strony kontaktu)

## Instalacja

```bash
git clone https://github.com/K4CP3RR0/KlubBilardowy.git
cd KlubBilardowy
npm install
```

Utwórz plik `.env` w katalogu głównym:

```env
VITE_SUPABASE_URL=twoj_url_supabase
VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY=twoj_klucz_supabase
VITE_MAPBOX_TOKEN=twoj_token_mapbox
```

## Uruchomienie

Tryb deweloperski:

```bash
npm run dev
```

Budowanie produkcyjne:

```bash
npm run build
npm run preview
```

Lint:

```bash
npm run lint
```

## Struktura projektu

```
src/
├── components/     # Navbar, Footer, TableCard, Popover
├── hooks/          # useTitle
├── utils/          # konfiguracja Supabase
├── App.tsx         # strona główna
├── Cennik.tsx
├── Kontakt.tsx
├── Logowanie.tsx
├── Rejestracja.tsx
├── Rezerwacje.tsx
├── PanelUzytkownika.tsx
└── PanelPracownika.tsx
```

## Wdrożenie

Projekt jest automatycznie budowany i wdrażany przez GitHub Actions na self-hosted runnerze (`pm2` + `npm run preview`).

## Autorzy

- [Kacper Cichorski](https://github.com/K4CP3RR0)
- [Oliwier Chomski](https://github.com/realfaux)
