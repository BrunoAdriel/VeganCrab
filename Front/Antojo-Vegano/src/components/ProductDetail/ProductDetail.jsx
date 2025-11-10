import React, {useState, useEffect} from "react";
import './ProductDetail.css';
import logo from '../../assets/LogoAntojo.jpg';
import medialuna1 from '../../../public/Products/Hojaldradas/CrossaintDeChocolate2.jpg';
import medialuna2 from '../../../public/Products/Hojaldradas/CrossaintDeChocolate.jpg';
import CarrouselProducts from "../CarrouselProducts/CarrouselProducts.jsx";
import { useParams } from "react-router-dom";
import { CartManager } from "../HookCartManager/CartManager.jsx";
import BtnBack from "../BtnBack/BtnBack.jsx";
import { toast } from "react-toastify";


const ProductDetail = () =>{
    const [product, setProduct] = useState([]);
    const [quantity, setQuantity]= useState("");
    const [selectedSize, setSelectedSize] = useState("");
    const [mainImg, setMainImg] = useState(logo);
    const [fade, setFade] = useState(false);
    const { addItem } = CartManager();
    const { id }= useParams();   

    // producto base (el primero del array o el único)
    const mainProduct = product && product.length > 0 ? product[0] : null;

    /* Coneccion */
    useEffect(()=>{fetch(`http://localhost:3000/products/${id}`)
        .then((res)=> res.json())
        .then((data)=> {console.log("Datos sobre Productos:", data.idProduct);
                        const prod = data.idProduct
                        setProduct(Array.isArray(prod) ? prod : [prod])
        })
        .catch((error) => console.error("Error en el Fetch de Productos", error));
    },[id])

    if(!mainProduct)return <p>Cargando...</p>;

      /* Gradiante toastify */
/*     const toastColors = {
        success: "linear-gradient(to right, #00b09b, #96c93d)",
        error: "linear-gradient(to right, #d32f2f, #ff5252)",
        warning: "linear-gradient(to right, #f7b733, #fc4a1a)",
    }; */


    /* Handle agregar a carrito */
    const handleAddToCart = () =>{
        /* Controla la cantidad */
        if(!quantity ||  parseInt(quantity)<=0){
/*             toast.warning("Por favor, ingresa una cantidad válida",{ style: {background:  toastColors.warning}})
 */            toast.warn("Por favor, ingresa una cantidad válida");
            return;
        }
        
    /* Cotrolador del size */
    if (product.length > 1 && !selectedSize) {
        toast.warn("Por favor, selecciona un tamaño");
        return;
    }

    /* Buscamos la variante elegida */
    const chosenVariant = product.find((p) => p.size === selectedSize) || product[0];
    /* Guardar los productos en el Local */
    const newItem = {
        id: chosenVariant.idProduct,
        name: chosenVariant.prodName,
        price: parseFloat(chosenVariant.unit_price),
        image: mainImg || "/placeholder.jpg",
        size: chosenVariant.size,
        quantity: parseInt(quantity)
    };
    /* Enviamos los datos a la funcion */
    addItem(newItem);
};

    /* Handle fade img */
    const handleImage = (img)=>{
        setFade(true); // activa el fade-out
        setTimeout(()=>{
            setMainImg(img);
            setFade(false); // Activa el fade-in
        }, 200)
    }

    return(<>
    <div className="page-content">
    {/* Btn para volver */}
    <BtnBack/>

    {/* Card Principal */}
    <div className="product-detail">
        <div className="image-section">
            <img src={mainImg || "/placeholder.jpg"} alt={mainProduct.prodName} className={`main-image ${fade ? "fade" : ""}`}/>
        </div>
        <div className="info-section">
            <h2>{mainProduct.prodName}</h2>
            <p>{mainProduct.prodDescription}</p>

            {/* Mostrar precio solo si tiene un tamaño */}
            {product.length === 1 &&(
                <p className="price">
                    {mainProduct.unit_price ? `$${parseFloat(mainProduct.unit_price).toFixed(2)}` : "Consultar precio"}
                </p>
            ) }

            {/* Label de Tamaño (Si tiene) */}
            {product.length > 1 && (
                <div className="container-size col-md-8">
                    <label htmlFor="size">Tamaño:</label>
                    <select className="form-select mt-2" id="size" value={selectedSize} onChange={(e)=>{setSelectedSize(e.target.value)}} required>
                        <option value="">Seleccionar Tamaño</option>
                        {product.map((p, i) => (
                            <option key={i} value={p.size}>
                                {p.size} - ${parseFloat(p.unit_price).toFixed(2)}
                            </option>
                        ))}
                    </select>
                </div>
                )}
            {/* Label de cantidad */}
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