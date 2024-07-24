
import {useState, useContext, createContext, useReducer} from 'react';

const CartContext = createContext();


const cartReducer = (state, action) => {
    switch(action.type){
        case 'ADD':
            return{
                 ...state,
                 items:[...state.items, action.payload]
            };
        case 'REMOVE':
            return{
                ...state,
                items: state.items.filter(item => item.id !== action.payload.id)
            };
        case 'CLEAR':
            return{
                ...state,
                items:[]
            };
        case 'INIT':
            return{
                ...state, items: action.payload
            };
        default:
            return state;
    }
}


export const CartProvider = ({children}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [state, dispatch] = useReducer(cartReducer, {items:[]})


    const handleView = () => {
        setIsOpen(prevState => !prevState);
    }

    return(
        <CartContext.Provider value={{isOpen, handleView, state, dispatch}}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    return useContext(CartContext);
}
