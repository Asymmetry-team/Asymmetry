import "@fontsource-variable/noto-sans-georgian"
import { addCollection } from "@iconify/react"
import { mdiIcons, icIcons } from "./iconData"
addCollection(mdiIcons)
addCollection(icIcons)
import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
