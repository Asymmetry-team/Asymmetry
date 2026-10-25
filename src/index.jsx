// Tiny entry: let the browser PAINT the pre-rendered HTML first, then load,
// evaluate and hydrate the app bundle. Evaluating the ~1 MB bundle used to run
// before the first paint and pushed it back by seconds on phones (the page was
// downloaded but blank). All CSS stays render-blocking (cssCodeSplit: false in
// vite.config), so the pre-rendered page paints fully styled.
const start = () => import("./boot")

const root = document.getElementById("root")
if (root && root.hasChildNodes()) {
  // two frames: the first lets the page paint, the second runs after it
  requestAnimationFrame(() => setTimeout(start, 0))
} else {
  start()
}
