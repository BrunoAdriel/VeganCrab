import React from 'react';
import './App.css';
import NavigationBar from "./components/Navbar/Navbar.jsx";
import Carrousel from './components/Carrousel/Carrousel.jsx';
import ProductManager from './components/ProductManager/ProductManager.jsx';


function App() {
  return (
    <>
    <NavigationBar></NavigationBar>
    <Carrousel></Carrousel>
    <ProductManager></ProductManager>
      <div>
        <h1>Hola mundo</h1>
      </div>
    </>
  )
}

export default App
