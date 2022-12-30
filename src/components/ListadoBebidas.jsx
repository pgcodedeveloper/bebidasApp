import { useEffect } from 'react';
import { Alert, Row, Pagination, Col, Button, Container } from 'react-bootstrap'
import useBebidas from '../hooks/useBebidas'
import Bebida from './Bebida'
import Spinner from './Spinner';

const ListadoBebidas = ({bebidas}) => {

    const { totalPaginas, currentPage, cargandoPagina, handleSiguientePage,handleAnteriorPage , bebidasPage,paginaActual } = useBebidas();

    const clickSig = () =>{
        handleSiguientePage();
    }

    const clickAnt = () =>{
        handleAnteriorPage();
    }


    const sig = () =>{
        if(paginaActual >= totalPaginas){
            return true;
        }
        else{
            return false;
        }
    }

    const ant = () =>{
        if(paginaActual === 1){
            return true;
        }
        else{
            return false;
        }
    }
    return (
        <>
            {bebidas?.length === 0 ? (
                <Alert className='text-center mt-5 text-uppercase bold'>Las Bebidas aparecerán aquí</Alert>
            ) : (
                <>
                    <h2 className='mt5'>Resultado de la búsqueda</h2>
                    
                    {cargandoPagina ? <Spinner /> : (
                        <Row className='mt-5'>
                            {bebidasPage.map(bebida => (
                                <Bebida key={bebida.idDrink} bebida={bebida}/>
                            ))}
                        </Row>
                    )}
                    <div className='paginador'>
                        <Button disabled={ant()} onClick={clickAnt}>{'<'} Ant</Button>
                        <Button disabled={sig()} onClick={clickSig}>Sig {'>'}</Button>
                    </div>
                    <p className='pagina'>Pagina: {paginaActual} de {totalPaginas}</p>
                </>
            )}
        </>
    )
}

export default ListadoBebidas
