import { Navigate } from "react-router-dom";

const isAuthenticated = () =>{
    return localStorage.getItem('authTokens') !== null;
};

const PrivateRoute = ({children}) => {
    return isAuthenticated() ? children : <Navigate to="/"/>;
}

export default PrivateRoute;