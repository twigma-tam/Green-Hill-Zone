import { useEffect, useId } from 'react'

/** Generic dialog shell. Screens supply the title, body, and footer actions —
 *  the modal owns the backdrop, the close behavior, and the frame.
 *
 *  `type` distinguishes the two jobs a dialog does here:
 *    - "confirm": ask about a single irreversible action. Narrow, body is prose.
 *    - "form":    collect input before acting. Wider, body is form controls.
 *  They differ in width and body emphasis, not in behavior.
 */

const TYPES = {
  confirm: {
    widthClass: 'max-w-md',
    bodyClass: 'text-14 text-[var(--text-secondary)]',
  },
  form: {
    widthClass: 'max-w-lg',
    bodyClass: 'text-14 text-[var(--text)]',
  },
}

export function Modal({ open, onClose, title, children, footer, type = 'confirm' }) {
  const titleId = useId()
  const { widthClass, bodyClass } = TYPES[type] ?? TYPES.confirm

  useEffect(() => {
    if (!open) return
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(e) => e.stopPropagation()}
        className={`w-full ${widthClass} rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-lg`}
      >
        <h2 id={titleId} className="m-0 text-18 font-semibold text-[var(--text)]">
          {title}
        </h2>
        <div className={`mt-4 ${bodyClass}`}>{children}</div>
        {footer && <div className="mt-6 flex flex-wrap justify-end gap-3">{footer}</div>}
      </div>
    </div>
  )
}
