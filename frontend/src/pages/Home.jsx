import Container from "react-bootstrap/Container";
import HomeCarousel from "../home-components/HomeCarousel";
import Info from "../home-components/Info";
import Deals from "../home-components/Deals";
import Subscribe from "../home-components/Subscribe";
import Sale from "../home-components/Sale";

import ChangeTitle from "./Title.jsx";

function Home(){
    return( 
            <Container className="p-0" fluid>
                <ChangeTitle title="Home"/>
                <HomeCarousel/>
                <Info/>
                <Sale/>
                <Deals/>
                <Subscribe/>
            </Container>);
}

export default Home;