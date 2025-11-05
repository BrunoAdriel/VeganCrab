import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ variant = "nav", onSearch }) => {
    const [query, setQuery] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const [results, setResults] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Ejecutando búsqueda con:", query);
        if (!query.trim()) return;

        try {
            const res = await fetch(`http://localhost:3000/products/search?q=${encodeURIComponent(query)}`);
            const data = await res.json();
            console.log("Resultado:", data);
            setResults(data.filter || []); // Ajustá según tu estructura de respuesta
        } catch (error) {
            console.error("Error al buscar:", error);
        }
    };

    return (
        <div className={`search-container ${variant}`}>
        {/* Botón para mobile */}
            {variant === "nav" && !showSearch && (
                <button className="icon-btn only-mobile" aria-label="Abrir búsqueda" onClick={() => setShowSearch(true)}>
                    <span className='icon'>🔍</span>
                </button>
            )}
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
            <ul className="search-results">
                {results.map((item) => (
                    
                    <li key={item.idProduct}>{item.prodName} - ${item.unit_price}</li>
                ))}
            </ul>
        )}
    </div>
);
};

export default SearchBar;
