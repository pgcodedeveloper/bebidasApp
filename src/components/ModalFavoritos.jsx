import { Modal, Image, Button, Row, Col } from "react-bootstrap"
import useBebidas from "../hooks/useBebidas"
import Spinner from "./Spinner";
import Swal from "sweetalert2"
import 'sweetalert2/dist/sweetalert2.min.css';

const ModalFavoritos = () => {

    const { modalFav, cargandoReceta,handleModal,handleBebidaId, handleModalFav,bebidasLS, handleEliminarBebida } = useBebidas();

    const eliminarBebida = id =>{
        Swal.fire({
            icon: 'question',
            title: '¿Desea eliminar esta receta de favoritos?',
            showConfirmButton: true,
            confirmButtonText: 'Si, eliminar',
            cancelButtonText: 'No',
            showCancelButton: true,
            timer: 3000
        }).then((result) => {
            if (result.isConfirmed) {
                handleModalFav();
                handleEliminarBebida(id);
            }
        })
    }
    return (
        <Modal show={modalFav} onHide={handleModalFav}>
            {cargandoReceta ? <Spinner /> : (
                <>
                    <Modal.Header>
                        <Modal.Title>Mis Recetas</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        {bebidasLS.length === 0 ? (
                            <p className="text-center bold">No hay recetas, compience agregando una</p>
                        ) : (
                            <>
                                <p className="text-center bold mt-3">Recetas Favoritas</p>
                                {bebidasLS.map(bebida => (
                                    <Row key={bebida.id}>
                                        <Col className="mt-5">
                                            <div className="d-flex gap-4 align-items-center ">
                                                <Image 
                                                    src={bebida.imagen}
                                                    alt={`Imagen receta ${bebida.nombre}`}
                                                    width={'200px'}
                                                    className='rounded'
                                                />
                                                <div>
                                                    <p><span className="bold">Id:</span> {bebida.id}</p>
                                                    <p><span className="bold">Nombre:</span> {bebida.nombre}</p>
        
                                                    <div className="d-flex align-items-center gap-2">
                                                        <Button className="font-weight-bold" onClick={() => {
                                                            handleModalFav();
                                                            handleModal();
                                                            handleBebidaId(bebida.id);
                                                        }}>Ver</Button>
                                                        <Button variant="danger" className="font-weight-bold" onClick={() => {
                                                            eliminarBebida(bebida.id);
                                                        }}>Eliminar</Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                ))}
                            </>
                        )}
                    </Modal.Body>
                </>
            )}
        </Modal>
    )
}

export default ModalFavoritos
