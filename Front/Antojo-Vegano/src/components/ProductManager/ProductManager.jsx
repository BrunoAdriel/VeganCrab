import React, {useState, useEffect} from 'react';
import './ProductManager.css';


const ProductManager = ()  => {
    const [listProd, setListProd] = useState([]);

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
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 g-4 mx-4">
            {listProd.map((prod)=>{
                const images = prod.images ? prod.images.split(","): [];
                const price = prod.minPrice === prod.maxPrice ? `$ ${prod.minPrice}` : `$ ${prod.minPrice} - $ ${prod.maxPrice}` 
                {/* Agrego los productos */}
                return(
                    <div className="col" key={prod.idProduct}>
                        <div className="card h-100">
                            <img src={images[0] || "/placeholder.jpg" } className="card-img-top" alt={prod.prodName} />
                                            <div className="card-body">
                                                <h5 className="card-title">{prod.prodName}</h5>
                                                <p className="card-text">{prod.prodDescription}</p>
                                                <p className="card-text">{price} </p>
                                                <button className='button-card' id={prod.idProduct}>Seleccionar Opcion</button>
                                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    </>)
}


export default ProductManager;