# Green Hill Zone - A Figma Starter Pack

The goal of this repo & related files is to provide a healthy starter pack for new joiners, to play around with and experiment while onboarding on the Figma ecosystem. 
This is linked to the [Green Hill Design System File](https://www.figma.com/design/MZEnA8pImq1ffqpPgQCzCZ/COPY-ME---Green-Hill-%E2%80%94-Design-System?node-id=0-1&p=f&t=ag0zJz3irrjAvTHQ-0 "COPY ME - Green Hill - Design System in CES Org") & the [Green Hill App Screens File](https://www.figma.com/design/wo6sV16gT4kNbl62wiByi8/COPY-ME---Green-Hill-%E2%80%94-App-Screens?node-id=0-1&p=f&t=Wy8sv5EJLxKOhYzi-0 "COPY ME - Green Hill - App Screens in CES Org")

# How to get started?

1 - Copy this Repo to your private github, so you can play around and commit changes without breaking this template
2 - Copy the two files in CES Org (or save them locally, then import in your private Sandbox)
3 - Update the .env-example file:
   - Add your own personal access token
   - update the name to remove "-example"
   - 



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

React 18 + Vite + React Router + Tailwind. Theming is plain CSS custom
properties in a two-tier token layer — raw primitives, then semantic tokens
that alias them — across four modes: light, dark, 16-bit and 32-bit
(see `src/index.css`).

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

`BigButton`, `CardThing`, `InputField`, `Select`, `NavBar`, `TableV2`, `ThemeToggle`,
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
3. ~~Wire up **Code Connect**~~ — done. See `src/figma/README.md`.

   Use **template files**, not the parser-based `.figma.tsx` /
   `figma.connect()` format — Figma has deprecated framework-specific parsers
   and they receive no further updates or support. Code Connect also requires
   the components to be published to a team library, on an Organization or
   Enterprise plan.
