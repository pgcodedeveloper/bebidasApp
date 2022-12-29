import { useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap"
import useCategorias from "../hooks/useCategorias"
import useBebidas from "../hooks/useBebidas"
import Swal from "sweetalert2"
import 'sweetalert2/dist/sweetalert2.min.css';

const Formulario = () => {

    const { categorias } = useCategorias();
    const { obtenerBebidas } = useBebidas();

    const [busqueda,setBusqueda] = useState({
        nombre: '',
        categoria: ''
    });

    const handleSubmit = e =>{
        e.preventDefault();

        if(Object.values(busqueda).includes('')){
            Swal.fire({
                icon: 'error',
                title: 'Atención',
                text: 'Todos los campos son obligatorios',
                showConfirmButton: true,
                timer: 3000
            });
            return;
        }

        obtenerBebidas(busqueda);
    }
    return (
        <Form
            onSubmit={handleSubmit}
        >
            <Row>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="nombre">Nombre Bebidas</Form.Label>

                        <Form.Control
                            id="nombre" 
                            type="text"
                            placeholder="Ej: Tequila, Vodka, etc"
                            name="nombre"
                            value={busqueda.nombre}
                            onChange={(e) => setBusqueda({
                                ...busqueda,
                                [e.target.name]: e.target.value
                            })}
                        />
                    </Form.Group>
                </Col>

                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="categoria">Categoría de las Bebidas</Form.Label>

                        <Form.Select
                            id="categoria"
                            name="categoria"
                            onChange={(e) => setBusqueda({
                                ...busqueda,
                                [e.target.name]: e.target.value
                            })}
                            value={busqueda.categoria}
                        >
                            <option value=''>-- Seleccione una categoría --</option>
                            {categorias.map(categoria => (
                                <option key={categoria.strCategory} value={categoria.strCategory}>{categoria.strCategory}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Col>
            </Row>

            <Row className="justify-content-end">
                <Col md={3}>
                    <Button
                        type="submit"
                        variant="danger"
                        className="text-uppercase w-100"
                    >
                        Buscar Bebidas
                    </Button>
                </Col>
            </Row>
        </Form>
    )
}

export default Formulario
