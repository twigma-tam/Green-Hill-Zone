# Green Hill

A small, realistic internal ops tool — dashboard, billing/invoices, AR aging,
team & access, integrations, reports, and settings. Built to be a clean,
independent base for a Figma "what best looks like" reference package: a
matching **Design System** file, an **App Screens** file built from that
system's components, and this codebase wired up with **Code Connect**.

Named after Green Hill Zone — the tutorial level every Sonic the Hedgehog
player learns the game on. This is that: the level new TAMs run through to
learn the ecosystem, before they head into the real thing.

It is intentionally small and has no backend: all data is static and held in
component state, so there's nothing to time out, fail to load, or flake in a
live demo.

## Provenance

This project's structure and component set are based on an internal
"brownfield" training exercise (a deliberately messy app used to practice
spotting and fixing code issues). All five documented issues from that
exercise have been fixed here, several missing UI states have been added,
and this repo is otherwise fully independent going forward — it is not
synced with or dependent on the original training repo.

## Stack

React 18 + Vite + React Router + Tailwind, plain CSS variables for
light/dark theming (see `src/index.css`).

## Curriculum structure

- **Act 1 — Foundations & Fidelity**: Design System, Dev Mode, Code Connect
- **Act 2 — AI & Exploration**: Make Kits, Make Local, Code Layers
- **Special Stage**: optional/advanced material (e.g. legacy-retrofit exercises)

## Screens

- **Dashboard** (`/dashboard`) — overview stats + recent accounts table
- **Billing & invoices** (`/billing`) — invoice table, record-payment confirm dialog
- **AR aging** (`/billing/aging`) — receivables aging buckets
- **Team & access** (`/team`) — member list, invite-user form dialog
- **Integrations** (`/integrations`) — connected tools, a failed-sync banner example
- **Reports** (`/reports`) — empty state (no data connected yet)
- **Settings** (`/settings`) — workspace form, toggles, disabled-button validation

## Components

`BigButton`, `CardThing`, `InputField`, `NavBar`, `TableV2`, `ThemeToggle`,
`ToggleSwitch`, plus `StatusBadge`, `InlineBanner`, `EmptyState`, and `Modal`
— covering the states an enterprise ops screen actually needs: success/
warning/danger status, inline errors, empty data, and confirm/form dialogs.

## Getting started

```bash
npm install
npm run dev
```

## Next steps for the ecosystem

1. Build the Figma **Design System** file from these components/tokens.
2. Build the Figma **App Screens** file using that design system.
3. Wire up **Code Connect** (`figma.config.json` + `.figma.tsx` per component).
