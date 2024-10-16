
import {useState, useContext, createContext, useReducer, useEffect} from 'react';
import AuthContext from '../axiosinstance/Auth';
import axiosInstanceBase from '../axiosinstance/AxiosInstanceBase';
import { useLocation } from "react-router-dom";

const CartContext = createContext();


const cartReducer = (state, action) => {
    switch(action.type){
        case 'ADD':
            const addItems = [...state.items, action.payload]
            const addItemsTotal = addItems.reduce((sum, item) => sum+(item.quantity * item.product.price), 0);
            return{
                ...state,
                items:addItems,
                total: addItemsTotal
            };
        case 'UPDATE':
            if(action.payload.quantity > 10){
                action.payload.quantity = 10
            }
            const updatedItems = state.items.map(
                item => item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item
            )
            const updatedTotal = updatedItems.reduce((sum, item) => sum + (item.quantity * item.product.price),0);
           return{
                ...state,
                items: updatedItems,
                total: updatedTotal.toFixed(2)
            };
        case 'REMOVE':
            const removedItems = state.items.filter(
                item => item.id !== action.payload.id
            )
            const removedTotal = removedItems.reduce((sum, item) => sum + (item.quantity * item.product.price), 0)
            return{
                ...state,
                items: removedItems,
                total: removedTotal.toFixed(2)
            };
        case 'CLEAR':
            return{
                ...state,
                items:[]
            };
        case 'INIT':
            const newItems = action.payload;
            const newTotal = newItems.reduce(
                (sum, item) => sum + (item.quantity * item.product.price), 0);

            return{
                ...state, items: newItems, total: newTotal.toFixed(2)
            };
        default:
            return state;
    }
}


export const CartProvider = ({children}) => {

    const location = useLocation();

    const {user,authTokens, headers} = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);
    const [state, dispatch] = useReducer(cartReducer, {items:[], total:0})

    const handleView = () => {
        setIsOpen(prevState => !prevState);
    }

    useEffect( () => {
        setIsOpen(false);
    }, [location])

    const initCart = () => {        
        if(authTokens){
            headers['User-ID'] = user.user_id;

            axiosInstanceBase.get('cart/cart/',{
                headers: headers,
            })
            .then( response => {
                if(response.data.length > 0 ){
                    dispatch({type: 'INIT', payload: response.data[0].items});
                }
            });
        }
    }

    useEffect( () => { 
        initCart();
    }, [dispatch, authTokens])

    return(
        <CartContext.Provider value={{isOpen, handleView, state, dispatch}}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    return useContext(CartContext);
}
