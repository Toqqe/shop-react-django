import { useReducer, useContext, useState } from "react"
import AuthContext from "../axiosinstance/Auth"
import axiosInstanceBase from "../axiosinstance/AxiosInstanceBase"
import { useCart } from '../cart-components/CartContext';
import GLOBAL_URLS from "../axiosinstance/GlobalUrls";


const ProductOperations = () => {
    const { state, dispatch } = useCart();
    const {authTokens, headers} = useContext(AuthContext)


    const handleAddItem = ({productID, quantity=1}) =>{

        const data = {
            product_id: productID,
            quantity: quantity,
        }


        axiosInstanceBase.post('cart/items/', data , { headers: headers })
                        .then(response => {
                            if(response.status === 202){
                                dispatch({type:'UPDATE', payload:response.data})
                            }else{
                                dispatch({type:'ADD', payload:response.data})
                            }
                        }).catch(
                            error => {

                            }
                        )
                        
    }

    function handleQuantityChange(e, product){
        let prodQuan = product.quantity;

        if(e.target.dataset.action == 'add'){
            prodQuan++;
        }
        else if(e.target.dataset.action == 'minus') {
            prodQuan--;
        }
        const data = {
            cart_item_id: product.id,
            quantity: prodQuan,
        }
        if(prodQuan > 10){
            alert("Too much!");
            prodQuan = 10;
        }
        axiosInstanceBase.put(`${GLOBAL_URLS.API.CART_ITEMS}${data.cart_item_id}/`, data , { headers: headers })
                        .then(response => {
                            if(response.status === 202){
                                dispatch({type:'UPDATE', payload:response.data})
                            }
                        })
    }
    function handleRemoveItem(product){
        const data = {
            cart_item_id: product,
        }
        axiosInstanceBase.delete(`${GLOBAL_URLS.API.CART_ITEMS}${data.cart_item_id.id}/`, data, {headers:headers})
                        .then( response => {
                            if(response.status === 204){
                                dispatch({type:"REMOVE", payload: data.cart_item_id})
                            }
                        })
    }

    function handleClearCart(){

        axiosInstanceBase.delete(`${GLOBAL_URLS.API.CART_ITEMS}clear_cart/`, {headers:headers})
                        .then(
                            response => {
                                if(response.status === 204){
                                    dispatch({type:'CLEAR'})
                                }
                            }
                        ).catch(
                            error => {
                                console.error("There was an error with clearing the cart!", error)
                            }
                        )
    }

    return {
        handleAddItem, 
        handleQuantityChange, 
        handleRemoveItem, 
        handleClearCart,
    }
    
}

export default ProductOperations;