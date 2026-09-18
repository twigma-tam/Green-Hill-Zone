/** Person avatar — the only component in the system backed by an image.
 *
 *  Two states, and the fallback is the important one: a real directory always
 *  has people without a photo, so initials are the default rendering rather
 *  than an error case. The image, when there is one, is cropped to a circle
 *  with `object-cover` — the Figma twin uses an image fill with scaleMode
 *  "FILL", which is the same crop, expressed the way Figma expresses it.
 *
 *  `size` is a token-free pixel step because it tracks the row height it sits
 *  in, not a spacing value. Initials are derived here rather than passed in, so
 *  no caller can put a third initial in a 24px circle.
 */

const SIZES = {
  sm: { box: 'h-[24px] w-[24px]', text: 'text-12' },
  md: { box: 'h-[32px] w-[32px]', text: 'text-13' },
  lg: { box: 'h-[40px] w-[40px]', text: 'text-14' },
}

function initialsOf(name) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('')
}

export function Avatar({ name, src, size = 'md' }) {
  const { box, text } = SIZES[size] ?? SIZES.md

  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={`${box} shrink-0 rounded-full object-cover`}
        style={{ backgroundColor: 'var(--bg-alt)' }}
      />
    )
  }

  return (
    <span
      aria-hidden="true"
      title={name}
      className={`${box} ${text} inline-flex shrink-0 items-center justify-center rounded-full font-semibold`}
      style={{ backgroundColor: 'var(--bg-accent)', color: 'var(--brand)' }}
    >
      {initialsOf(name)}
    </span>
  )
}
