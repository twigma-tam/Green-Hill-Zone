/**
 * Select with label, help text, and an error state.
 *
 * Extracted from SettingsScreen (data region) and TeamMembersScreen (invite
 * role), which had been hand-rolling the same <select> with an identical class
 * string. The prop API deliberately mirrors InputField, so the two form
 * controls are interchangeable from a screen's point of view.
 *
 * Renders a native <select>: keyboard behaviour, mobile pickers, and screen
 * reader support all come free, and none of them are worth reimplementing.
 */
export function Select({
  label,
  id,
  value,
  onChange,
  options = [],
  disabled = false,
  required = false,
  error,
  helpText,
}) {
  const describedById = error ? `${id}-error` : helpText ? `${id}-help` : undefined

  return (
    <div className="mb-4">
      <label htmlFor={id} className="mb-2 block text-14 font-semibold text-[var(--text)]">
        {label}
        {required && (
          <span aria-hidden="true" className="ml-1 text-[var(--danger)]">
            *
          </span>
        )}
      </label>
      <select
        id={id}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedById}
        className="w-full rounded-md border bg-[var(--surface)] px-3 py-2 text-14 text-[var(--text-strong)] outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50"
        style={{
          borderColor: error ? 'var(--danger)' : 'var(--border-strong)',
          '--tw-ring-color': error ? 'var(--danger)' : 'var(--brand-link)',
        }}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error ? (
        <p id={`${id}-error`} className="m-0 mt-1.5 text-12 font-medium text-[var(--danger)]">
          {error}
        </p>
      ) : helpText ? (
        <p id={`${id}-help`} className="m-0 mt-1.5 text-12 text-[var(--text-muted)]">
          {helpText}
        </p>
      ) : null}
    </div>
  )
}
