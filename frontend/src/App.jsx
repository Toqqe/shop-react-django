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

import { CartProvider } from './cart-components/CartContext.jsx';
import CartCanvas from './cart-components/CartCanvas.jsx';

import {AuthProvider} from "./axiosinstance/Auth.jsx"

function App() {

  return (
    <Router>

      <AuthProvider>
        <CartProvider>
          <NavBar/>
          <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route exact path="/shop" element={<Shop/>}/>
            <Route exact path="/about" element={<About/>}/>
            <Route exact path="/contact" element={<Contact/>}/>
            <Route exact path="/products/:id" element={<DetailProduct/>}/>
            <Route exact path="/login" element={<Login/>}/>
            <Route exact path="/register" element={<Register/>}/>
            <Route exact path="/logout" element={<Logout/>}/>
            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
          <CartCanvas/>
        </CartProvider>
      </AuthProvider>

      <Footer/>
    </Router>
  )
}

export default App;
