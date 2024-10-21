import {useState, createContext, useEffect, useContext} from 'react';
import axiosInstance from '../axiosinstance/AxiosInstance';

import AuthContext from '../axiosinstance/Auth';
import GLOBAL_URLS from '../axiosinstance/GlobalUrls';

const UserContext = createContext();

export const GetUserInfo = ({children}) => {
    const {user, headers} = useContext(AuthContext)
    
    const [userAddress, setUserAddress] = useState(null);
    const [userInfo, setUserInfo] = useState(null);

    const getUserAddress = async () =>{
        await axiosInstance.get(GLOBAL_URLS.API.ADDRESS,{
            headers:headers
        })
        .then(res => {
            if(res.status ===200){
                const data = res.data;
                setUserAddress(data[0]);
            }
        })
    }
    const getUserInfo = async () => {
        await axiosInstance.get(GLOBAL_URLS.API.USER, {
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
        if(user){
            getUserAddress();
            getUserInfo();
        }
    },[user])

    return(
        <UserContext.Provider value={{userAddress, setUserAddress, userInfo, setUserInfo}}>
            {children}
        </UserContext.Provider>
    )
    
}

export const getUserData = () =>{
    return useContext(UserContext)
}