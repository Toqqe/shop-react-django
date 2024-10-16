
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup"
import Card from "react-bootstrap/Card"
import Form from "react-bootstrap/Form"


import axiosInstance from "../axiosinstance/AxiosInstance.jsx";
import ShopProducts from "../elements/Products.jsx";

import { useEffect, useState } from "react";
import { useNavigate, useLocation} from "react-router-dom";


import ChangeTitle from "./Title.jsx";

function Shop(){

    let filteredCategory = null;
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([{ id:0, name:'All'}]);
    const [selectedOrder, setSelectedOrder] = useState('id');
    
    const navigate = useNavigate();
    const location = useLocation();
    
    const queryParams = new URLSearchParams(location.search);
    const selectedCategory = queryParams.get('category') || '0';
    const [currCategory, setCurrCategory] = useState(selectedCategory)


    useEffect( () => {
        const fetchCategoriesAndProducts = async () => {
            const categoriesRes = await axiosInstance.get('products/category/')
            setCategories(c => [...c, ...categoriesRes.data]);
        }
        fetchCategoriesAndProducts();
    }, [])

    
    useEffect( () => {
        const fetchData = async () => {
            try{
                const categoryFilter = selectedCategory !== '0' ? `?category__id=${selectedCategory}` : '';
                axiosInstance.get(`/products/${categoryFilter}`)
                    .then(res => {
                        setProducts(res.data.results);
                    });

            } catch(error){
                console.error("Error fetching data: ", error)
            }
        }
        fetchData();
        setSelectedOrder('id')
    }, [selectedCategory]);

    function handleCategoryClick(categoryId){
        if(categoryId === 0){
            navigate(`/shop`);
        }else{
            setCurrCategory(categoryId);
            navigate(`/shop?category=${categoryId}`);
        }
    };

    async function handleOrder(typeOrder){
        if(currCategory == "0"){
            filteredCategory = await axiosInstance.get(`products/?ordering=${typeOrder}`);
        }else{
            filteredCategory = await axiosInstance.get(`products/?category__id=${currCategory}&ordering=${typeOrder}`);
        }
        setProducts(filteredCategory.data.results);
        setSelectedOrder(typeOrder);
    }

    return(
        <Container>
            <ChangeTitle title="Shop"/>
            <Row className="mt-5 g-0 justify-content-start">
                <Col className="bg-body-tertiary p-2 " style={{height:"35rem"}} lg={2}>
                    <ListGroup defaultActiveKey={currCategory}>

                        {categories.map( (item, index) => 
                            <ListGroup.Item eventKey={index} key={index} value={item.id} onClick={ () => handleCategoryClick(index)}>{item.name}</ListGroup.Item>
                        )}

                    </ListGroup>
                </Col>


                <Col lg={9} className="mx-3 g-0 p-2">
                    <Form.Select as="select" 
                                className="ms-auto" 
                                aria-label="Default" 
                                style={{width:150}} 
                                value={selectedOrder}
                                onChange={
                                    (e) => handleOrder(e.target.value)
                            }>

                        <option value="id">Default</option>
                        <option value="price">Lower price</option> 
                        <option value="-price">Highest price</option> 
                        <option value="-id">Newest</option>
                    </Form.Select>
                    <Row>
                        <ShopProducts products={products} xl={5} md={5} lg={5} sm={2}/>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default Shop;