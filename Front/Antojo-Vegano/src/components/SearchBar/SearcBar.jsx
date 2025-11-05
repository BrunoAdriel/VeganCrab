import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SearchBar.css';

const SearchBar = ({ variant = "nav", onSearch }) => {
    const [query, setQuery] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const [results, setResults] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!query.trim()) return;

        try {
            const res = await fetch(`http://localhost:3000/products/search?q=${encodeURIComponent(query)}`);
            const data = await res.json();
            setResults(data.filter || []); 
        } catch (error) {
            console.error("Error al buscar:", error);
        }
    };

    /* Cuando se clickea el producto */
    const handleSelect = () => {
        setQuery("");
        setResults([]);
        setShowSearch(false);
        window.scrollTo({ top:0, behavior: "smooth"});
    }

    return (
        <div className={`search-container ${variant}`}>
            {/* Botón para mobile */}
            {variant === "nav" && !showSearch && (
                <button className="icon-btn only-mobile" aria-label="Abrir búsqueda" onClick={() => setShowSearch(true)}>
                    <span className='icon'>🔍</span>
                </button>
            )}
            {/* Formulario de búsqueda */}
            <form className={`search-box ${variant === "nav" ? (showSearch ? "open" : "") : "always-open"}`} onSubmit={handleSubmit}>
                {variant === "nav" && (
                    <button type="button" className="icon-btn only-mobile me-2" aria-label="Volver" onClick={() => setShowSearch(false)}> ← </button>
                )}
                <input type="text" className="search-input" placeholder="Buscar" value={query}onChange={(e) => setQuery(e.target.value)}/>
                <button type="submit" className="icon-btn end-icon" aria-label="Buscar">
                    <span className='icon'>🔍</span>
                </button>
            </form>

            {/* En el caso de encontrar el producto */}
            {results.length > 0 && (
                <div className="search-results-box">
                    <ul className="search-results">
                        {results.map((prod) => (
                            
                            <li key={prod.idProduct}>
                            <Link to={`/products/${prod.idProduct}`} onClick={handleSelect} className="search-item-link" >
                                <div className="search-item">
                                    <img src={ prod.images ? prod.images.split("|")[0] : "/placeholder.jpg" } alt={prod.prodName} />
                                    <div className="search-info">
                                        <h6>{prod.prodName}</h6>
                                        <p>{prod.prodDescription}</p>
                                        <p>${prod.minPrice?.toLocaleString() || "Consultar"}</p>
                                    </div>
                                </div>
                            </Link>
                            </li>
                        )
                        )}
                    </ul>
                </div>
            )}
        </div>
);
};

export default SearchBar;
