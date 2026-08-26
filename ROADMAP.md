# Roadmap: platform variants

Green Hill's React/Vite codebase is the first Act. The ecosystem needs
equivalents in a few more languages/platforms so it can demonstrate Code
Connect across the stacks TAMs will actually see at customers:

1. **TypeScript version** — a typed port of this same app. Straightforward;
   mechanical conversion of the existing components/pages.
2. **"Parserless" version** — flagging this term needs a decision before
   anyone builds it: it could mean (a) a build-free variant with no
   JSX/Babel step (plain JS + `React.createElement`, or plain HTML/CSS/JS
   with no framework at all), or (b) something else you have in mind. Worth
   a quick definition before this one gets scoped.
3. **Android version** — needs a stack decision: native Kotlin + Jetpack
   Compose (which Code Connect supports directly) vs. a cross-platform
   option like React Native or Flutter. Compose is the closer match to how
   Code Connect is documented to work today.
4. **iOS version** — likely SwiftUI, which Code Connect also supports
   directly (and there's already a `figma-swiftui` skill available for the
   design↔code translation work when we get here).

Not started. Recorded here so scope isn't lost, not as a commitment to a
specific stack yet — Android/iOS in particular need a native-vs-cross-platform
call before work begins.
