import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form"
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button'
import { useContext, useEffect, useState } from "react";

import axiosInstance from "../axiosinstance/AxiosInstance";
import AuthContext from "../axiosinstance/Auth";

function Settings(){
    const {user, headers} = useContext(AuthContext);
    headers['User-ID'] = user?.user_id; 

    const [userAddress, setUserAddress] = useState(null);
    const [userInfo, setUserInfo] = useState(null);

    const getUserAddress = () =>{
        axiosInstance.get(`account/address/`,{
            headers:headers
        })
        .then(res => {
            if(res.status ===200){
                const data = res.data;
                setUserAddress(data[0]);
            }
        })
    }
    const getUserInfo = () => {
        axiosInstance.get(`account/user/`, {
            headers:headers
        })
        .then(res => {
            if(res.status === 200){
                const data = res.data;
                setUserInfo(data[0]);
            }
        })
    }


    const handleAddressForm = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.put(`account/address/${userAddress.id}/`, 
                userAddress,
                {headers:headers}
            )
        }catch(error){
            console.error("Error: ", error)
        }

    }

    const handleUserForm = () => {
        console.log("OK")
    }
    
    const handleChangeUserData = (e) =>{
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value
        })
    }
    
    const handleChangeAddressData = (e) =>{
        setUserAddress({
            ...userAddress,
            [e.target.name]: e.target.value
        })
    }
    
    useEffect( ()=> {
        getUserAddress();
        getUserInfo();
    },[])

    
    return(
        <Container className="settings-container">
            <div className="d-flex justify-content-around">
                <Form className="mt-5" style={{width:"20rem"}} onSubmit={handleAddressForm}>
                    <FloatingLabel className="mt-2" controlId="floatingStreet" label="Street">
                        <Form.Control type="text" placeholder="Street" value={userAddress?.street || ""} name="street" onChange={handleChangeAddressData}/>
                    </FloatingLabel>
                    <FloatingLabel className="mt-2" controlId="floatingCity" label="City">
                        <Form.Control type="text" placeholder="City" value={userAddress?.city || ""} name="city" onChange={handleChangeAddressData}/>
                    </FloatingLabel>
                    <FloatingLabel className="mt-2" controlId="floatingPostalCode" label="PostalCode">
                        <Form.Control type="text" placeholder="PostalCode" value={userAddress?.postal_code || ""} name="postal_code" onChange={handleChangeAddressData}/>
                    </FloatingLabel>
                    <FloatingLabel className="mt-2" controlId="floatingCountry" label="Country">
                        <Form.Control type="text" placeholder="Country" value={userAddress?.country || ""} name="country" onChange={handleChangeAddressData}/>
                    </FloatingLabel>
                    <div className="text-center mt-2">
                        <Button variant="dark" type="submit" style={{width:"5rem"}}>Save</Button>
                    </div>
                </Form>            
                <div className="vr"></div>
                <Form className="mt-5" style={{width:"20rem"}} onSubmit={handleUserForm}>
                    <FloatingLabel className="mt-2" controlId="floatingNickname" label="Nickname">
                        <Form.Control type="text" placeholder="Nickname" disabled value={userInfo?.username || ""}></Form.Control>
                    </FloatingLabel>
                    <FloatingLabel className="mt-2" controlId="floatingCountry" label="E-mail">
                        <Form.Control type="text" placeholder="E-mail" disabled value={userInfo?.email || ""}></Form.Control>
                    </FloatingLabel>
                    <FloatingLabel className="mt-2" controlId="floatingFirstName" label="First name" >
                        <Form.Control type="text" placeholder="First name" value={userInfo?.first_name || ""} name="first_name" onChange={handleChangeUserData}/>
                    </FloatingLabel>
                    <FloatingLabel className="mt-2" controlId="floatingLastName" label="Last name">
                        <Form.Control type="text" placeholder="Last name" value={userInfo?.last_name || ""} name="last_name" onChange={handleChangeUserData}/>
                    </FloatingLabel>
                    <div className="text-center mt-2">
                        <Button variant="dark" type="submit" style={{width:"5rem"}}>Save</Button>
                    </div>
                </Form>                         
            </div>  
        </Container>
    )

}

export default Settings;