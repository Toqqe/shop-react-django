import Container from "react-bootstrap/Container"
import Image from 'react-bootstrap/Image';
import AboutImg from '../assets/about-us.jpg'

import ChangeTitle from "./Title.jsx";

function About(){

    return(
        <Container className="about-container mt-5" fluid>
            <ChangeTitle title="About"/>
            <div className="d-flex flex-column about">
                <div className="headline">
                    <h1 className="text-center fw-bold">About us</h1>
                </div>
                <div className="about-content text-center">
                    <Image src={AboutImg} className="img-fluid" style={{width:640}}/>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eu neque neque. Vestibulum eget ullamcorper nisl. 
                        Aliquam erat quam, vestibulum auctor lectus sed, laoreet accumsan dui. Duis quam nulla, pellentesque luctus tincidunt a, vestibulum in nulla. 
                        Praesent id enim imperdiet, dictum nisl sed, lacinia velit. Donec velit erat, molestie non ligula ac, malesuada tempor mauris. 
                        Nam maximus massa eleifend sapien sollicitudin pretium. Phasellus quis sollicitudin odio. Cras vitae nibh ligula. 
                        Nullam aliquam tortor et luctus luctus.
                    </p>
                </div>
            </div>
        </Container>
    );
}
export default About;