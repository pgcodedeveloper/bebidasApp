import { Modal, Image, Button, CloseButton } from "react-bootstrap"
import useBebidas from "../hooks/useBebidas"
import Spinner from "./Spinner";
const ModalBebida = () => {
    
    const { modal, cargandoReceta, handleModal, receta,handleGuardarBebida } = useBebidas();

    const mostrarIngredientes = () =>{
        let ingredientes = [];

        for(let i = 1; i < 16; i++){
            if(receta[`strIngredient${i}`]){
                ingredientes.push(
                    <li key={i}>{receta[`strIngredient${i}`]} | {receta[`strMeasure${i}`]} </li>
                );
            }
        }
        return ingredientes;
    }

    const guardarReceta = () =>{
        const recetaF = [{
            nombre: receta.strDrink,
            imagen: receta.strDrinkThumb,
            id: receta.idDrink
        }];
        handleGuardarBebida(recetaF);
    }
    return (
        <Modal show={modal} onHide={handleModal}>
            {cargandoReceta ? <Spinner /> : (
                <>
                    <Modal.Header>
                        <Modal.Title>{receta.strDrink}</Modal.Title>
                        <CloseButton className="px-3" onClick={() => {
                            handleModal();
                        }}/>
                    </Modal.Header>

                    <Image 
                        src={receta.strDrinkThumb}
                        alt={`Imagen receta ${receta.strDrink}`}
                    />
                    
                    <Modal.Body>
                        <div className="p-3">
                            <h2>Instrucciones</h2>
                            <p className="mt-2">{receta.strInstructions}</p>
                            <h2>Ingredientes y Cantidades</h2>
                            {mostrarIngredientes()}
                        </div>

                        <div className="mt-2 d-grid gap-2">
                            <Button onClick={() => {
                                guardarReceta();
                            }}>Guardar</Button>
                        </div>
                    </Modal.Body>
                </>
            )}
            
        </Modal>
    )
}

export default ModalBebida
