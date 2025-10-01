import React, {useState, useEffect} from "react";
import './ProductComponent.css';
import ProductCard from "../ProductCard/ProductCard.jsx";
import SearchBar from "../SearchBar/SearcBar";

const ProductComponent = () =>{
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [categories, setCategories] = useState([]);
    

        useEffect(()=>{fetch("http://localhost:3000/products")
            .then((res)=> res.json())
            .then((data)=> {console.log("Datos sobre Productos:", data.products); setProducts(data.products)
                
            // obtener categorías únicas
const uniqueCats = [
  ...new Set(data.products.map((prod) => prod.categoryName)),
];
setCategories(uniqueCats);
                })
            .catch((error) => console.error("Error en el Fetch de Productos", error));
        },[]);
    
    const handleSearch = (query) => {
        console.log("Buscaste desde Products:", query);
    };
    
    // filtrar productos por categoría
    const filteredProducts =
  selectedCategory === "all"
    ? products
    : products.filter((prod) => prod.categoryName === selectedCategory);

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
        {/* Titulo de Productos */}
        <div className="section-title">
            <span></span>
            <h2>Nuestros Productos</h2>
            <span></span>
        </div>
    
        {/* Inyecto el buscador */}
        <div className="container">
                <SearchBar variant="product" onSearch={handleSearch} />
        
      {/* Titulo dinámico */}
        <div>
            <h2>
            {selectedCategory === "all"
                ? "Nuestros Productos"
                : `Categoría: ${selectedCategory}`}
            </h2>
        </div>

        {/* Filtros */}
{/*         <div className="container-filter">
            
            <ul>

            </ul>
        </div> */}
        <div className="container-filter">
            <ul>
                <li className={selectedCategory === "all" ? "active" : ""} onClick={() => setSelectedCategory("all")} > 
                    Todos
                </li>
            {categories.map((cat) => (
                <li key={cat} className={selectedCategory === cat ? "active" : ""} onClick={() => setSelectedCategory(cat)} >
                    {cat}
              </li>
            ))}
          </ul>
        </div>

        {/* Renderizado de productos filtrados */}
<div className="products-grid">
  {filteredProducts.length > 0 ? (
    filteredProducts.map((prod) => {
      // 1) imágenes: si viene del backend, spliteo el string.
      // Si no hay imágenes, uso imgMap como fallback.
      const backendImages = prod.images
        ? prod.images.split("|")
        : [];
      const fallbackImages = imgMap[prod.idProduct] || [];
      const images = backendImages.length > 0 ? backendImages : fallbackImages;

      // 2) precio: si min y max son iguales, muestro un solo valor
      const price =
        prod.minPrice === prod.maxPrice
          ? `$ ${prod.minPrice}`
          : `$ ${prod.minPrice} - $ ${prod.maxPrice}`;

      return (
        <ProductCard
          key={prod.idProduct}
          product={prod}
          images={images}
          price={price}
        />
      );
    })
  ) : (
    <p>No hay productos en esta categoría.</p>
  )}
</div>
</div>
    </>)
}

export default  ProductComponent; 