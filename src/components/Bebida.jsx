import { Col, Card, Button } from "react-bootstrap"
import useBebidas from "../hooks/useBebidas";

const Bebida = ({bebida}) => {
    
    const { handleModal, handleBebidaId } = useBebidas();

    return (
        <Col md={6} lg={3}>
            <Card className="mb-4">
                <Card.Img 
                    variant="top"
                    src={bebida.strDrinkThumb}
                    alt={`Imagen de ${bebida.strDrink}`}
                />

                <Card.Body>
                    <Card.Title>{bebida.strDrink}</Card.Title>

                    <Button
                        variant={'warning'}
                        className="w-100 text-uppercase mt-2"
                        onClick={() => {
                            handleModal();
                            handleBebidaId(bebida.idDrink);
                        }}
                    >
                        Ver Receta
                    </Button>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default Bebida
