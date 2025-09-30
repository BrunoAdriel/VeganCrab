import React, {useState, useEffect} from "react";
import './ProductComponent.css';
import ProductCard from "../ProductCard/ProductCard.jsx";

const ProductComponent = () =>{
    const [products, setProducts] = useState([]);

            useEffect(()=>{fetch("http://localhost:3000/products")
            .then((res)=> res.json())
            .then((data)=> {console.log("Datos sobre Productos:", data.products); setProducts(data.products); })
            .catch((error) => console.error("Error en el Fetch de Productos", error));
        },[]);
    
    
    
    return(<>
    
        


    </>)
}

export default  ProductComponent; 