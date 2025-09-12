import React, {useState,useEffect} from "react";
import './Carrousel.css';


const Carrousel = () => {
    
    const [imgCarrusel, setImgCarrusel] = useState([]);

 //Fetch apra obtener los productos apra el carrucel
    useEffect(()=>{ fetch("http://localhost:3000/products/carrousel")
        .then((res)=> res.json())
        .then((data) => {console.log("Back carruasel:", data.carrousel); setImgCarrusel(data.carrousel);})
        .catch((error)=> console.error("Error fetch carrusel", error));
    },[]);


    return (<>
<div id="carouselExampleFade" className="carousel slide carousel-fade">
    <div className="carousel-inner">
        {imgCarrusel.length > 0 ? (
        imgCarrusel.map((prod, idx) => {
            // convierto el string "url1,url2" en array
            const images = prod.images ? prod.images.split(",") : [];
            return (
            <div className={`carousel-item ${idx === 0 ? "active" : ""}`} key={prod.idProduct} >
                <img src={images[0]} className="d-block w-100" alt={prod.prodName} />
                <div className="carousel-caption d-none d-md-block">
                    <h5>{prod.prodName}</h5>
                    <p>{prod.prodDescription}</p>
                </div>
            </div>
            );
        })
        ) : (
        <div className="carousel-item active">
            <img src="/placeholder.jpg" className="d-block w-100" alt="Placeholder" />
        </div>
        )}
    </div>

    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
    </button>
    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
    </button>
</div>
    </>);
};

export default Carrousel;