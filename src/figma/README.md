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


## Syntax highlighting in Dev Mode

Parserless templates (`.figma.ts` exporting `figma.code`) default to label
`Code`, and `Code` infers the language `plaintext` — so every published snippet
renders unhighlighted in Dev Mode, no matter that it is JSX. Two keys in
`figma.config.json` fix it:

```json
"label": "React",
"language": "jsx"
```

`label` is what Dev Mode shows above the snippet and groups mappings by;
`language` is the syntax highlighter. `language` overrides whatever the label
would have inferred, so set it explicitly rather than relying on the label.
Valid values are the ones Code Connect ships (`jsx`, `tsx`, `typescript`,
`javascript`, `swift`, `kotlin`, `html`, `css`, `dart`, `plaintext`, …) — an
unrecognised value fails the publish with a listed set of alternatives.

Verify with `npm run figma:parse`: every entry should report
`"label": "React"` and `"language": "jsx"`.


## Two mappings, one component

`BigButton`, `StatusBadge` and `Icon` each carry **two** Code Connect mappings.
Dev Mode shows them as tabs:

- **React** — `src/figma/`, published by `npm run figma:publish` (label `React`,
  language `jsx`)
- **HTML** — `src/figma-html/`, published by `npm run figma:publish:html`
  (label `HTML`, language `html`), backed by the real plain-CSS implementation
  in `web/green-hill.css`

A mapping is keyed by *(node, label)*, so the two coexist — publishing one never
overwrites the other. `npm run figma:publish:all` does both.

The second set needs its own config file because `label`, `language` and
`include` all differ; the CLI takes it via `--config figma.config.html.json`.
Parserless templates have no per-file label directive — the only directives are
`url=`, `component=` and `source=` — so this is the supported way to publish more
than one mapping from one repo.

Note what the HTML `BigButton` template has to do to read its icon's glyph name:
an `InstanceHandle` has no `getEnum`, so `src/figma-html/Icon.figma.ts` publishes
the name through `metadata.props` and the parent reads
`icon.executeTemplate().metadata?.props?.name`. A child's metadata is only
visible to a parent when the child is `nestable` **and** published under the same
label — which is why there is an HTML `Icon` template at all.

### What parserless templates cannot do

There is no `links` field. The parserless export is only
`{ example, id, imports, metadata: { nestable, props } }`, so Code Connect's
documentation-links feature is unavailable here. Use Figma **annotations** on the
component layers instead — this file does, on the BigButton icon slot, the
PageHeader slots, SettingRow's exposed toggle, the Avatar image fill, the
CardThing title truncation and the StatGrid minimum width.

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
| `PageHeader.Has Icon` | `icon` | BOOLEAN gating an INSTANCE_SWAP slot |
| `PageHeader.Icon` | `icon` | INSTANCE_SWAP; preferred values are the 6 Icon glyphs |
| `PageHeader.Has Badge` | `badge` | BOOLEAN; tone lives on the nested StatusBadge |
| `PageHeader.Actions` | `actions` | real SLOT — arbitrary content, read with `getSlot()` |
| `SettingRow` nested `ToggleSwitch` | `checked` / `disabled` | EXPOSED nested instance; the switch's own props surface on the row |
| `SettingRow.Control` | `control` | SLOT; default content is the exposed `ToggleSwitch` — untouched it's a boolean row |
| `Icon.Name` | `name` | one axis, one glyph — never a variant per icon |
| `BigButton.Has Icon` / `.Icon` | `icon` | BOOLEAN + INSTANCE_SWAP; renders at 16px, inherits label colour |
| `Avatar.Has Image` | `src` | `true` emits `src`; `false` falls back to initials derived from `name` |
| `Avatar.Size` | `size` | 24 / 32 / 40 px ramp, not a spacing token |
| `Avatar.Initials` | — | code derives initials from `name`; the property exists only because Figma can't |
| `StatGrid.Columns` | `columns` | GRID auto-layout; children carry `minWidth: 180` |

Every VARIANT is mapped **exhaustively**. An unmapped variant value silently
returns `undefined` and emits a broken snippet — that is the single most common
Code Connect defect, so the pseudo-class states are mapped explicitly to the
same output as `default` rather than omitted.
