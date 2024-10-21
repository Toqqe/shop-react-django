import { Link } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import ShopProducts from "../elements/Products.jsx";

import { useContext, useEffect, useState } from "react";
import axiosInstance from '../axiosinstance/AxiosInstance.jsx'
import GLOBAL_URLS from "../axiosinstance/GlobalUrls.js";


function Deals(){

    const [products, setProducts] = useState([]);

    useEffect( () => {

        axiosInstance.get(GLOBAL_URLS.API.PRODUCTS)
        .then( response => {setProducts(response.data.results)})
        .catch( error => {
            console.error("Error while fetching the data!", error)
        })

    }, []);

    return (   
        <Container className="daily-deals-container text-center">
            
            <h2 className="text-center fw-bold p-2 ">DAILY DEALS!</h2>
            <Row className="mt-5 justify-content-start">
                <ShopProducts products={products} test={"2"} xl={3} md={6} lg={4} sm={2}/>
            </Row>
                <p className="more-products text-center mt-5">
                    <Link className="text-decoration-underline" to={GLOBAL_URLS.SHOP}>VIEW MORE PRODUCTS!</Link>
                </p>
        </Container>
    );

}
export default Deals