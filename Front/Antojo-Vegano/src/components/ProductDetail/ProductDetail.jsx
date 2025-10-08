import React, {useState, useEffect} from "react";
import './ProductDetail.css';
import logo from '../../assets/LogoAntojo.jpg';
import medialuna1 from '../../../public/Products/Hojaldradas/CrossaintDeChocolate2.jpg';
import medialuna2 from '../../../public/Products/Hojaldradas/CrossaintDeChocolate.jpg';
import CarrouselProducts from "../CarrouselProducts/CarrouselProducts.jsx";
import { useParams } from "react-router-dom";
import BtnBack from "../BtnBack/BtnBack.jsx";


const ProductDetail = () =>{
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity]= useState("");
    const [mainImg, setMainImg] = useState(logo);
    const [fade, setFade] = useState(false);

    /* Handledel input */
    const handleAddToCart = () =>{
        if(!quantity ||  parseInt(quantity)<=0){
            alert("Por favor, ingresa una cantidad valida");
            return;
        }console.log(`Agregaste al carrito: ${quantity} unidades de  ${product.prodName}`);
    };


    /* Handle fade img */
    const handleImage = (img)=>{
        setFade(true); // activa el fade-out
        setTimeout(()=>{
            setMainImg(img);
            setFade(false); // Activa el fade-in
        }, 200)
    }

/*     const { id }= useParams();   

    
    useEffect(()=>{fetch(`http://localhost:3000/products/${id}`)
        .then((res)=> res.json())
        .then((data)=> {console.log("Datos sobre Productos:", data.idProduct); setProduct(data.idProduct[0]); })
        .catch((error) => console.error("Error en el Fetch de Productos", error));
    },[id])


    if(!product)return <p>Cargando...</p>;
 */

    useEffect(()=>{fetch("http://localhost:3000/products/2") 
        .then((res)=> res.json()) 
        .then((data)=> {console.log("Datos sobre Productos:", data.idProduct); setProduct(data.idProduct[0]); }) 
        .catch((error) => console.error("Error en el Fetch de Productos", error)); },[])
    
        if(!product)return <p>Cargando...</p>;

    return(<>

    {/* Btn para volver */}
    <BtnBack/>

    {/* Card Principal */}
    <div className="product-detail">
        <div className="image-section">
            <img src={mainImg || "/placeholder.jpg"} alt={product.prodName} className={`main-image ${fade ? "fade" : ""}`}/>
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
            {/* Imagenes extras */}
            <div className="thumbnail-gallery">
                {[medialuna2, logo, medialuna1, logo].map((img, i) => (
                <img key={i} src={img} alt={`Thumb ${i + 1}`} className={mainImg === img ? "active-thumb" : ""} onClick={() => handleImage(img)} />))}
            </div>
        </div>
    </div>
    {/* Carruosel de productos */}
        <div className="section-title">
            <span></span>
            <h2>Productos similares</h2>
            <span></span>
        </div>
        <section>
            <CarrouselProducts/>
        </section>
    </>)
}

export default ProductDetail;