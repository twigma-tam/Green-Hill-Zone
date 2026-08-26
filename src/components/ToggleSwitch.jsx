/** Boolean toggle used on Settings. Props follow the HTML input convention
 *  (`checked` / `onChange`) so it reads consistently with other form controls. */
export default function ToggleSwitch({ checked, onChange }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="relative h-[26px] w-[46px] shrink-0 cursor-pointer rounded-full border-0 p-0.5"
      style={{ backgroundColor: checked ? 'var(--success)' : 'var(--border-strong)' }}
    >
      <span
        className="block h-[22px] w-[22px] rounded-full bg-white transition-[margin] duration-150"
        style={{ marginLeft: checked ? 20 : 0 }}
      />
    </button>
  )
}
