import { useTheme } from '../useTheme.js'

/** Sun/moon button that flips the app between light and dark. */
export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[15px] text-[var(--text-secondary)] hover:text-[var(--brand-link)]"
    >
      {isDark ? '☀️' : '🌙'}
    </button>
  )
}
