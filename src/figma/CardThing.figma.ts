// url=https://www.figma.com/design/7B95vlwukQ3hKs4G4WH5P5/Green-Hill-Design-System?node-id=2-794
// source=src/components/CardThing.jsx
// component=CardThing
import figma from 'figma'
const instance = figma.selectedInstance

const title = instance.getString('Title')
const subtext = instance.getString('Subtext')
const footerNote = instance.getString('FooterNote')
const hasFooter = instance.getEnum('Has Footer', { true: true, false: false })

export default {
  example: figma.code`<CardThing title="${title}" subtext="${subtext}"${hasFooter ? figma.code` footerNote="${footerNote}"` : ''} />`,
  imports: ["import { CardThing } from '@/components/CardThing.jsx'"],
  id: 'card-thing',
  metadata: { nestable: true },
}
