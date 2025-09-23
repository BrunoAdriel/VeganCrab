import React, {useState, useEffect} from "react";
import './ProductDetail.css';
import logo from '../../assets/LogoAntojo.jpg';
import medialuna1 from '../../../public/Products/Hojaldradas/CrossaintDeChocolate2.jpg';
import medialuna2 from '../../../public/Products/Hojaldradas/CrossaintDeChocolate.jpg';
import { useParams } from "react-router-dom";

const ProductDetail = () =>{
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity]= useState("");
    const [mainImg, setMainImg] = useState(logo);

    /* Handledel input */
    const handleAddToCart = () =>{
        if(!quantity ||  parseInt(quantity)<=0){
            alert("Por favor, ingresa una cantidad valida");
            return;
        }console.log(`Agregaste al carrito: ${quantity} unidades de  ${product.prodName}`);
    };

/*     const { id }= useParams();

    
    useEffect(()=>{fetch(`http://localhost:3000/products/${id}`)
        .then((res)=> res.json())
        .then((data)=> {console.log("Datos sobre Productos:", data.idProduct); setProduct(data.idProduct[0]); })
        .catch((error) => console.error("Error en el Fetch de Productos", error));
    },[])


    if(!product)return <p>Cargando...</p>;
 */

    useEffect(()=>{fetch("http://localhost:3000/products/2") 
        .then((res)=> res.json()) 
        .then((data)=> {console.log("Datos sobre Productos:", data.idProduct); setProduct(data.idProduct[0]); }) 
        .catch((error) => console.error("Error en el Fetch de Productos", error)); },[])
    
        if(!product)return <p>Cargando...</p>;

    return(<>

    <div className="product-detail">
        <div className="image-section">
            <img src={logo || "/placeholder.jpg"} alt={product.prodName} />
        </div>
        <div className="info-section">
            <h2>{product.prodName}</h2>
            <p>{product.prodDescription}</p>
            <p className="price">{product.unit_price ? `$${product.unit_price}` : "Consultar precio"} </p>

            {/* Input de cantidad */}
            <div className="quantity-wrapper d-flex align-items-center">
                <label htmlFor="quantity">Cantidad</label>
                <input id="quantity" type="number" min="1" value={quantity} required onChange={(e)=> setQuantity(e.target.value)}/>
            </div>
            <div className="d-flex justify-content-center">
                <button onClick={handleAddToCart} className="btn-add"> Añadir al carrito</button>
            </div>
                    {/* Miniaturas */}
            <div className="thumbnail-gallery">
                <img src={logo} alt="Thumb1" onClick={()=> setMainImg(logo)} />
                <img src={logo} alt="Thumb2" onClick={()=> setMainImg(logo)} />
            </div>
        </div>
    </div>

    </>)
}

export default ProductDetail;