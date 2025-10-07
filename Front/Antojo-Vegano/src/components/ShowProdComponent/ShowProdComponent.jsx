import React, {useState, useEffect} from 'react';
import './ShowProdComponent.css';
import { Link } from "react-router-dom";


const ShowProdComponent = ({images, producto}) =>{

    return(<>
    {/* Contenedor principal */}
        <div className='container-show-prod'>
        {/* Imagen */}
            <section className='image-section'>
                <img src={images[0]} alt={producto.prodName}/>
            </section>
        {/* Contenido */}
            <section className='content-show-prod'>
                <div className='text-content'>
                    <h2>{producto.prodName}</h2>
                    <p>{producto.prodDescription || "Descripción próximamente disponible."}</p>
                    <Link to={`/products/${producto.idProduct}`} className='btn-see-more' id={producto.idProduct}>VER MÁS</Link>
                </div>
            </section>
        </div>    
    </>)
}


export default ShowProdComponent; 