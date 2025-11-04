import React, {useState, useEffect} from 'react';
import ProductCard from '../ProductCard/ProductCard.jsx';
import './ProductManager.css';
import { Link } from "react-router-dom";
import Carrousel from '../Carrousel/Carrousel.jsx';
import ShowProdComponent from '../ShowProdComponent/ShowProdComponent.jsx';


const ProductManager = ()  => {
    const [listProd, setListProd] = useState([]);

        useEffect(()=>{fetch("http://localhost:3000/products/cards")
        .then((res)=> res.json())
        .then((data)=> {console.log("Datos sobre Productos:", data.products); setListProd(data.products); })
        .catch((error) => console.error("Error en el Fetch de Productos", error));
    },[])


    /* Mapa de fotos de los productos */
    const imgMap = {
        1: ['../../../public/Products/Hojaldradas/Medialunas2.jpg'],
        2: ['../../../public/Products/Hojaldradas/Medialunas2.jpg'],
        3: ['../../../public/Products/Hojaldradas/CrossaintDeChocolate.jpg'],
        4: ['../../../public/Products/Hojaldradas/CrossaintDeChocolate2.jpg'],
        5: ['../../../public/Products/Hojaldradas/Medialunas1.jpg'],
        6: ['../../../public/Products/Hojaldradas/cañonDdl.jpg'],
        7: ['../../../public/Products/Hojaldradas/Medialunas1.jpg'],
        8: ['../../../public/Products/Hojaldradas/cañonDdl.jpg']
    }

    return(<>
    {/* Importo el carrousel */}
    <div>
        <Carrousel/>
    </div>

    {/* Linea divisioria */}
    <div className="section-divider">
        <span className="line"></span>
        <p>✨ Del horno a tu mesa ✨</p>
        <span className="line"></span>
    </div>




    {/* Importo los productos de muestra ids:4-5*/}
    <div>
    {listProd.slice(3,5).map((prod)=>{
        const images = imgMap[prod.idProduct] || [];
        return(
                <ShowProdComponent key={prod.idProduct} producto={prod} images={images}/>
        )
    })}
    </div>


    {/* Titulo con estilo */}
        <div className="section-title">
            <span></span>
            <h2>Nuestros Productos</h2>
            <span></span>
        </div>

        {/* Cards inyectadas */}      
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 g-4 mx-4 my-2">
            {listProd.slice(0,4).map((prod)=>{
                const images = imgMap[prod.idProduct] || [];
                const price = prod.minPrice === prod.maxPrice ? `$ ${prod.minPrice}` : `$ ${prod.minPrice} - $ ${prod.maxPrice}` 
                {/* Agrego 4 primeros productos */}
                return(
                    <div className="col" key={prod.idProduct}>
                        <ProductCard product={prod} images={images} price={price}/>
                    </div>
                );
            })}
        </div>
        {/* Segunda fila de productos con vinculo a productos */}
        <div className="see-more-block">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 g-4 mx-4 my-2 cropped-row">
            {listProd.slice(4,8).map((prod)=>{
                const images = imgMap[prod.idProduct] || []; 
                {/* Agrego 4 productos de sola imagenes  */}
                return(
                    <div className='col' key={prod.idProducto}>
                        <div className='card h-100 product-preview'>
                            <div className="card cropped-card">
                            <img src={images[0] || "/placeholder.jpg" } className='card-img-top' alt={prod.prodName} />
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
            {/* Botón VER MÁS */}
            <div className="see-more-btn-container">
                <Link to="/productos" className="btn-see-more" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>VER MÁS</Link>
            </div>
        </div>
    </>)
}


export default ProductManager;