import { createContext, useEffect, useState } from "react";
import { json, useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
import axios from "axios";

const API_URL = 'http://localhost:8000/api/';

const AuthContext = createContext();
export default AuthContext;

export const AuthProvider = ({children}) => {

    let [user, setUser] = useState( () => localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')) : null)
    let [authTokens, setAuthTokens] = useState(() => (localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null))

    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    let loginUser = async (e) =>{
        e.preventDefault();

        const response = await axios.post(`${API_URL}token/`, {
            username: e.target.username.value,
            password: e.target.password.value,
        });

        const data = response.data;
        
        if(data){ // add messages
            console.log(data)
            localStorage.setItem('authTokens', JSON.stringify(data));
            setAuthTokens(data);
            setUser(jwtDecode(data.access));
            navigate('/');
        }else{
            alert("!! WRONG !!")
        }
    }

    const loginAfterRegistry = async (username, password) => {
        try{
            const response = await axios.post(`${API_URL}token/`, 
                {
                    username:username,
                    password:password
                } 
            );
            const data = response.data;

            if(response.status === 200){
                localStorage.setItem('authTokens', data);
                setAuthTokens(data); //JSON.stringify(data)
                setUser(jwtDecode(data.access));
                navigate('/');
            }
        }catch(error){
            console.error("Something went wrong: ", error)
        }
    }

    let logoutUser = (e) => {
        setUser(null)
        localStorage.removeItem('authTokens')
        navigate('/')
    }

    const updateToken = async () => {
        console.log(authTokens?.refresh)
        const response = await axios.post(`${API_URL}token/refresh/`, {
            refresh:authTokens?.refresh
        })
        if(response.status === 200){
            setAuthTokens(response.data)
            setUser(jwtDecode(response.data.access))
            localStorage.setItem('authTokens',  JSON.stringify(response.data)) //JSON.stringify(response.data))
        }else{
            logoutUser()
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

    useEffect( () => {
        const REFRESH_INTERVAL = 1000*60*0.1 // 4 min
        setInterval( () => {
            if(authTokens){
                updateToken();
            }
        }, REFRESH_INTERVAL);
    }, [authTokens])

    return(
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}

