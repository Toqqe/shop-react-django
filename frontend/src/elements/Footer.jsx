import Container from "react-bootstrap/Container";

function Footer(){

    return(
        <Container className="footer-container mt-auto" style={{backgroundColor:'#f6f6f8'}} fluid>
            <footer className="py-3">
                <ul className="nav justify-content-center border-bottom pb-3 mb-3">
                <li className="nav-item"><a href="#" className="nav-link px-2 text-body-secondary">Home</a></li>
                <li className="nav-item"><a href="#" className="nav-link px-2 text-body-secondary">Features</a></li>
                <li className="nav-item"><a href="#" className="nav-link px-2 text-body-secondary">Pricing</a></li>
                <li className="nav-item"><a href="#" className="nav-link px-2 text-body-secondary">FAQs</a></li>
                <li className="nav-item"><a href="#" className="nav-link px-2 text-body-secondary">About</a></li>
                </ul>
                <p className="text-center text-body-secondary">&copy; {new Date().getFullYear()} Company, Inc</p>
            </footer>
        </Container>
    );
    
}

export default Footer