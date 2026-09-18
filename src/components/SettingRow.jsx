import { useId } from 'react'
import ToggleSwitch from '@/components/ToggleSwitch.jsx'

/** A labelled row wrapping one control — the shape Settings repeats for every
 *  switch on the screen.
 *
 *  Unlike PageHeader, the control here is *not* a slot. SettingRow owns a
 *  ToggleSwitch and re-publishes its two interesting properties — `checked`
 *  and `disabled` — as its own props. That buys the accessibility wiring:
 *  the visible title gets a generated id and the switch is pointed at it via
 *  `labelledBy`, so the row cannot be assembled with the label and the control
 *  disconnected. Screens previously had to remember to do that by hand.
 *
 *  This is the code-side twin of Figma's *exposed nested instance properties*:
 *  one nested instance, whose properties surface on the parent rather than
 *  being re-declared there.
 *
 *  `control` is the escape hatch for the rows that need something other than a
 *  switch (a Select, a link button). When it is supplied, `checked`/`onChange`
 *  are ignored — the caller owns the control outright.
 */
export function SettingRow({
  title,
  description,
  checked,
  onChange,
  disabled = false,
  control,
}) {
  const labelId = useId()

  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div className="min-w-0">
        <div id={labelId} className="text-14 font-semibold text-[var(--text)]">
          {title}
        </div>
        {description && (
          <div className="mt-1 text-12 text-[var(--text-muted)]">{description}</div>
        )}
      </div>
      {control ?? (
        <ToggleSwitch
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          labelledBy={labelId}
        />
      )}
    </div>
  )
}
