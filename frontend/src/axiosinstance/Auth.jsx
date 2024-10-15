import { createContext, useEffect, useRef, useState } from "react";
import { json, useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
import axios from "axios";
import GLOBAL_URLS from "./GlobalUrls";

const API_URL = GLOBAL_URLS.API.BASE_URL;

const AuthContext = createContext();
export default AuthContext;

export const AuthProvider = ({children}) => {

    let [user, setUser] = useState( () => localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')) : null)
    let [authTokens, setAuthTokens] = useState(() => (localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null))

    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    let loginUser = async (e) =>{
        e.preventDefault();

        await axios.post(`${API_URL}token/`, {
            username: e.target.username.value,
            password: e.target.password.value,
        })
        .then( res => {
            const data = res.data;
            if(data){ 
                console.log("data", data)
                localStorage.setItem('authTokens', JSON.stringify(data));
                setAuthTokens(data);
                setUser(jwtDecode(data.access));
                navigate(GLOBAL_URLS.HOME);
            }else{
                alert("!! WRONG !!")
            }

        }).catch(
            error => {
                const dataError = error.response;
                if(dataError.status === 401){
                    const formControls = document.querySelectorAll('.form-control')
                    const infoBox = document.querySelector('.wrong-creditials')

                    formControls.forEach( form => {
                        infoBox.style.display = 'block';
                        form.style.borderColor = 'red';
                    })
                }
            }
        );

        
    }

    const loginAfterRegistry = async (e) => {
        await axios.post(`${API_URL}token/`, {
                    username:e.target.username.value,
                    password:e.target.password.value
            })
            .then( res => {
                const data = res.data;
                console.log("Register: ", data)
                if(data){
                    localStorage.setItem('authTokens', JSON.stringify(data)); // data
                    setAuthTokens(data); //JSON.stringify(data)
                    setUser(jwtDecode(data.access));
                    navigate(GLOBAL_URLS.HOME);
                }
            }).catch(error => {
            console.error("Something went wrong: ", error)
        })
    }
    // const loginAfterRegistry = async (username, password) => {
    //     try{
    //         const response = await axios.post(`${API_URL}token/`, 
    //             {
    //                 username:username,
    //                 password:password
    //             } 
    //         );
    //         const data = response.data;

    //         if(response.status === 200){
    //             localStorage.setItem('authTokens', data);
    //             setAuthTokens(data); //JSON.stringify(data)
    //             setUser(jwtDecode(data.access));
    //             navigate(GLOBAL_URLS.HOME);
    //         }
    //     }catch(error){
    //         console.error("Something went wrong: ", error)
    //     }
    // }

    let logoutUser = (e) => {
        setUser(null)
        localStorage.removeItem('authTokens')
        navigate(GLOBAL_URLS.HOME)
    }


    const updateToken = async () => {
        console.log("updateToken: ", authTokens)

        try{
            const response = await axios.post(`${API_URL}token/refresh/`, {
                refresh:authTokens?.refresh
            })
            if(response.status === 200){

                setAuthTokens(response.data)
                setUser(jwtDecode(response.data.access))
                localStorage.setItem('authTokens', JSON.stringify(response.data)) //JSON.stringify(response.data))
            }else{
                logoutUser();
            }
        } catch(error){
            console.error('Error while refreshing token: ', error);
            logoutUser();
        }

        if(loading){
            setLoading(false)
        }
    }
    
    let contextData = {
        user: user,
        authTokens: authTokens,
        loginUser: loginUser,
        logoutUser: logoutUser,
        loginAfterRegistry : loginAfterRegistry,
    }

    useEffect(()=>{
        const REFRESH_INTERVAL = 1000 * 60 * 15 // 4 minutes
        let interval = setInterval(()=>{
            if(authTokens){
                updateToken();
            }
        }, REFRESH_INTERVAL)
        return () => clearInterval(interval)

    },[authTokens])

    useEffect( () => {
        if(user){
            if(new Date().getTime() /1000 >= user.exp){
                logoutUser();
            }
        }
    }, [user])

    return(
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}

