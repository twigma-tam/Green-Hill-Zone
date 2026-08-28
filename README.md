# Green Hill Zone - A Figma Starter Pack

The goal of this repo & related files is to provide a healthy starter pack for new joiners, to play around with and experiment while onboarding on the Figma ecosystem. 
This is linked to the [Green Hill Design System File](https://www.figma.com/design/MZEnA8pImq1ffqpPgQCzCZ/COPY-ME---Green-Hill-%E2%80%94-Design-System?node-id=0-1&p=f&t=ag0zJz3irrjAvTHQ-0 "COPY ME - Green Hill - Design System in CES Org") & the [Green Hill App Screens File](https://www.figma.com/design/wo6sV16gT4kNbl62wiByi8/COPY-ME---Green-Hill-%E2%80%94-App-Screens?node-id=0-1&p=f&t=Wy8sv5EJLxKOhYzi-0 "COPY ME - Green Hill - App Screens in CES Org")


# Get Started

1. Clone this Repo, so you can play around and commit changes without breaking this template
2. Copy the two files in CES Org (or save them locally, then import in your private Sandbox)
3. Move your Design System file out of drafts and into a folder, then Publish as a Library
4. Your copy of Green Hill - App Screens is still wired to the original file's library (boo :( ) - Run the AI Agent to swap every component instance to the new library component:
    - Attach a link to your version of the Design System file
    - Use this prompt (or your own version): 
    
       > Go through this file and update ALL the components to leverage the ones published in <COPY ME - Green Hill - Design System>
       
    - Check: click on components on the App Screen file - they should now be pulled from your library, and show as NOT CodeConnected yet. That's expected!

5. Go to your code and update the .env-example file:
   - Add your own personal access token
   - Add your file key (big number string in the URL of your **new Design System** file)
   - update the name to remove "-example"
6. Connect this repo's Code Connect setup to your copy of the Design System
   - Update the urls in `figma.config.json` to point to your file
   - The file key (e.g. `7B95vlwukQ3hKs4G4WH5P5`) should be the **only** change you do (do not touch the node IDs), unless you're creating new components, or detaching and recreating existing ones
   - Set up your `.env` (see above)
   - Run `npm run figma:publish` should now work against your copy
 7. To view this app, run the below: 
      ```bash
      npm install
      npm run dev
      ```






# Some More Info

## documentUrlSubstitutions

This repo uses the same pattern as Figma's [Simple Design System
(SDS)](https://github.com/figma/sds): every template's `// url=` comment is a
placeholder, not a literal Figma URL —

```
// url=<FIGMA_BIG_BUTTON>
```

— and `figma.config.json`'s `documentUrlSubstitutions` maps each placeholder to
its real `https://www.figma.com/design/<file key>?node-id=<node id>`. This
keeps templates file-agnostic and colocates every Figma-file-specific value in
one place, named so you can find the component without following a link:
`<FIGMA_[GROUP]_[COMPONENT]>`.

For more info about how this works, see [Configuring
your project](https://developers.figma.com/docs/code-connect/api/config-file/).


## What each template maps

| Figma property | Code prop | Notes |
|---|---|---|
| `BigButton.State=disabled` | `disabled` | hover/pressed are `:hover` / `:active`, no prop |
| `InputField.State=error` | `error` | focus is `focus:ring-2`, no prop |
| `InputField.State=disabled` | `disabled` | |
| `InputField.Has Message` | `error` **or** `helpText` | one slot, never both |
| `InlineBanner.Has Action` | `action` | BOOLEAN property, not a variant axis |
| `InlineBanner.Has Description` | `description` | VARIANT axis (`"true"`/`"false"`) |
| `TableV2 / Row.State=selected` | `selectedId` matches the row id | hover has no prop |
| `TableV2 / Header Cell.Sort` | `headers` entry shape | `off` → plain string; others → `{ label, key }` |
| `NavItem.Active` | `active` | real prop; NavBar derives it from `useLocation()` |
| `ThemeToggle.Mode` | — | no prop; the component reads `useTheme()` itself |

Every VARIANT is mapped **exhaustively**. An unmapped variant value silently
returns `undefined` and emits a broken snippet — that is the single most common
Code Connect defect, so the pseudo-class states are mapped explicitly to the
same output as `default` rather than omitted.


# About this App

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
Also note that the overall structure of the Simple Design System repo where reused to achieve best practices around flexible URL usage & copying of files.

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


