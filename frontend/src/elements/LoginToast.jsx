import {useState, useContext} from 'react'

import Toast from 'react-bootstrap/Toast'
import ToastContainer from 'react-bootstrap/ToastContainer';
import { ExclamationCircleFill } from 'react-bootstrap-icons';

import AuthContext from '../axiosinstance/Auth';

const LoginToast = () => {
    const {user} = useContext(AuthContext)
    const [showToast, setShowToast] = useState(true);

    if(user){
        return
    }

    return(

        <>
            <div className='position-fixed' style={{zIndex:99, bottom:15, right:50}}>
                <ExclamationCircleFill style={{fontSize:"2rem"}} onClick={() => setShowToast(true)}/>
            </div>

            <ToastContainer className="position-fixed m-5" position="bottom-end">
                <Toast show={showToast} autohide delay={5000} onClose={() => setShowToast(false)}>
                    <Toast.Header>
                        <h5>Notification</h5>
                        <p className='text-muted me-auto'></p>
                    </Toast.Header>
                    <Toast.Body>
                        <p>Log in first, to add product to cart!</p>
                    </Toast.Body>
                </Toast>
            </ToastContainer>
        </>
    )
};

export default LoginToast;