
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
                <div className='second-view-shelf'>
                    <img src={Shelf}/>
                    <img src={Shelf}/>
                    <img src={Shelf}/>
                    <img src={Shelf}/>
                </div>
                <div className='third-view-shelf'>
                    <img src={Shelf}/>
                    <img src={Shelf}/>
                    <img src={Shelf}/>
                    <img src={Shelf}/>
                </div>
            </div>
            <Cart3 className='fade-in' color='black m-0 p-0'/>
            <hr/>
        </div>
    )
}
