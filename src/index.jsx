import "@fontsource-variable/noto-sans-georgian"
import { addCollection } from "@iconify/react"
import { mdiIcons, icIcons } from "./iconData"
addCollection(mdiIcons)
addCollection(icIcons)
import React from "react"
import { createRoot, hydrateRoot } from "react-dom/client"
import App from "./App"

const rootElement = document.getElementById("root")

// react-snap injects pre-rendered HTML into #root, so hydrate it on the
// client; in dev (empty #root) fall back to a normal client render.
if (rootElement.hasChildNodes()) {
  hydrateRoot(
    rootElement,
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
} else {
  const root = createRoot(rootElement)
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}
