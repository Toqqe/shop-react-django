import { useContext, useState } from 'react';
import {Link} from 'react-router-dom'
import axiosInstanceBase from '../axiosinstance/AxiosInstanceBase';

import AuthContext from "../axiosinstance/Auth"

import {Eye} from 'react-bootstrap-icons';
import Container from "react-bootstrap/Container"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import ChangeTitle from "./Title.jsx";

function Register(){
    const {loginAfterRegistry} = useContext(AuthContext);


    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const [responseMessage, setResponseMessage] = useState('');
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    };

    const handleSubmitForm = async (e) => {

        e.preventDefault();
        try{
            const response = await axiosInstanceBase.post('account/register/', formData)
            loginAfterRegistry(formData.username, formData.password);
            setResponseMessage("Account created successfuly!")
        }catch (error){
            setResponseMessage("There was an error with registration!");
            console.error("There was an error with registration: ", error);
        }
    }


    const showHide = (id) =>{
        const idEl = document.getElementById(id);
        idEl.type === 'password' ? idEl.type='text': idEl.type="password";
    }

    

    return(
        <Container className="register-container mb-5">
            <ChangeTitle title="Register"/>
            <h2 className="mt-5">Register</h2>
            <Row className="mt-4">
                <Col lg={7} md={12} className="ms-auto me-auto">
                    <div className="register-wrapper">
                        <div className="register-form py-5 px-3">

                            <Form className="d-flex  flex-column px-5 py-2" onSubmit={handleSubmitForm}>
                                <Form.Group className="mb-3" controlId="userInput">
                                    <Form.Control type="text" placeholder="Username" name="username" onChange={handleChange}/>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="emailInput">
                                    <Form.Control type="email" placeholder="E-mail" name="email" onChange={handleChange}/>
                                </Form.Group>

                                <Form.Group className="d-flex mb-3 align-items-center" controlId="passwordInput">
                                    <Form.Control type="password" placeholder="Password" name="password" onChange={handleChange}/>
                                    <Eye className="" style={{fontSize:25}} onClick={() => showHide('passwordInput')}/>
                                </Form.Group>


                                <Form.Group className="text-center mb-3 ">
                                    <Form.Text as={Link} to="/login" className="text-muted">
                                        Have account?
                                    </Form.Text>
                                </Form.Group>
                                <div className="text-center">
                                    <Button className="register-form-button" type="submit">
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

export default Register;
