import { useEffect, useState } from 'react'

/**
 * Reads/writes the active theme ('light' | 'dark'), keeping the `dark` class on
 * <html> and localStorage in sync. Initial value matches whatever the inline
 * script in index.html already applied, so there is no flash on load.
 */
export function useTheme() {
  const [theme, setTheme] = useState(() =>
    document.documentElement.classList.contains('dark') ? 'dark' : 'light',
  )

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', theme === 'dark')
    try {
      localStorage.setItem('theme', theme)
    } catch {
      // ignore storage failures (private mode, etc.)
    }
  }, [theme])

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))

  return { theme, toggleTheme }
}
