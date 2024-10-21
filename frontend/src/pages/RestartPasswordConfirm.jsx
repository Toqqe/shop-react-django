import { useState } from "react";
import { useParams } from "react-router-dom"
import axiosInstanceBase from "../axiosinstance/AxiosInstanceBase";
import GLOBAL_URLS from "../axiosinstance/GlobalUrls";

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/esm/Button";

const RestartPasswordConfirm = () =>{

    const {uid, token} = useParams();
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try {
            const reponse = await axiosInstanceBase.post(GLOBAL_URLS.API.PASSWORD_RESTART_CONF, {
                uid,
                token,
                new_password: newPassword,
            });
            setMessage("Password has been reset successfully.")
        }catch(error){
            setMessage("Something went wrong, please try again!")
        }
    };

    return(
        <Container>
            <div className="text-center mt-5">
                <h2>Password reset!</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        style={{width:"50%"}}
                        className="mx-auto form-control mt-5"
                        type="password"
                        placeholder="Enter new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <div className="mt-5">
                        <Button variant="dark" type="submit">Submit</Button>
                    </div>
                    
                    {message && <p className="mt-5" style={{color:"red"}}>{message}</p>}
                </form>
            </div>
        </Container>
    )
}

export default RestartPasswordConfirm;