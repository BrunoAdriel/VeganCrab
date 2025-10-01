import React,{useState} from 'react';
import './SearchBar.css';


const SearchBar = ({variant= "nav", onSearch}) =>{
    const [query,setQuery] =useState("");
        const [showSearch, setShowSearch] = useState(false);

    /* Controlador de busqueda */
    const handleSubmit = (e)=>{
        e.preventDefault();
        if(!query.trim()) return;
        console.log("Buscaste:", query); // Cambiar por Query  de SQL  
    }

    return(<>
            {!showSearch && (
                <button className="icon-btn only-mobile" aria-label="Abrir búsqueda" onClick={() => setShowSearch(true)} >
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-search d-lg-none" viewBox="0 0 16 16" role="button" onClick={() => setShowSearch(true)}>
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001l3.85 3.85a1 1 0 0 0 1.415-1.415l-3.85-3.85zm-5.242 1.656a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11z"/>
                </svg>
            </button>
            )}
            {/* Desktop y mobile cuando está activo */}
            <form className={`search-box ${showSearch ? "open" : ""}`} onSubmit={handleSubmit}>
                <button type="button" className="icon-btn only-mobile me-2" aria-label="Volver" onClick={() => setShowSearch(false)} >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16" fill="currentColor">
                        <path fillRule="evenodd" d="M15 8.5a.5.5 0 0 1-.5.5H3.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L3.707 8H14.5a.5.5 0 0 1 .5.5z"/>
                    </svg>
                </button>
                <input type="text" className="search-input" placeholder="Buscar" value={query} onChange={(e) => setQuery(e.target.value)} />

            {/* Lupa de envío al final del input */}
            <button type="submit" className="icon-btn end-icon" aria-label="Buscar">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398l3.85 3.85a1 1 0 0 0 1.415-1.415zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                </svg>
            </button>
            </form>
            
    </>)
}
export default SearchBar; 