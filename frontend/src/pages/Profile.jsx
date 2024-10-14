import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import { useContext } from 'react'

import AuthContext from '../axiosinstance/Auth'
import {Link} from 'react-router-dom'

import {FileEarmarkPerson, Basket, Gear, PersonWalking } from 'react-bootstrap-icons'

function Profile(){
    const {logoutUser} = useContext(AuthContext)

    return(
        <Container>
            <Row xs={2} className='row-profile text-center mt-5'>
                <Col lg={3} >
                    <Card as={Link} to="orders">
                        <Card.Body>
                            <Card.Title>
                                <p>Orders</p>
                                <Basket/>
                            </Card.Title>
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={3}>
                    <Card as={Link} to="address" >
                        <Card.Body>

                            <Card.Title>
                                <p>Address</p>
                                <FileEarmarkPerson/>
                            </Card.Title>

                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={3}>
                    <Card  as={Link} to="settings">
                        <Card.Body>

                            <Card.Title>
                                <p>Settings</p>
                                <Gear/>
                            </Card.Title>

                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={3} >
                    <Card onClick={logoutUser}>
                        <Card.Body>

                            <Card.Title>
                                <p>Log out</p>
                                <PersonWalking/>
                            </Card.Title>
                            
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )

}

export default Profile;