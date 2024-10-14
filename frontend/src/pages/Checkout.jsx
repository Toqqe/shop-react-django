
import Table from "react-bootstrap/Table"
import Image from "react-bootstrap/Image"
import Form from "react-bootstrap/Form"
import Container from "react-bootstrap/esm/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"

import {X} from "react-bootstrap-icons"
import { useNavigate } from "react-router-dom"

import {useCart} from "../cart-components/CartContext"
import ProductOperations from "../utility/ProductOperations"


import axiosInstanceBase from "../axiosinstance/AxiosInstanceBase"
import { useState, useContext } from "react"
import AuthContext from "../axiosinstance/Auth"

import GLOBAL_URLS from "../axiosinstance/GlobalUrls"

function Checkout(){
    const {state} = useCart()
    const {user, authTokens} = useContext(AuthContext);

    const {handleQuantityChange, handleRemoveItem} = ProductOperations()
    const navigate = useNavigate();

    const [selectedValue, setSelectedValue] = useState('1');
    
    const handleRadioChange = ((value) => {
        setSelectedValue(value);
    })

    function handleSubmitOrder(){

        const headers = {
            Authorization:  `Bearer ${authTokens?.access}`
        }

        const data = {
            payment : selectedValue,
            user : user.user_id
        }
        axiosInstanceBase.post('orders/',data,{
            headers:headers
        })
        .then(response => {
            navigate(GLOBAL_URLS.PROFILE_ORDERS)
            dispatch
        })
    }

    return(
        <Container>      
            <div className="py-5 text-center">
                <h2>Checkout</h2>
            </div>
            <Row lg={2}>
                <Col lg={12}>
                    <Table className="table-cart-products mx-auto" hover responsive size="sm" style={{width:"100%"}}>
                        <tbody>
                            {
                                state.items.length > 0 ?(state.items.map( product => (
                                    <tr key={product.product.id} className="text-center">
                                        <td>
                                            <Image src={product.product.image[0].thumbnail} fluid width={48}/>
                                        </td>
                                        <td colSpan={2} className="align-middle">
                                            <div className="d-flex flex-column">
                                                <p className="p-0 m-0">
                                                    {product.product.title}
                                                </p>
                                                <p className="p-0 m-0 text-muted">
                                                    {product.product.price}$
                                                </p>
                                            </div>
                                        </td>
                                        <td className="">
                                            <div className="d-flex justify-content-center align-items-center my-2"> 
                                                <Form.Control className="text-center" type="number" as="input" size="sm" min={1} max={10} value={product.quantity} onChange={(e) => handleQuantityChange(e, product)} style={{width:"40%"}}/>
                                            </div>
                                        </td>
                                        <td className="align-middle">
                                            <p className="p-0">{(product.quantity * product.product.price).toFixed(2)}$</p>
                                        </td>
                                        <td className="align-middle">
                                            <X style={{backgroundColor:"red", color:"white", borderRadius:"0.5rem", fontSize:"1.2rem"}} onClick={()=>handleRemoveItem(product)}/>
                                        </td>
                                    </tr>
                                )) 
                                ):(
                                    <tr>
                                        <td>
                                            <h2 className="text-center">Add something to cart!</h2> 
                                        </td>
                                    </tr>
                                )}
                        </tbody>
                    </Table>          
                </Col>   
                <Col lg={3}>
                    <h5>Payments:</h5>
                    <div className="d-flex flex-column mb-3">
                        <div className="d-flex p-2">
                            <Form.Check label="PayPal" type="radio" value={selectedValue} onChange={() => handleRadioChange("1")} checked={selectedValue === '1'}/>
                        </div>
                        <div className="d-flex p-2 text-decoration-line-through">
                            <Form.Check label="XXXX" type="radio" onChange={() => handleRadioChange("2")} disabled/>
                        </div>
                        <div className="d-flex p-2 text-decoration-line-through">
                            <Form.Check label="XXXX" type="radio" disabled/>
                        </div>
                    </div>
                </Col> 
                <Col lg={3}>
                    <h5>Address:</h5>
                    <p>asd asd</p>
                    <p>asd asd</p>
                    <p>asd asd</p>
                </Col>
                <Col lg={6}>
                    <div>
                        <h5 className="text-end">Total: {state.total}$</h5>
                    </div>
                </Col>
            <Button className="mx-auto mt-4" variant="dark" onClick={() => handleSubmitOrder()} disabled={state.items.length>0?false:true}>Submit</Button>
            </Row>
        </Container>
    )

}

export default Checkout;