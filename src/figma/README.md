# Code Connect — Green Hill

## Format

These are **parserless template files** (`.figma.ts` exporting a `figma.code` tagged
template). This is the only actively maintained Code Connect format.

Do **not** add `.figma.tsx` files using `figma.connect()`. Figma has deprecated
framework-specific parsers; they receive no further updates or support. The
project brief originally specified `.figma.tsx` — that instruction is out of date.

## Publishing

Two things are connected, and they are not the same:

1. **Simple mappings — already live.** Every component in the Design System file
   is linked to its source path, so Dev Mode shows which file backs each
   component. These were registered over MCP.

2. **Dynamic templates — need the CLI.** The prop-aware snippets in this folder
   (the ones that turn `Variant=ghost, Size=sm` into
   `<BigButton variant="ghost" size="sm">`) must be published with the Code
   Connect CLI, which needs network access and a Figma token:

```bash
npm install
cp .env-example .env   # then fill in FIGMA_ACCESS_TOKEN and FIGMA_FILE_KEY
npm run figma:publish
```

Verify with `npm run figma:parse` first — it type-checks every template
without publishing.

## Repointing at a copy of the Design System file

Every template's `// url=` comment uses a placeholder instead of a literal file
key:

```
// url=https://www.figma.com/design/{{DESIGN_SYSTEM_FILE_KEY}}/Green-Hill-Design-System?node-id=23-50
```

`FIGMA_FILE_KEY` in `.env` is the single source of truth for that placeholder.
`npm run figma:parse` / `figma:publish` / `figma:unpublish` all run
`scripts/generate-figma-config.js` first, which reads `FIGMA_FILE_KEY` and
writes `.figma.config.generated.json` (gitignored, not committed) — a copy of
`figma.config.json` with the real key substituted in — then point the CLI at
it via `--config`. To connect this repo to a duplicate of the Design System
file, change `FIGMA_FILE_KEY` in `.env`; nothing else needs to change.

Do **not** run `npx figma connect parse|publish` directly — it'll use
`figma.config.json`'s committed placeholder value and fail. Always go through
the `npm run figma:*` scripts.

Note: the underlying mechanism, `documentUrlSubstitutions`, is a real,
functional option in the Code Connect CLI, but it's undocumented in Figma's
public docs — a future CLI upgrade could change or drop it without notice.
Re-run `npm run figma:parse` after any `@figma/code-connect` version bump to
confirm it still resolves.

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
