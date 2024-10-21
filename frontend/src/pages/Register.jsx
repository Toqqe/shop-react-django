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
import Spinner from 'react-bootstrap/Spinner';

import ChangeTitle from "./Title.jsx";
import GLOBAL_URLS from '../axiosinstance/GlobalUrls.js';

function Register(){
    const {loginAfterRegistry} = useContext(AuthContext);

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        password: '',
    });

    const [responseMessage, setResponseMessage] = useState('');
    const [error, setError] = useState({});

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    };

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        try{
            setLoading(true)
            const response = await axiosInstanceBase.post(GLOBAL_URLS.API.REGISTER, formData)
            loginAfterRegistry(e);
            setResponseMessage("Account created successfuly!")
        }catch (error){
            setLoading(false)
            setResponseMessage(`There was an error with registration!`);
            setError(error.response.data);
            console.log(error.response.data)
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
                                    {error.username && <p className='text-center'>{error.username[0]}</p>}
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="firstNameInput">
                                    <Form.Control type="text" placeholder="First name" name="first_name" onChange={handleChange}/>
                                    {error.first_name && <p className='text-center'>{error.first_name[0]}</p>}
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="lastNameInput">
                                    <Form.Control type="text" placeholder="Last name" name="last_name" onChange={handleChange}/>
                                    {error.last_name && <p className='text-center'>{error.last_name[0]}</p>}
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="emailInput">
                                    <Form.Control type="email" placeholder="E-mail" name="email" onChange={handleChange}/>
                                    {error.email && <p className='text-center'>{error.email[0]}</p>}
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="passwordInput">
                                    <div className='d-flex align-items-center'>
                                        <Form.Control type="password" placeholder="Password" name="password" onChange={handleChange}/>
                                        <Eye className="" style={{fontSize:25}} onClick={() => showHide('passwordInput')}/>
                                    </div>
                                    {error.password && <p className='text-center'>{error.password[0]}</p>}
                                </Form.Group>

                                {   
                                    responseMessage&&(
                                        <div className='error-list text-center' style={{color:"red"}}>
                                            <p>{responseMessage}</p>
                                        </div>
                                    )                              
                                }
                                <Form.Group className="text-center mb-3 ">
                                    <Form.Text as={Link} to={GLOBAL_URLS.LOGIN} className="text-muted">
                                        Have account?
                                    </Form.Text>
                                </Form.Group>
                                <div className="text-center">
                                    <Button className="register-form-button" type="submit">
                                        {loading ?  
                                            <Spinner animation="border" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </Spinner>
                                            : "Submit"
                                        }
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
