
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form"

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import axiosInstance from "../axiosinstance/AxiosInstance";

import { register } from 'swiper/element/bundle';
register();

import ProductSwipper from "../elements/ProductSwipper"

function DetailProduct(){
    const {id} = useParams();
    const [product, setProduct] = useState(null);
    const [quantityProduct, setQuantityProduct] = useState(1);

    useEffect( () => {
        const fetchProductData = async () =>{
            const productData = await axiosInstance.get(`/products/?id=${id}`)
            if(productData.data.results.length == 1){
                setProduct(productData.data.results[0])
            }
        }   
        fetchProductData();
    }, [])

    const handleQuantityChange = (e) => {
        setQuantityProduct(e.target.value);
    };

    return(
        <Container>
            <Row>
                <Col lg={6} md={6} className="mt-5 my-auto">
                    <ProductSwipper product={product}/>
                </Col>

                <Col lg={6} md={6}>
                    {product ? (
                        <div className="product-details-content mt-5 p-5 ps-0">
                            <div className="display-5">{ product.title }</div>
                            <div className="product-details-price my-4">
                                <span>{ product.price }$</span>
                                </div>
                            <div className="product-details-desc text-muted">
                                <p>{ product.content }</p>
                            </div>
                            <div className="product-details-cat text-muted">
                                <span>Categories: </span>
                                <span>{ product.category.name }</span>
                            </div>
                            <div className="product-details-buttons my-3 d-flex">
                                <Form.Control className="mx-2" type="number" as="input" size="sm" min={0} max={10} value={quantityProduct} onChange={(e) => handleQuantityChange(e)} style={{width:"10%"}}/>
                                <Button variant="dark" disabled={ product.avaliable?false:true }>
                                    {product.avaliable?"Add to cart":"Out of stock"}
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <p>Loading..</p>
                    )}
                </Col>
            </Row>
        </Container>
    )
}

export default DetailProduct;