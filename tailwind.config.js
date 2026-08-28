/** @type {import('tailwindcss').Config} */

/*
 * Tailwind's scales are re-pointed at the semantic CSS variables in
 * src/index.css. That means a utility class like `rounded-lg` or `shadow-sm`
 * resolves through the token layer instead of a hardcoded value — so the
 * 16-bit and 32-bit modes reshape the whole app by re-aliasing four radius
 * tokens, with no `!important` overrides and no per-component changes.
 *
 * Radius mapping keeps existing markup visually identical in light/dark:
 *   rounded-md (6px) -> --radius-sm
 *   rounded-lg (8px) -> --radius-md
 *   rounded-xl (12px)-> --radius-lg
 *   rounded-full     -> --radius-pill
 */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    // `spacing` is REPLACED, not extended. Any key outside the scale (p-9,
    // gap-14) then fails to compile instead of quietly resolving to a stock rem
    // value and bypassing the token layer.
    spacing: {
      0: 'var(--space-0)',
      px: '1px',
      0.5: 'var(--space-2)',
      1: 'var(--space-4)',
      1.5: 'var(--space-6)',
      2: 'var(--space-8)',
      2.5: 'var(--space-10)',
      3: 'var(--space-12)',
      4: 'var(--space-16)',
      5: 'var(--space-20)',
      6: 'var(--space-24)',
      7: 'var(--space-28)',
      8: 'var(--space-32)',
      10: 'var(--space-40)',
      12: 'var(--space-48)',
    },
    // fontSize is REPLACED like spacing: an off-scale size (text-9xl) fails to
    // compile rather than silently bypassing the token layer. Each key carries
    // its paired line height, so a size and its leading can never drift apart.
    fontSize: {
      12: ['var(--font-size-12)', { lineHeight: 'var(--line-height-16)' }],
      13: ['var(--font-size-13)', { lineHeight: 'var(--line-height-18)' }],
      14: ['var(--font-size-14)', { lineHeight: 'var(--line-height-20)' }],
      15: ['var(--font-size-15)', { lineHeight: 'var(--line-height-24)' }],
      17: ['var(--font-size-17)', { lineHeight: 'var(--line-height-24)' }],
      18: ['var(--font-size-18)', { lineHeight: 'var(--line-height-28)' }],
      20: ['var(--font-size-20)', { lineHeight: 'var(--line-height-28)' }],
      22: ['var(--font-size-22)', { lineHeight: 'var(--line-height-28)' }],
      24: ['var(--font-size-24)', { lineHeight: 'var(--line-height-32)' }],
    },
    fontWeight: {
      normal: 'var(--font-weight-400)',
      medium: 'var(--font-weight-500)',
      semibold: 'var(--font-weight-600)',
      bold: 'var(--font-weight-700)',
    },
    extend: {
      borderRadius: {
        none: 'var(--radius-scale-0)',
        sm: 'var(--radius-scale-4)',
        DEFAULT: 'var(--radius-sm)',
        md: 'var(--radius-sm)',
        lg: 'var(--radius-md)',
        xl: 'var(--radius-lg)',
        full: 'var(--radius-pill)',
      },
      boxShadow: {
        sm: 'var(--shadow-sm)',
        DEFAULT: 'var(--shadow-sm)',
        lg: 'var(--shadow-lg)',
        none: 'none',
      },
      fontFamily: {
        sans: 'var(--font-sans)',
      },
      colors: {
        bg: 'var(--bg)',
        'bg-alt': 'var(--bg-alt)',
        'bg-accent': 'var(--bg-accent)',
        surface: 'var(--surface)',
        border: 'var(--border)',
        'border-strong': 'var(--border-strong)',
        divider: 'var(--divider)',
        'text-strong': 'var(--text-strong)',
        text: 'var(--text)',
        'text-secondary': 'var(--text-secondary)',
        'text-muted': 'var(--text-muted)',
        brand: 'var(--brand)',
        'brand-link': 'var(--brand-link)',
        'brand-strong': 'var(--brand-strong)',
        'on-brand': 'var(--on-brand)',
        success: 'var(--success)',
        'success-bg': 'var(--success-bg)',
        warning: 'var(--warning)',
        'warning-bg': 'var(--warning-bg)',
        danger: 'var(--danger)',
        'danger-bg': 'var(--danger-bg)',
      },
    },
  },
  plugins: [],
}
