/** Boolean toggle used on Settings. Props follow the HTML input convention
 *  (`checked` / `onChange`) so it reads consistently with other form controls.
 *
 *  `disabled` covers the common settings case where a toggle depends on
 *  something else — a plan tier, a permission, another switch being on. A
 *  disabled toggle still reports its checked state to assistive tech; it just
 *  refuses to change it. */
export default function ToggleSwitch({ checked, onChange, disabled = false, label, labelledBy }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={labelledBy ? undefined : label}
      aria-labelledby={labelledBy}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      className="relative h-[26px] w-[46px] shrink-0 rounded-full border-0 p-0.5 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
      style={{
        backgroundColor: checked ? 'var(--success)' : 'var(--border-strong)',
        cursor: disabled ? 'not-allowed' : 'pointer',
      }}
    >
      <span
        className="block h-[22px] w-[22px] rounded-full bg-white transition-[margin] duration-150"
        style={{ marginLeft: checked ? 20 : 0 }}
      />
    </button>
  )
}
