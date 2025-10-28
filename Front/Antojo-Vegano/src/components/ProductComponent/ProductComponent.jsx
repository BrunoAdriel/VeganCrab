import React, {useState, useEffect} from "react";
import './ProductComponent.css';
import ProductCard from "../ProductCard/ProductCard.jsx";
import SearchBar from "../SearchBar/SearcBar";
import BtnBack from "../BtnBack/BtnBack.jsx";

const ProductComponent = () =>{
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [categories, setCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const productPage = 15;


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
    const filteredProducts = selectedCategory === "all" ? products : products.filter((prod) => prod.categoryName === selectedCategory);

    /* Mapa de fotos de los productos */
    const imgMap = {
        1: ['../../../public/Products/Hojaldradas/CrossaintDeChocolate2.jpg'],
        2: ['../../../public/Products/Hojaldradas/Medialunas2.jpg'],
        3: ['../../../public/Products/Hojaldradas/CrossaintDeChocolate.jpg'],
        4: ['../../../public/Products/Hojaldradas/CrossaintDeChocolate2.jpg'],
        5: ['../../../public/Products/Hojaldradas/Medialunas1.jpg'],
        6: ['../../../public/Products/Hojaldradas/cañonDdl.jpg'],
        7: ['../../../public/Products/Hojaldradas/Medialunas1.jpg'],
        8: ['../../../public/Products/Hojaldradas/cañonDdl.jpg'],
        9: ['../../../public/Products/Hojaldradas/Medialunas2.jpg'],
        10: ['../../../public/Products/Hojaldradas/Medialunas2.jpg'],
        11: ['../../../public/Products/Hojaldradas/CrossaintDeChocolate.jpg'],
        12: ['../../../public/Products/Hojaldradas/CrossaintDeChocolate2.jpg'],
        13: ['../../../public/Products/Hojaldradas/Medialunas1.jpg'],
        14: ['../../../public/Products/Hojaldradas/cañonDdl.jpg'],
        15: ['../../../public/Products/Hojaldradas/Medialunas1.jpg'],
        16: ['../../../public/Products/Hojaldradas/Medialunas2.jpg'],
        17: ['../../../public/Products/Hojaldradas/Medialunas2.jpg'],
        18: ['../../../public/Products/Hojaldradas/CrossaintDeChocolate.jpg'],
        19: ['../../../public/Products/Hojaldradas/CrossaintDeChocolate2.jpg'],
        20: ['../../../public/Products/Hojaldradas/Medialunas1.jpg']
    }

    // Paginacion
    const totalPages = Math.ceil(filteredProducts.length / productPage);
    const startIndex = (currentPage - 1) * productPage;
    const currentProducts = filteredProducts.slice( startIndex, startIndex + productPage );

    return(<>

        {/* Imagen estatica arriba de los productos */}
        <div className="container-prod-img">
          <img src={imgMap[6]} alt="Imagene"/>
        </div>

      {/* Btn Volver */}
        <BtnBack/>

        {/* Filtros */}
        <div className="product-layout">
        <aside className="sidebar">
            <ul className="filter-list">
                <li className={selectedCategory === "all" ? "active" : ""} onClick={() => {setSelectedCategory("all") ; setCurrentPage(1);} }> 
                    Todos
                </li>
            {categories.map((cat) => (
                <li key={cat} className={selectedCategory === cat ? "active" : ""} onClick={() => {setSelectedCategory(cat); setCurrentPage(1);} } >
                    {cat}
              </li>
            ))}
          </ul>
        </aside>

        {/* Titulo dinámico */}
      <main className="products-section">
        <div className="section-title">
            <span></span>
              <h2>{selectedCategory === "all" ? "Nuestros Productos" : `${selectedCategory}`}</h2>
            <span></span>
          </div>

        {/* Inyecto el buscador */}
        <div className="container">
                <SearchBar variant="product" onSearch={handleSearch} />
        </div>

          {/* Renderizado de productos filtrados */}
          <div className="products-grid">
            {currentProducts.length > 0 ? (
              currentProducts.map((prod) => {

                const backendImages = prod.images ? prod.images.split("|") : [];
                const fallbackImages = imgMap[prod.idProduct] || [];
                // Si la URL contiene 'drive.google.com', forzamos a usar el fallback
                const shouldUseFallback =
                  backendImages.length === 0 ||
                  backendImages.some(url => url.includes("drive.google.com"));

                const images = shouldUseFallback ? fallbackImages : backendImages;/*  backendImages.length > 0 ? backendImages : fallbackImages; */
                const price = prod.minPrice === prod.maxPrice ? `$ ${prod.minPrice}` : `Mini $${prod.minPrice} - XL $${prod.maxPrice}`;

                return (
                  <div className="col" key={prod.idProduct}>
                    <ProductCard key={prod.idProduct} product={prod} images={images} price={price}/>
                  </div>
                );
              })  
            ) : (
              <p>No hay productos en esta categoría.</p>
            )}
          </div>

        {/* Paginación */}

        {totalPages > 1 && (
          <div className="pagination">
            {Array.from({ length: totalPages }, (_, index) => (
                <button key={index + 1} className={currentPage === index + 1 ? "active" : ""} onClick={() => setCurrentPage(index + 1)}> {index + 1} </button>
            ))}
          </div>
        )}
        </main>
      </div>

    </>)
}

export default  ProductComponent; 