import { useEffect, useState } from 'react'

/**
 * Cycles through four display modes — light, dark, and two retro modes
 * (16bit, 32bit) — keeping the matching class on <html> and localStorage in
 * sync. Initial value matches whatever the inline script in index.html
 * already applied, so there is no flash on load.
 */
const MODES = ['light', 'dark', '16bit', '32bit']
const CLASS_FOR_MODE = { light: null, dark: 'dark', '16bit': 'mode-16bit', '32bit': 'mode-32bit' }

function readInitialMode() {
  const root = document.documentElement
  if (root.classList.contains('mode-32bit')) return '32bit'
  if (root.classList.contains('mode-16bit')) return '16bit'
  if (root.classList.contains('dark')) return 'dark'
  return 'light'
}

export function useTheme() {
  const [mode, setMode] = useState(readInitialMode)

  useEffect(() => {
    const root = document.documentElement
    Object.values(CLASS_FOR_MODE).forEach((cls) => cls && root.classList.remove(cls))
    const cls = CLASS_FOR_MODE[mode]
    if (cls) root.classList.add(cls)
    try {
      localStorage.setItem('theme', mode)
    } catch {
      // ignore storage failures (private mode, etc.)
    }
  }, [mode])

  const cycleMode = () => setMode((m) => MODES[(MODES.indexOf(m) + 1) % MODES.length])

  return { mode, cycleMode }
}
