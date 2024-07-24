import {useState, useContext} from 'react';
import {Link } from 'react-router-dom';

import AuthContext from '../axiosinstance/Auth.jsx';
import { useCart } from '../cart-components/CartContext.jsx';



import { Basket, PersonCircle } from 'react-bootstrap-icons';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Badge from 'react-bootstrap/Badge'
import Dropdown from "react-bootstrap/Dropdown"
import Collapse from 'react-bootstrap/Collapse';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function NavBar(){
    const { handleView } = useCart();
    const contextData = useContext(AuthContext);

    const [activeKey, setActiveKey] = useState(1);

    return( 
        
        <Navbar expand="lg" className="bg-body-tertiary" sticky="top">
            <Container fluid className='mx-5'>
                <Navbar.Brand className="d-lg-none" as={Link} to="/">SzS</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav" className='mx-auto'>
                            <Row className='d-flex align-items-center gx-5 w-100 mx-auto'>
                                <Col lg={2}>
                                    <Navbar.Brand className="d-none d-lg-block" as={Link} to="/">SzS</Navbar.Brand>
                                </Col>
                                <Col lg={8} className='d-flex justify-content-center'>
                                        <Nav activeKey={activeKey} onSelect={selectedKey=> setActiveKey(selectedKey)}>
                                            <Nav.Item >
                                                <Nav.Link eventKey={1} as={Link} to="/">Home</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey={2} as={Link} to="/shop">Shop</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey={3} as={Link} to="/about">About</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey={4} as={Link} to="/contact">Contact</Nav.Link>
                                            </Nav.Item>
                                        </Nav>
                                </Col>
                                <Col lg={2} className='d-flex align-items-center'>
                                            <Dropdown align="end" >
                                                <Dropdown.Toggle className="p-0" variant="none">
                                                    <PersonCircle style={{fontSize:"20px"}}/>
                                                </Dropdown.Toggle>
                                                <Collapse dimension="height">
                                                <Dropdown.Menu rootCloseEvent='click'>
                                                    <Dropdown.Item>1</Dropdown.Item>
                                                    <Dropdown.Item>2</Dropdown.Item>
                                                    <Dropdown.Item>3</Dropdown.Item>
                                                    <Dropdown.Divider/>
                                                        {contextData.user ? (
                                                            <>
                                                                <Dropdown.Item className="m-0 p-1" as={Link} to="/profile">
                                                                    <p className='text-center m-0'>{contextData.user.username }</p> 
                                                                </Dropdown.Item>
                                                                <Dropdown.Item className="m-0 p-1" as={Link} to="/logout" onClick={contextData.logoutUser}>
                                                                    <p className='text-center m-0'>Logout</p> 
                                                                </Dropdown.Item>
                                                            </>
                                                        
                                                        ) : (
                                                            <div className='text-center'>
                                                                <Dropdown.Item as={Link} to="/login">
                                                                
                                                                        <p className='p-0 m-1'>Login</p> 
                                                                </Dropdown.Item>

                                                                <Dropdown.Item as={Link} to="/register">
                                                                        <p className='p-0 m-1'>Register</p> 
                                                                </Dropdown.Item>
                                                            </div>
                                                        )}
                                                </Dropdown.Menu>
                                                </Collapse>
                                            </Dropdown>
                                            <Navbar.Text>
                                                <Basket style={{fontSize:"20px"}} onClick={handleView}></Basket>
                                            </Navbar.Text>                 
                                </Col>
                            </Row>
                    </Navbar.Collapse>
            </Container>
      </Navbar>
    );
}

export default NavBar;