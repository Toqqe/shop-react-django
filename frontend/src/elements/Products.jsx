import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import Spinner from 'react-bootstrap/Spinner'
import Fade from 'react-bootstrap/Fade'
import { Basket, Heart } from 'react-bootstrap-icons';

import {Link } from 'react-router-dom';
import {useContext, useState} from 'react'
import { useCart } from '../cart-components/CartContext';

import AuthContext from "../axiosinstance/Auth"

import ProductOperations from "../utility/ProductOperations"
import GLOBAL_URLS from "../axiosinstance/GlobalUrls";


const ShopProducts = ({ products, xl, md, lg, sm }) => {
    const { state, dispatch } = useCart();
    const {authTokens} = useContext(AuthContext);

    const [isLogged, setIsLogged] = useState( authTokens ? false : true )

    const {handleAddItem } = ProductOperations();


    return( products.length > 0 ? (
        products.map( product => (
            <Col key={product.id} xl={xl} md={md} lg={lg} sm={sm}>
                            <Card className="p-0 mx-auto card-container rounded-2" style={{width:"18rem"}}>

                                <Link to={`${GLOBAL_URLS.PRODUCTS}${product.id}`} className="text-decoration-none">
                                    <Card.Img variant="top" src={product.image[0] ? product.image[0].image : "https://via.placeholder.com/288x230"}/>
                                </Link>

                                <div className="product-actions">
                                    <Button className="products-button mx-1" variant="dark" disabled={isLogged}>
                                        <Heart/>
                                    </Button>
                                    <Button className="products-button mx-1" variant="dark" onClick={() => handleAddItem({productID : product.id})} disabled={isLogged}>
                                        <Basket/>
                                    </Button>
                                </div>
                            <Card.Body className="text-center">
                                <Link to={`${GLOBAL_URLS.PRODUCTS}${product.id}`} className="text-decoration-none link-dark">
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

export default ShopProducts;