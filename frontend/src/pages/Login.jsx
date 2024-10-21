import {Link} from 'react-router-dom'

import Container from "react-bootstrap/Container"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import ChangeTitle from "./Title.jsx";

import { useContext } from 'react';
import AuthContext from '../axiosinstance/Auth.jsx';
import GLOBAL_URLS from '../axiosinstance/GlobalUrls.js';

function Login(){
    const {loginUser} = useContext(AuthContext);

    const handleLogin = (event) => {
        loginUser(event);
    }

    return(
        <Container className="login-container mb-5">
            <ChangeTitle title="Login"/>
            <h2 className="mt-5">Login</h2>

            <Row className="mt-4">
                <Col lg={7} md={12} className="ms-auto me-auto">
                    <div className="login-wrapper">
                        <div className="login-form  py-5 px-3">

                            <Form className="px-5 py-2" onSubmit={handleLogin}>
                                <Form.Group className="mb-4" controlId="loginInput">
                                    <Form.Control type="text" name="username" placeholder="Username" />
                                </Form.Group>

                                <Form.Group className="mb-4" controlId="passwordInput">
                                    <Form.Control type="password" name="password" placeholder="Password" />
                                </Form.Group>
                                <Form.Group className="d-flex mb-3">
                                    <Form.Text className="text-muted me-auto" as={Link} to={GLOBAL_URLS.PASSWORD_RESTART}>
                                        Forget password?
                                    </Form.Text>
                                    <Form.Text as={Link} to={GLOBAL_URLS.REGISTER} className="text-muted">
                                        Don't have account yet?
                                    </Form.Text>
                                </Form.Group>
                                <div className='wrong-creditials text-center' style={{color:"red"}}>
                                    <p>Wrong creditials!</p>
                                </div>
                                <div className="text-center">
                                    <Button className="login-form-button" type="submit">
                                        Submit
                                    </Button>
                                </div>
                            </Form>
                        </div>
                    </div>
                </Col>
            </Row>

        </Container>
    );
}

export default Login;
