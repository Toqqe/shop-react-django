
import Container from "react-bootstrap/esm/Container";


const NotFound = () => {


    return(
        <section className="d-flex align-items-center my-auto ">
            <Container>
                    <div className="row">
                    <div className="col-12 text-center ">
                        <h1 style={{fontSize:"6rem"}}>404</h1>
                        <h1>Page not found!</h1>
                        <h3>Sorry, page you are looking for, does not exist!</h3>
                        <h3>Check your url!</h3>
                    </div>
                    </div>
            </Container>
        </section>
    )
}

export default NotFound;