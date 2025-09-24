import React, {useState, useEffect} from "react";
import "./CarrouselProducts.css";
import ProductCard from "../ProductCard/ProductCard";


const CarrouselProducts = () =>{

    const [products, setProducts] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(()=>{fetch("http://localhost:3000/products/cards")
        .then((res)=>res.json())
        .then((data)=> {console.log("Datos para CarrouselProducts:", data.products); setProducts(data.products);})
        .catch((error)=>console.error("Error en el Fetch de CarrouselProducts ", error));
    }, [])


    const handlePrev = () => {
    setCurrentIndex((prev) =>
        prev === 0 ? products.length - 1 : prev - 1
    );
    };

    const handleNext = () => {
    setCurrentIndex((prev) =>
        prev === products.length - 1 ? 0 : prev + 1
    );
    };

return (
    <div className="custom-carousel-container">
      <button className="custom-carousel-btn prev" onClick={handlePrev}>
        ❮
      </button>

      <div className="custom-carousel-wrapper">
        <div
          className="custom-carousel-track"
          style={{
            transform: `translateX(-${currentIndex * (100 / 5)}%)`,
            width: `${(products.length / 5) * 100}%`
          }}
        >
          {products.map((prod, idx) => {
            const imgMap = {
              1: ["/Products/Hojaldradas/Medialunas2.jpg"],
              2: ["/Products/Hojaldradas/Medialunas2.jpg"],
              3: ["/Products/Hojaldradas/CrossaintDeChocolate.jpg"],
              4: ["/Products/Hojaldradas/CrossaintDeChocolate2.jpg"],
              5: ["/Products/Hojaldradas/Medialunas1.jpg"],
              6: ["/Products/Hojaldradas/cañonDdl.jpg"],
              7: ["/Products/Hojaldradas/Medialunas1.jpg"],
              8: ["/Products/Hojaldradas/cañonDdl.jpg"],
            };
            const images = imgMap[prod.idProduct] || [];
            const price =
              prod.minPrice === prod.maxPrice
                ? `$ ${prod.minPrice}`
                : `$ ${prod.minPrice} - $ ${prod.maxPrice}`;

            return (
              <div className="custom-carousel-item" key={idx}>
                <ProductCard product={prod} images={images} price={price} />
              </div>
            );
          })}
        </div>
      </div>

      <button className="custom-carousel-btn next" onClick={handleNext}>
        ❯
      </button>
    </div>
  );
};




export default CarrouselProducts; 