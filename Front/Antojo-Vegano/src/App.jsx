import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavigationBar from "./components/Navbar/Navbar.jsx";
import ProductManager from './components/ProductManager/ProductManager.jsx';
import ProductDetail from './components/ProductDetail/ProductDetail.jsx';
import ProductComponent from './components/ProductComponent/ProductComponent.jsx';
import Footer from './components/Footer/Footer.jsx';


function App() {
  return (
    <>
    <Router>
      <NavigationBar></NavigationBar>
      <Routes>
        <Route path='/' element={<ProductManager/>} />
        <Route path='/products/:id' element={<ProductDetail/>} />
        <Route path='/productos' element={<ProductComponent/>} />
      </Routes>
      <Footer></Footer>
    </Router>
    </>
  )
}

export default App
