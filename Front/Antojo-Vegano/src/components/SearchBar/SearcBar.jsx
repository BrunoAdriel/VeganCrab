import React,{useState} from 'react';
import './SearchBar.css';


const SearchBar = ({variant= "nav", onSearch}) =>{
    const [query,setQuery] =useState("");
    const [showSearch, setShowSearch] = useState(false);

    /* Controlador de busqueda */
    const handleSubmit = (e)=>{
        e.preventDefault();
        if(!query.trim()) return;
        if (onSearch) onSearch(query);
        console.log("Buscaste:", query); // Cambiar por Query  de SQL  
    }

    return(<>
        <div className={`search-container ${variant}`}>
        {/* Botón para mobile, solo si es nav */}
        {variant === "nav" && !showSearch && (
            <button className="icon-btn only-mobile" aria-label="Abrir búsqueda" onClick={() => setShowSearch(true)}> 
                <span className='icon'>🔍</span>
            </button>
        )}
            <form className={`search-box ${ variant === "nav" ? (showSearch ? "open" : "") : "always-open" }`} onSubmit={handleSubmit} >
                {/* Flecha de volver, solo nav en mobile */}
                {variant === "nav" && (
                    <button type="button" className="icon-btn only-mobile me-2" aria-label="Volver" onClick={() => setShowSearch(false)} > ← </button>
                    )}
                    <input type="text" className="search-input" placeholder="Buscar" value={query} onChange={(e) => setQuery(e.target.value)} />
                        <button type="submit" className="icon-btn end-icon" aria-label="Buscar">
                            <span className='icon'>🔍</span>
                        </button>
            </form>
        </div>
    </>)
}
export default SearchBar; 