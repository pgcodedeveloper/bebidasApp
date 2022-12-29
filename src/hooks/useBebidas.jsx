import { useContext } from 'react'
import BebidasContext from '../contexts/BebidasProvider'

const useBebidas = () => {
    return useContext(BebidasContext);
}

export default useBebidas
