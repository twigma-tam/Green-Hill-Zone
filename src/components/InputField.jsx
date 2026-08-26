/**
 * Text input with label.
 * Training note: uses `labelText` instead of the more common `label` prop name.
 */
export function InputField({ labelText, id, value, onChange, placeholder }) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="mb-2 block text-sm font-semibold text-[var(--text)]">
        {labelText}
      </label>
      <input
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-md border border-[var(--border-strong)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--text-strong)] outline-none focus:ring-2 focus:ring-[var(--brand-link)]"
      />
    </div>
  )
}
