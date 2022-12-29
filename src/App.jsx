
import { CategoriasProvider } from "./contexts/CategoriasProvider"
import { BebidasProvider } from "./contexts/BebidasProvider"
import AppBebidas from "./AppBebidas"
const App = () => {
  return (
    <CategoriasProvider>
      <BebidasProvider>
        <AppBebidas />
      </BebidasProvider>
    </CategoriasProvider>
  )
}

export default App

