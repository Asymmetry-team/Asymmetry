import "./App.css"
import "./dark.css"
import Pages from "./components/pages/Pages"
import { LangProvider } from "./i18n"

function App() {
  return (
    <LangProvider>
      <Pages />
    </LangProvider>
  )
}

export default App
