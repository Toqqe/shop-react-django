import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';


import CartSale from './assets/cart-sale.jpg';
import WomanSale from './assets/woman-sale.jpg';
import PercentSale from './assets/percent-sale.jpg';

function Sale(){

    return(
        <Container className='sale-container mb-5 p-5 bg-body-tertiary' fluid>
            <Container>
                <Row className='mx-auto justify-content-center g-4' >
                    <Col lg={5} md={6}>
                        <div className='single-banner'>
                            <a href="#">
                                <img src={CartSale}  alt="Cart Sale" className='img-fluid' style={{width:460}}/>
                            </a>
                        </div>
                    </Col>
                    <Col lg={5} md={6} className='d-flex flex-wrap align-content-between'>
                        <div className='single-banner mb-2'>
                            <a href="#">
                                <img src={WomanSale}  alt="Woman Sale" className='img-fluid'/>
                            </a>
                        </div>
                        <div className='single-banner'>
                            <a href="#">
                                <img src={PercentSale} alt="Percent Sale" className='img-fluid'/>
                            </a>
                        </div>
                    </Col>

                </Row>
            </Container>
        </Container>        
    );
}

export default Sale