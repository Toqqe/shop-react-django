import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import NavBar from "./elements/Navbar.jsx";
import Footer from "./elements/Footer";

import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx"
import Contact from "./pages/Contact.jsx"
import Shop from "./pages/Shop.jsx"
import DetailProduct from './pages/DetailProduct.jsx';
import Login from "./pages/Login.jsx"
import Register from './pages/Register.jsx';
import Logout from './pages/Logout.jsx';
import Profile from './pages/Profile.jsx';
import Checkout from './pages/Checkout.jsx';
import Orders from "./pages/Orders.jsx"
import Settings from './pages/Settings.jsx';
import RestartPassword from './pages/RestartPassword.jsx';
import RestartPasswordConfirm from './pages/RestartPasswordConfirm.jsx';
import NotFound from './pages/NotFound.jsx';
import { CartProvider } from './cart-components/CartContext.jsx';
import CartCanvas from './cart-components/CartCanvas.jsx';

import {AuthProvider} from "./axiosinstance/Auth.jsx"
import PrivateRoute from './axiosinstance/PrivateRoute.jsx';
import LoginToast from "./elements/LoginToast.jsx"

import {useState, useEffect} from 'react';

import SplashScreen from './pages/SplashScreen.jsx';

import {GetUserInfo} from './utility/getUserInfo.jsx'

function App() {
  const [loading, setLoading] = useState(true);

  useEffect( () => {

      const hasSeenSplashScreen = sessionStorage.getItem('hasSeenSplashScreen');
      
      if(!hasSeenSplashScreen){
        const timer = setTimeout( () => {
            setLoading(false);
            sessionStorage.setItem('hasSeenSplashScreen', 'true');
        }, 1000)
        return () => {
          clearTimeout(timer);
        };
      }else{
        setLoading(false);
      }

  }, [])

  if(loading){
      return (<SplashScreen/>)
  }


  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <NavBar/>
          <GetUserInfo>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/shop" element={<Shop/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/contact" element={<Contact/>}/>
            <Route path="/products/:id" element={<DetailProduct/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/logout" element={<Logout/>}/>

            <Route path="/profile" element={
              <PrivateRoute>
                <Profile/>
              </PrivateRoute>

              }/>
            <Route path="/profile/orders" element={
              <PrivateRoute>
                <Orders/>
              </PrivateRoute>
              
              }/>
            <Route path="/profile/settings" element={
              <PrivateRoute>
                <Settings/>
              </PrivateRoute>
              
              }/>

            <Route path="/checkout" element={<Checkout/>}/>
            <Route path="/password-restart" element={<RestartPassword/>}/>
            <Route path="/password-restart-confirm/:uid/:token/" element={<RestartPasswordConfirm/>}/>
            <Route path="*" element={<NotFound />} /> 
          </Routes>

          </GetUserInfo>
          <LoginToast/>
          <CartCanvas/>
        </CartProvider>
      </AuthProvider>

      <Footer/>
    </Router>
  )
}

export default App;
