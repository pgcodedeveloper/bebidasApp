import { useContext } from "react"
import CategoriasContext from "../contexts/CategoriasProvider"

const useCategorias = () => {
    return useContext(CategoriasContext);
}

export default useCategorias
