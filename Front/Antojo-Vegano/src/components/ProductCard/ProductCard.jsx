import React, {useEffect, useState} from 'react';
import './productCard.css';
import { Link } from "react-router-dom";


const ProductCard = ({product, images, price}) =>{


    return(<>
                <div className="card h-100">
                    <Link to={`/products/${product.idProduct}`} className="card-link">
                        <img src={images[0] || "/placeholder.jpg" } className="card-img-top" alt={product.prodName} />
                    </Link>
                        <div className="card-body">
                            <h5 className="card-title">{product.prodName}</h5>
                            <p className="card-text">{product.prodDescription}</p>
                            <p className="card-text">{price} </p>
                            <Link to={`/products/${product.idProduct}`} className='button-card' id={product.idProduct}
                            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                            >Seleccionar Opcion</Link>
                        </div>
                </div>
    </>)
}

export default ProductCard; 