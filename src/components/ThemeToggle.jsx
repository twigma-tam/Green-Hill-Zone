import { useTheme } from '../useTheme.js'

const NEXT_LABEL = {
  light: 'Switch to dark mode',
  dark: 'Switch to 16-bit mode',
  '16bit': 'Switch to 32-bit mode',
  '32bit': 'Switch to light mode',
}

const ICON = {
  light: '🌙',
  dark: '👾',
  '16bit': '🕹️',
  '32bit': '☀️',
}

/** Cycles display mode: light → dark → 16-bit → 32-bit → light. */
export default function ThemeToggle() {
  const { mode, cycleMode } = useTheme()

  return (
    <button
      type="button"
      onClick={cycleMode}
      aria-label={NEXT_LABEL[mode]}
      title={NEXT_LABEL[mode]}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[15px] text-[var(--text-secondary)] hover:text-[var(--brand-link)]"
    >
      {ICON[mode]}
    </button>
  )
}
