import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

import Info from "../contact-components/Info";
import ContactForm from "../contact-components/ContactFrom";

import ChangeTitle from "./Title.jsx";

function Contact(){


    return(
        <Container className="contact-container">
            <ChangeTitle title="Contact"/>
            <Row className="mt-4" > 
                <Col lg={4} md={5} sm={12} className="mt-5">
                    <Info/>
                </Col>
                
                <Col lg={8} md={7} sm={12} className="mt-5">
                    <ContactForm/>
                </Col>
            </Row>
        </Container>
    );
}
export default Contact;

