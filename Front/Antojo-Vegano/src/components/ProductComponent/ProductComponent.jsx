import React, {useState, useEffect} from "react";
import './ProductComponent.css';
import ProductCard from "../ProductCard/ProductCard.jsx";
import SearchBar from "../SearchBar/SearcBar";

const ProductComponent = () =>{
    const [products, setProducts] = useState([]);
    

        useEffect(()=>{fetch("http://localhost:3000/products")
            .then((res)=> res.json())
            .then((data)=> {console.log("Datos sobre Productos:", data.products); setProducts(data.products); })
            .catch((error) => console.error("Error en el Fetch de Productos", error));
        },[]);
    


    return(<>
        {/* Titulo de Productos */}
        <div className="section-title">
            <span></span>
            <h2>Nuestros Productos</h2>
            <span></span>
        </div>
    
    <div className="container">
        <div>
            <SearchBar   />
        </div>

    </div>


    </>)
}

export default  ProductComponent; 