import {useState, createContext, useEffect, useContext} from 'react';
import axiosInstance from '../axiosinstance/AxiosInstance';

import AuthContext from '../axiosinstance/Auth';

const UserContext = createContext();

export const GetUserInfo = ({children}) => {
    const {headers} = useContext(AuthContext)

    const [userAddress, setUserAddress] = useState(null);
    const [userInfo, setUserInfo] = useState(null);

    const getUserAddress = () =>{
        axiosInstance.get(`account/address/`,{
            headers:headers
        })
        .then(res => {
            if(res.status ===200){
                const data = res.data;
                setUserAddress(data[0]);
            }
        })
    }
    const getUserInfo = () => {
        axiosInstance.get(`account/user/`, {
            headers:headers
        })
        .then(res => {
            if(res.status === 200){
                const data = res.data;
                setUserInfo(data[0]);
            }
        })
    }

    useEffect(()=>{
        getUserAddress();
        getUserInfo();
    },[])

    return(
        <UserContext.Provider value={{userAddress, setUserAddress, userInfo, setUserInfo}}>
            {children}
        </UserContext.Provider>
    )
    
}

export const getUserData = () =>{
    return useContext(UserContext)
}