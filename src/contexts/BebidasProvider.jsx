import { useState, useEffect, createContext } from 'react'
import axios from 'axios';
import Swal from "sweetalert2"
import 'sweetalert2/dist/sweetalert2.min.css';

const BebidasContext = createContext();

const BebidasProvider = ({children}) => {

    const total_elem_pagina = 8;
    const datosLS = JSON.parse(localStorage.getItem('bebidasFavoritas'));
    const [bebidasLS, setBebidasLS] = useState(datosLS ?? []);
    const [bebidas, setBebidas] = useState([]);
    const [bebidasPage, setbebidasPage] = useState([]);
    const [cargando , setCargando] = useState(false);
    const [ cargandoReceta, setCargandoReceta] = useState(false);
    const [ cargandoRandom, setCargandoRandom ] = useState(false);
    const [ cargandoPagina, setCargandoPagina] = useState(false);
    const [modal, setModal] = useState(false);
    const [modalFav, setModalFav] = useState(false);
    const [bebidaId, setBebidaId] = useState(null);
    const [ receta, setReceta ] = useState({});
    const [ bebidasRandom, setBebidasRandom] = useState([]);
    const [ totalPaginas, setTotalPaginas] = useState(1);
    const [ currentPage, setCurrentPage] = useState(0);
    const [ paginaActual, setPaginaActual] = useState(1);

    

    useEffect(() => {
        const obtenerBebidaId = async () =>{

            if(!bebidaId) return;

            setCargandoReceta(true);
            try {
                const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${bebidaId}`;
                const { data } = await axios(url);
                setReceta(data.drinks[0]);
            } catch (error) {
                console.log(error)
            }
            finally{
                setCargandoReceta(false);
            }
        }
        obtenerBebidaId();
    },[bebidaId]);


    const obtenerBebidas = async (datos) => {
        setPaginaActual(1);
        setCargando(true);
        try {
            const url= `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${datos.nombre}&c=${datos.categoria}`;
            const { data } = await axios(url);
            setBebidas(data.drinks);
            
        } catch (error) {
            console.log(error);
        }
        finally{
            setCargando(false);
        }
    }

    const handleModal = () =>{
        setModal(!modal);
    }

    const handleBebidaId = id =>{
        setBebidaId(id);
    }

    const handleModalFav = () =>{
        setModalFav(!modalFav);
    }

    const obtenerRandom = async () =>{
        
        setCargandoRandom(true);
        try {
            const url ='https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic';
            const { data } = await axios(url);
            setBebidasRandom(data.drinks);
        
        } catch (error) {
            console.log(error)
        }
        finally{
            setCargandoRandom(false);
        }
       
        
    }

    useEffect(() => {
        obtenerRandom();
    },[])


    useEffect(() => {
        setTotalPaginas(Math.ceil(bebidas.length / total_elem_pagina));
        setbebidasPage([...bebidas].splice(0,total_elem_pagina));
    },[bebidas]);

    const handleSiguientePage = () =>{
        setCargandoPagina(true);
        const totalElementos= bebidas.length;

        const nextPage= currentPage + 1;
        const firstIndex= nextPage * total_elem_pagina;

        if(firstIndex === totalElementos){
            return;
        }else{
            setPaginaActual(paginaActual+1);
            setbebidasPage([...bebidas].splice(firstIndex,total_elem_pagina));
            setCurrentPage(nextPage);
        }
        setTimeout(() => {
            setCargandoPagina(false);
        }, 500); 
    }

    const handleAnteriorPage = () =>{
        setCargandoPagina(true);
        const prevPage= currentPage - 1;
        if(prevPage < 0){
            return;
        }
        else{
            setPaginaActual(paginaActual-1);
            const firstIndex= prevPage * total_elem_pagina;
            setbebidasPage([...bebidas].splice(firstIndex,total_elem_pagina));
            setCurrentPage(prevPage);
        }
        setTimeout(() => {
            setCargandoPagina(false);
        }, 500); 
    }

    useEffect(() => {
        localStorage.setItem('bebidasFavoritas', JSON.stringify(bebidasLS));
    },[bebidasLS])

    const handleGuardarBebida = (datos) =>{
        
        if(bebidasLS.some(bebida => bebida.id === datos[0].id)){
            handleModal();
            Swal.fire({
                icon: 'error',
                title: 'Atención',
                text: 'Ya existe esa receta en favoritos',
                showConfirmButton: true,
                timer: 3000
            });
            
        }
        else{
            setBebidasLS([...bebidasLS,datos[0]]);
            handleModal();
            Swal.fire({
                icon: 'success',
                title: 'Exito',
                text: 'Se guardo la receta correctamente',
                showConfirmButton: true,
                timer: 3000
            });
        }
    }

    const handleEliminarBebida = id => {
        const bebidaAct = bebidasLS.filter( bebida => bebida.id !== id);
        setBebidasLS(bebidaAct);
    }
    return (
        <BebidasContext.Provider
            value={{
                obtenerBebidas,
                bebidas,
                cargando,
                handleModal,
                modal,
                handleBebidaId,
                receta,
                cargandoReceta,
                obtenerRandom,
                bebidasRandom,
                cargandoRandom,
                totalPaginas,
                currentPage,
                handleSiguientePage,
                bebidasPage,
                paginaActual,
                handleAnteriorPage,
                cargandoPagina,
                modalFav,
                handleModalFav,
                handleGuardarBebida,
                bebidasLS,
                handleEliminarBebida
            }}
        >
            {children}
        </BebidasContext.Provider>
    )
}

export {
    BebidasProvider
}

export default BebidasContext