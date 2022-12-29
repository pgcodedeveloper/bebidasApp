import { useEffect, useState } from "react"
import { Carousel } from "react-bootstrap"
import Spinner from "./Spinner";

const Carrusel = ({bebidas}) => {

    const [ bebidasRand, setBebidasRand,cargandoRandom ] = useState([]);

    useEffect(() =>{
        setBebidasRand(bebidas.splice(Math.floor(Math.random() * bebidas.length), 3));
    },[bebidas])

    return (
        <>
            {cargandoRandom ? (
                <Carrusel variant="dark">
                    <Spinner />
                </Carrusel>
            ) : (
                <Carousel variant="dark">
                
                    {bebidasRand?.map(bebida => (
                        <Carousel.Item key={bebida.idDrink}>
                            <Carousel.Caption>
                                <h3 className="texto">{bebida.strDrink}</h3>
                                <p className="parrafo">Tipo de Bebida: <span>Alcohólica</span></p>
                            </Carousel.Caption>
                            <img
                                className="img-bebida"
                                src={bebida.strDrinkThumb}
                                alt={`Imagen bebida ${bebida.strDrink}`}
                            />
                            
                        </Carousel.Item>
                    ))}

                </Carousel>
            )}
        </>
    )
}

export default Carrusel
