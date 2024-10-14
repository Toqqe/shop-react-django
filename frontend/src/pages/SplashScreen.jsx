
import {Cart3} from 'react-bootstrap-icons';
import Shelf from '../assets/stand.png'

export default function SplashScreen(){

    return (
        <div className="splash-screen">
            <div className='shelf-wrapper d-flex'>
                <img src={Shelf}/>
                <img src={Shelf}/>
                <img src={Shelf}/>
                <img src={Shelf}/>
                <img src={Shelf}/>
            </div>
            <Cart3 className='fade-in'/>
            <hr/>
        </div>
    )
}
