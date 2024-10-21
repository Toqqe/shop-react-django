import { useState } from "react";

import Container from "react-bootstrap/Container";
import axiosInstanceBase from "../axiosinstance/AxiosInstanceBase";
import GLOBAL_URLS from "../axiosinstance/GlobalUrls";
import Button from "react-bootstrap/esm/Button";

const RestartPassword = () => {

    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const reponse = await axiosInstanceBase.post(GLOBAL_URLS.API.PASSWORD_RESTART, {email});
            setMessage('Check your email for a link!')
        }catch(error){
            setMessage("Something went wrong, try again!")
        }
    }

    return(
        <Container>
            <form onSubmit={handleSubmit}>
                <input
                    style={{width:"50%"}}
                    className="form-control mx-auto mt-5"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <div className="text-center">
                    <Button type="submit" variant="dark" className="mt-5">Send reset link</Button>
                </div>
            </form>
            {message && <p className="text-center mt-5" style={{color:"red"}}>{message}</p>}
        </Container>
    )
}

export default RestartPassword;