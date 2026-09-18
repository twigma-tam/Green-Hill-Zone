/** The design system's only icon primitive.
 *
 *  Every glyph lives in one SVG sprite (`public/icons.svg`) and is referenced
 *  by id through `<use>`, so adding a glyph is a sprite edit, not a new React
 *  component. `name` is the single axis — in Figma this is the `Name` variant
 *  on the Icon component set, which keeps the two sides enumerating the same
 *  list.
 *
 *  The UI glyphs are authored with `stroke="currentColor"`, so an Icon takes
 *  the colour of whatever it sits inside rather than carrying its own. That is
 *  what makes it safe to drop into a button, a header, or a table cell in any
 *  of the four themes. `size` is a pixel number rather than a token because it
 *  tracks the optical size of the text beside it, not a spacing step.
 */

// The glyph set, in the same order as the `Name` variant on the Figma Icon
// component set. Kept as a comment rather than an export so this file stays a
// components-only module (see eslint react-refresh/only-export-components):
//   plus · check · download · alert · refresh · external

export function Icon({ name, size = 20, label }) {
  return (
    <svg
      width={size}
      height={size}
      aria-hidden={label ? undefined : 'true'}
      role={label ? 'img' : undefined}
      aria-label={label}
      className="shrink-0"
    >
      {label && <title>{label}</title>}
      <use href={`/icons.svg#${name}-icon`} />
    </svg>
  )
}
