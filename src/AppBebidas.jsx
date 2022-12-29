import { Button, Container } from "react-bootstrap"
import Formulario from "./components/Formulario"
import useBebidas from "./hooks/useBebidas"
import ListadoBebidas from "./components/ListadoBebidas"
import ModalBebida from "./components/ModalBebida"
import Spinner from "./components/Spinner"
import Carrusel from "./components/Carrusel"
import './index.css'
import ModalFavoritos from "./components/ModalFavoritos"


const AppBebidas = () => {

    const { bebidas, cargando, bebidasRandom, handleModalFav, bebidasLS} = useBebidas();

    
    return (
        <>
            <header className="py-5">
                <h1>Buscador de Bebidas</h1>
                <div className="mi-area">
                    <Button onClick={() => {
                        handleModalFav();
                    }}>Mis Recetas</Button>
                </div>
            </header>

            <ModalFavoritos/>

            <Container className="container-md bg">
                <Carrusel bebidas={bebidasRandom}/>
            </Container>
            <Container className="mt-5">
                <h2 className="heading">Encuentre la receta de tu Bebida favorita</h2>
                <Formulario />

                {cargando ? <Spinner /> : <ListadoBebidas bebidas={bebidas}/>}

                <ModalBebida />
            </Container>

            <footer className="footer">
                <div className="copy">
                    <p>Todos los derechos reservados {new Date().getFullYear()} &copy;</p>
                </div>
                <div className="creador">
                    <a href="https://www.linkedin.com/in/pablo-gillespie-795a46223/" target={'_blank'}>PG .CODE
                        <img src="/img/linkedin.png" alt="Imagen de Linkedin" />
                    </a>
                </div>
            </footer>
        </>
    )
}

export default AppBebidas
