import React, {useEffect, useState} from 'react';
import './productCard.css'


const ProductCard = ({product, images, price}) =>{


    return(<>
                <div className="card h-100">
                    <img src={images[0] || "/placeholder.jpg" } className="card-img-top" alt={product.prodName} />
                        <div className="card-body">
                            <h5 className="card-title">{product.prodName}</h5>
                            <p className="card-text">{product.prodDescription}</p>
                            <p className="card-text">{price} </p>
                            <button className='button-card' id={product.idProduct}>Seleccionar Opcion</button>
                        </div>
                </div>
    </>)
}

export default ProductCard; 