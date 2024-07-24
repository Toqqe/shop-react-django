import { Telephone } from "react-bootstrap-icons";
import { GeoAlt } from "react-bootstrap-icons";

function Info(){

    return(
        <div className="contact-info-wrap bg-body-tertiary p-5">
        <div className="d-flex contact-info border-bottom">
            <div className="contact-phone-icon p-4">
                <Telephone width={24} height={24}/>
            </div>
            <div className="contact-phone">
                <p>+012 345 678 102</p>
                <p>+012 345 678 102</p>
            </div>
        </div>
        
        <div className="d-flex contact-info">
            <div className="contact-address-icon p-4">
                <GeoAlt width={24} height={24}/>
            </div>
            <div className="contact-address">
                <p>Address</p>
                <p>Address</p>
            </div>
        </div>
    </div>
    );
}
export default Info;