import { useEffect, useContext, useState } from "react";

import axiosInstanceBase from "../axiosinstance/AxiosInstanceBase"
import Offcanvas from "react-bootstrap/Offcanvas"
import Button from "react-bootstrap/Button"
import Image from 'react-bootstrap/Image';
import Table from 'react-bootstrap/Table';
import Form from "react-bootstrap/Form"

import AuthContext from "../axiosinstance/Auth"
import { useCart } from './CartContext';
import {Link } from 'react-router-dom';
import {X, Dash, Plus} from 'react-bootstrap-icons'

import ProductOperations from "../utility/ProductOperations";
function CartCanvas(){
    const { isOpen, handleView, state} = useCart();
    const { handleQuantityChange, handleRemoveItem, handleClearCart } = ProductOperations();

    return(
        <>
           <Offcanvas show={isOpen} onHide={handleView} placement="end" style={{width:"40%"}}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Cart</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                <Table className="table-cart-products" borderless hover responsive>
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
                                            <Dash className="my-1" data-action="minus" onClick={(e) => handleQuantityChange(e, product)}/>
                                            <Form.Control className="quantity-input text-center" type="number" as="input" size="sm" min={1} max={10} value={product.quantity} style={{width:"40%"}} readOnly />
                                            <Plus className="" data-action="add" onClick={(e) => handleQuantityChange(e, product)}/>
                                        </div>
                                    </td>
                                    <td className="align-middle">
                                        {(product.quantity * product.product.price).toFixed(2)}$
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
                    { state.items.length > 0?(
                        <div className="cart-footer">
                            <div>
                                <hr/>
                                <div className="d-flex justify-content-between">
                                    <h5>Total: </h5>
                                    <h5 className="mb-auto">{state.total}$</h5>
                                </div>
                            </div>
                            <div className="d-flex justify-content-between">
                                <Button variant="danger" onClick={() => handleClearCart()}>Clear cart</Button>
                                <Button variant="dark" as={Link} to='/checkout'>Checkout</Button>
                            </div>
                        </div>
                    ) : (
                        <>
                        </>
                    )}
                </Offcanvas.Body>
           </Offcanvas>
        </>
    );
};

export default CartCanvas;