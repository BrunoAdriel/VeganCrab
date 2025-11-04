import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavigationBar from "./components/Navbar/Navbar.jsx";
import ProductManager from './components/ProductManager/ProductManager.jsx';
import ProductDetail from './components/ProductDetail/ProductDetail.jsx';
import ProductComponent from './components/ProductComponent/ProductComponent.jsx';
import Footer from './components/Footer/Footer.jsx';
import Cart from './components/Cart/Cart.jsx';
import CartDetail from './components/CartDetail/CartDetail.jsx';
import AboutUs from './components/AboutUs/AboutUs.jsx';
import Contact from './components/Contact/Contact.jsx';
import EndPurchase from './components/EndPurchase/EndPurchase.jsx';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
    <Router>
      <NavigationBar/>
      <Cart/>
      <main>
        <Routes>
          <Route path='/' element={<ProductManager/>} />
          <Route path='/products/:id' element={<ProductDetail/>} />
          <Route path='/productos' element={<ProductComponent/>} />
          <Route path="/cart" element={<CartDetail />} />
          <Route path='/Sobre-Nosotros' element={<AboutUs/> } />
          <Route path='/Contacto' element={<Contact/>} />
          <Route path='/Finalizar-Compra' element={<EndPurchase/>} />
        </Routes>
        <ToastContainer 
          position="top-center" 
          autoClose={2500} 
          hideProgressBar={false} 
          newestOnTop={false} 
          closeOnClick pauseOnHover draggable />
      </main>
      <Footer></Footer>
    </Router>
    </>
  )
}

export default App
