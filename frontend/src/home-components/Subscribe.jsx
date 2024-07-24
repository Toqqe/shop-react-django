import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Subscribe(){

    return(
        <Container className='subscribe-container mb-5 p-5' fluid>
            <Row>
                <Col xl={4} md={6} sm={8} className='mx-auto text-center'>
                    <div className='d-flex flex-column subscribe'>
                        <h1>Join to us!</h1>
                        <p className='text-muted'>Subscribe to our newsletter to receive news on update</p>
                        <input className="sub-email" name="sub-email" type="email" placeholder='Enter e-mail address..'/>
                    </div>
                    <Button className='mt-4'>Subscribe</Button>
                </Col>
            </Row>
        </Container>
    );


}
export default Subscribe;