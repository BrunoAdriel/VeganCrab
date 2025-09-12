import React, {useState,useEffect} from "react";
import './Carrousel.css';


const Carrousel = () => {

    // Mapa de imagenes para el carrousel
    const imgMap = {
        1: ["../../../public/Products/Hojaldradas/Medialunas1.jpg", "../../../public/Products/Hojaldradas/Medialunas2.jpg"],
        2: ["../../../public/Products/Hojaldradas/cañonDdl.jpg", "../../../public/Products/Hojaldradas/cañonDdl.jpg"],
        4: ["../../../public/Products/Hojaldradas/CrossaintDeChocolate.jpg", "../../../public/Products/Hojaldradas/CrossaintDeChocolate2.jpg"]
    }
    

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
                    // Capturo las imagenes  y lasigualo al idProdcut
                    const images = imgMap[prod.idProduct] || [];
                    return (
                    <div className={`carousel-item ${idx === 0 ? "active" : ""}`} key={prod.idProduct} >
                        <div className="d-flex">
                            {images[0] && (<img src={images[0]} className="d-block w-50" alt={`${prod.prodName}-1`}/>)}
                            {images[1] && (<img src={images[0]} className="d-block w-50" alt={`${prod.prodName}-2`}/>)}
                        </div>
                        <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                            <h5 className="bg-dark text-white px-3 py-1 rounded">{prod.prodName}</h5>
                            {prod.prodDescription && <p>{prod.prodDescription}</p>}
                        </div>
                    </div>
                    );
                })
                ) : (
                <div className="carousel-item active">
                    <img src="/placeholder.jpg" className="d-block w-100" alt="Placeholder" />
                    <p>Informacion del carrucel no encontrada</p>
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