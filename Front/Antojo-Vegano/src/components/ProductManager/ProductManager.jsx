import React, {useState, useEffect} from 'react';
import './ProductManager.css';


const ProductManager = ()  => {
    const [listProd, setListProd] = useState([]);

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

    useEffect(()=>{fetch("http://localhost:3000/products")
        .then((res)=> res.json())
        .then((data)=> {console.log("Datos sobre Productos:", data.products); setListProd(data.products); })
        .catch((error) => console.error("Error en el Fetch de Productos", error));
    },[])


    return(<>
        <div className="section-title">
            <span></span>
            <h2>Nuestros Productos</h2>
            <span></span>
        </div>

        {/* Cards */}      
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 g-4 mx-4 my-2">
            {listProd.slice(0,4).map((prod)=>{
                const images = imgMap[prod.idProduct] || [];
                const price = prod.minPrice === prod.maxPrice ? `$ ${prod.minPrice}` : `$ ${prod.minPrice} - $ ${prod.maxPrice}` 
                {/* Agrego 4 primeros productos "Destacados" */}
                return(
                    <div className="col" key={prod.idProduct}>
                        <div className="card h-100">
                            <img src={images[0] || "/placeholder.jpg" } className="card-img-top" alt={prod.prodName} />
                                            <div className="card-body">
                                                <h5 className="card-title">{prod.prodName}</h5>
                                                <p className="card-text">{prod.prodDescription}</p>
                                                <p className="card-text">{price} </p>
                                                <button className='button-card' id={prod.idProduct}>
                                                    <span>Seleccionar </span>
                                                    <span> Opcion</span>
                                                </button>
                                            </div>
                        </div>
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
                <button className="btn-see-more">VER MÁS</button>
            </div>
        </div>
    </>)
}


export default ProductManager;