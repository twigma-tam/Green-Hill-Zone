// url=<FIGMA_AVATAR>
// source=src/components/Avatar.jsx
// component=Avatar
import figma from 'figma'
const instance = figma.selectedInstance

const size = instance.getEnum('Size', { sm: 'sm', md: 'md', lg: 'lg' })
const hasImage = instance.getEnum('Has Image', { true: true, false: false })
const initials = instance.getString('Initials')

// `name` is the source of truth in code: it drives the alt text AND the
// initials, which Avatar derives itself so no caller can put three letters in
// a 24px circle. Figma has only the rendered initials, so they are emitted as
// a comment and `name` is left for the caller to pass from real data.
//
// `src` is likewise not something Figma can produce — the image fill is a
// placeholder, not a URL. Has Image=true therefore emits the prop with a
// caller-owned value rather than inventing one.
export default {
  example: hasImage
    ? figma.code`<Avatar name={person.name} src={person.photo} size="${size}" />`
    : figma.code`{/* no photo: Avatar falls back to initials derived from \`name\` (here "${initials}") */}
<Avatar name={person.name} size="${size}" />`,
  imports: ["import { Avatar } from '@/components/Avatar.jsx'"],
  id: 'avatar',
  metadata: { nestable: true },
}
