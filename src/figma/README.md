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
cp .env-example .env   # then fill in FIGMA_ACCESS_TOKEN
npm run figma:publish
```

Verify with `npm run figma:parse` first — it type-checks every template
without publishing.

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

This is a real, documented option in the Code Connect CLI — see [Configuring
your project](https://developers.figma.com/docs/code-connect/api/config-file/).

## Connecting this repo to a duplicated Figma file

Node-ids survive a Figma file **duplicate** (confirmed empirically against a
copy of this Design System file — every one of the 16 node-ids below resolved
to the identical component). So:

- Duplicate the Design System file
- Update the urls in `figma.config.json` to point to your file
  - The file key (e.g. `7B95vlwukQ3hKs4G4WH5P5`) should be the only change
    needed, unless you're creating new components, or detaching and
    recreating existing ones
- Set up your `.env` (see above)
- `npm run figma:publish` should now work against your copy

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
