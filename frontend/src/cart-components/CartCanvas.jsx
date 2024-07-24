import Button from "react-bootstrap/Button"
import Offcanvas from "react-bootstrap/Offcanvas"
import { useCart } from './CartContext';
import { useEffect, useContext } from "react";
import axiosInstanceBase from "../axiosinstance/AxiosInstanceBase"

import AuthContext from "../axiosinstance/Auth"



function CartCanvas(){
    const {user, authTokens} = useContext(AuthContext);
    const { isOpen, handleView, state, dispatch } = useCart();
    
    const initCart = () => {
        const accessToken = authTokens?.access
        if(accessToken){
            axiosInstanceBase.get('/cart/',{
                headers: { Authorization:  `Bearer ${accessToken}` },
            })
            .then( response => {
                dispatch({type: 'INIT', payload: response.data.items});
                console.log("cart")
            });
        }
    }
    useEffect( () => { 
        initCart();
    }, [dispatch, authTokens])

        
    return(
        <>
           <Offcanvas show={isOpen} onHide={handleView} placement="end">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Cart</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    Some text as placeholder. In real life you can have the elements you
                    have chosen. Like, text, images, lists, etc.
                </Offcanvas.Body>
           </Offcanvas>
        </>
    );
};

export default CartCanvas;