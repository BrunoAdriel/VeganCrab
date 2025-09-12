import React from 'react';
import './App.css';
import NavigationBar from "./components/Navbar/Navbar.jsx";
import Carrousel from './components/Carrousel/Corrousel.jsx';

function App() {
  return (
    <>
    <NavigationBar></NavigationBar>
    <Carrousel></Carrousel>
      <div>
        <h1>Hola mundo</h1>
      </div>
    </>
  )
}

export default App
