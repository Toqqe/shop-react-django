import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import {useState} from "react";
import axios from "axios";
import axiosInstance from "../axiosinstance/AxiosInstance"

function ContactForm(){
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [responseMessage, setResponseMessage] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post('http://localhost:8000/api/contact/', formData)
            setResponseMessage('Message sent successfuly!')
        } catch(error){
            setResponseMessage('There was an error!', error)

        }
    }

    return(
        <div className="bg-body-tertiary contact-form p-5">
            <div className="p-4">
                {responseMessage && <p className="text-center m-4">{responseMessage}</p>}
                <Form onSubmit={handleSubmitForm}>
                    <Form.Group className="mb-3" controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Name.." name="name" defaultValue={formData.name} onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="name@example.com" name="email" defaultValue={formData.email} onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formMessage">
                        <Form.Label>Message</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder="Enter message.." name="message" defaultValue={formData.message} onChange={handleChange}/>
                    </Form.Group>
                    <div className="text-center">
                        <Button type="submit" className="submit-form-button">Submit</Button>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default ContactForm;