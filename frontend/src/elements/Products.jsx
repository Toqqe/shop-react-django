import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import Spinner from 'react-bootstrap/Spinner'
import { Basket, Heart } from 'react-bootstrap-icons';

import {Link } from 'react-router-dom';
import { useCart } from '../cart-components/CartContext';
import AddToCart from '../utility/ProductOperations';

import axiosInstanceBase from "../axiosinstance/AxiosInstanceBase";



const handleAddItem = ({productID}) =>{
    const authTokens = JSON.parse(localStorage.getItem('authTokens'));
    const accessToken = authTokens?.access;
    axiosInstanceBase.post('cart/items/', {
                    product_id: productID ,
                },{
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    }
                })
                .then(response => {
                    dispatch({type:'ADD', payload:response.data})
                })
}



const ShopProducts = ({ products, xl, md, lg, sm }) => {
    const { state, dispatch } = useCart();

    return( products.length > 0 ? (
        products.map( product => (
            <Col key={product.id} xl={xl} md={md} lg={lg} sm={sm}>
                    <Card className="p-0 mx-auto card-container" style={{width:"18rem"}}>
                        {/* {product.image.map( img => (
                             */}
                            <Link to={`/products/${product.id}`} className="text-decoration-none">
                                <Card.Img variant="top" src={product.image[0].image}/>
                            </Link>

                        {/* // ))} */}
                        <div className="product-actions">
                            <Button className="products-button mx-1" variant="dark">
                                <Heart/>
                            </Button>
                            <Button className="products-button mx-1" variant="dark" onClick={() => handleAddItem({productID : product.id
                                                                                                                        })}>
                                <Basket/>
                            </Button>
                        </div>
                    <Card.Body className="text-center">
                        <Link to={`/products/${product.id}`} className="text-decoration-none link-dark">
                            <Card.Title>{product.title}</Card.Title>
                        </Link>
                        <Card.Text className="text-muted">{product.category.name}</Card.Text>
                        <Card.Text>{product.price}$</Card.Text>
                    </Card.Body>
                    </Card>
            </Col>   
        ))
    ):(
    <div className="mx-auto text-center">
    <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
    </Spinner>
    </div>        
))};

export default ShopProducts