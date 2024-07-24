import  Container  from "react-bootstrap/Container";
import  Row  from "react-bootstrap/Row";
import  Col  from "react-bootstrap/Col";
import { ArrowRight, Hourglass, Truck, CurrencyDollar, Percent } from 'react-bootstrap-icons';

function Info(){

    return( 
        <Container className="info-container">
            <Row className="g-4" xs={2} md={4} lg={4}>
                <Col className="d-flex align-items-center">
                    <Hourglass size={48} className="me-2" />
                    <div className="d-flex flex-column">
                        <h6 className="mb-0">Fast realization</h6>
                        <p className="mb-0 text-muted">For items order until 3PM</p>
                    </div>
                </Col>
                <Col className="d-flex align-items-center">
                    <Truck size={48} className="me-2"/>
                    <div className="d-flex flex-column">
                        <h6 className="mb-0">Free Shipping</h6>
                        <p className="mb-0 text-muted">Free shipping of order above 100$!</p>
                    </div>
                </Col>
                <Col className="d-flex align-items-center">
                    <CurrencyDollar size={48} className="me-2"/>
                    <div className="d-flex flex-column">
                        <h6 className="mb-0">Money return</h6>
                        <p className="mb-0 text-muted">Up to 100 days!</p>
                    </div>
                </Col>
                <Col className="d-flex align-items-center">
                    <Percent size={48} className="me-3"/>
                    <div className="d-flex flex-column">
                        <h6 className="mb-0">Order discout!</h6>
                        <p className="mb-0 text-muted">Just sign up to newsletter!</p>
                    </div>
                </Col>
            </Row>
        </Container>
    );

}

export default Info;