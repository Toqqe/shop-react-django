
import Container from "react-bootstrap/Container"
import Table from "react-bootstrap/Table"

import { useContext, useEffect, useState } from "react"

import axiosInstanceBase from "../axiosinstance/AxiosInstanceBase"
import AuthContext from "../axiosinstance/Auth"
import { useCart } from "../cart-components/CartContext"

function Orders(){

    const {user} = useContext(AuthContext)
    const [orders, setOrders] = useState([])
    const {dispatch} = useCart()

    const displayOrders = () => {
        if(user){
            const headers = {
                'User-ID' : user.user_id
            }
            axiosInstanceBase.get('orders/', {
                headers:headers
            })
            .then( response => {
                setOrders(response.data);
                dispatch({type:'CLEAR'})
            });
        }
    }

    useEffect(() => {
        displayOrders();
    }, [])
    


    return(
        <Container className="mt-5 container-orders">
            <Table responsive className="text-center table-orders">
                <thead>
                   <tr>
                        <th>Order ID:</th>
                        <th>Payment:</th>
                        <th>Sum:</th>
                        <th>Date:</th>
                        <th>Payment:</th>
                        <th>Status:</th>
                    </tr> 
                </thead>
                <tbody>
                        {
                            orders.map( (order, i) => (
                                <tr key={i}>
                                    <td>{order.id}</td>
                                    <td>{order.payment}</td>
                                    <td>{order.sum}$</td>
                                    <td>{order.date_ordered}</td>
                                    <td>{order.payment_display}</td>
                                    <td>{order.status_display}</td>
                                </tr>
                            ))
                        }
                </tbody>
            </Table>
        </Container>
    )
}

export default Orders;