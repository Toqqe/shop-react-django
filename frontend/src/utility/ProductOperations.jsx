import { useReducer } from "react"


const ProductOperations = (item) => {


    const addItemToCart = (productID) => {
        dispatch({type:'ADD', payload:{id:productID}})
    }

    const removeItemFromCart = (productID) => {
        dispatch({type:'REMOVE', payload:{id:productID}})
    }

    const clearCart = () => {
        dispatch({type:'CLEAR'})
    }

    console.log(productID)
}

export default ProductOperations;