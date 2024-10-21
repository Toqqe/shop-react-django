import Container from "react-bootstrap/Container";
import {Link} from "react-router-dom";

import GLOBAL_URLS from "../axiosinstance/GlobalUrls";

function Footer(){

    return(
        <Container className="footer-container mt-auto" style={{backgroundColor:'#f6f6f8'}} fluid>
            <footer className="py-3">
                <ul className="nav justify-content-center border-bottom pb-3 mb-3">
                <li className="nav-item"><Link to={GLOBAL_URLS.HOME} className="nav-link px-2 text-body-secondary">Home</Link></li>
                <li className="nav-item"><Link to={GLOBAL_URLS.SHOP} className="nav-link px-2 text-body-secondary">Shop</Link></li>
                <li className="nav-item"><Link to={GLOBAL_URLS.ABOUT} className="nav-link px-2 text-body-secondary">About</Link></li>
                <li className="nav-item"><Link to={GLOBAL_URLS.HOME} className="nav-link px-2 text-body-secondary">FAQs</Link></li>
                <li className="nav-item"><Link to={GLOBAL_URLS.CONTACT} className="nav-link px-2 text-body-secondary">Contact</Link></li>
                </ul>
                <p className="text-center text-body-secondary">&copy; {new Date().getFullYear()} Company, Inc</p>
            </footer>
        </Container>
    );
    
}

export default Footer