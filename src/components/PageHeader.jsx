/** The title block every screen opens with.
 *
 *  This is a composition, not a new visual: it is the `<h1>` + subtitle pair
 *  the pages were each hand-rolling, plus three slots for other design system
 *  components — an `Icon`, a `StatusBadge`, and one or more `BigButton`s.
 *
 *  All three are slots (`icon`, `badge`, `actions`) rather than flattened
 *  props. PageHeader decides *where* a badge goes and how much room the
 *  actions get; it deliberately does not decide which tone the badge is or
 *  what the button says. That split is what keeps it composable: a screen can
 *  pass any StatusBadge tone, or two buttons instead of one, without
 *  PageHeader growing a prop for each case. It mirrors how the Figma component
 *  exposes these as instance-swap slots with preferred values instead of as
 *  extra variant axes.
 */
export function PageHeader({ title, description, icon, badge, actions }) {
  return (
    <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          {icon && <span className="text-[var(--brand)]">{icon}</span>}
          <h1 className="m-0 text-24 font-semibold text-[var(--text)]">{title}</h1>
          {badge}
        </div>
        {description && (
          <p className="mb-0 mt-2 text-14 text-[var(--text-secondary)]">{description}</p>
        )}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-3">{actions}</div>}
    </div>
  )
}
