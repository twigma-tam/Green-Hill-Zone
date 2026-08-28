// url=https://www.figma.com/design/7B95vlwukQ3hKs4G4WH5P5/Green-Hill-Design-System?node-id=3-24
// source=src/components/Modal.jsx
// component=Modal
import figma from 'figma'
const instance = figma.selectedInstance

const title = instance.getString('Title')
const type = instance.getEnum('Type', { confirm: 'confirm', form: 'form' })
const hasFooter = instance.getEnum('Has Footer', { true: true, false: false })

// Footer buttons are nested BigButton instances — resolved dynamically.
// Every real usage has two (Cancel + a primary action, in that order — see
// BillingInvoices and TeamMembersScreen), so both are resolved here instead
// of just the first.
let footerCode
if (hasFooter) {
  const footerButtons = instance.findConnectedInstances(
    (n) => n.codeConnectId() === 'big-button',
    { traverseInstances: true }
  )
  const firstBtn = footerButtons[0] && footerButtons[0].type === 'INSTANCE'
    ? footerButtons[0].executeTemplate().example
    : undefined
  const secondBtn = footerButtons[1] && footerButtons[1].type === 'INSTANCE'
    ? footerButtons[1].executeTemplate().example
    : undefined
  footerCode = secondBtn ? figma.code`${firstBtn}${secondBtn}` : firstBtn
}

export default {
  example: figma.code`<Modal
  open={open}
  onClose={() => setOpen(false)}
  type="${type}"
  title="${title}"${hasFooter ? figma.code`
  footer={<>${footerCode}</>}` : ''}
>
  {children}
</Modal>`,
  imports: ["import { Modal } from '@/components/Modal.jsx'"],
  id: 'modal',
  metadata: { nestable: false },
}
