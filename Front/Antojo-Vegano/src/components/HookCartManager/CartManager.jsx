import React,{useState, useEffect} from "react";

/* Hook osbre las acciones del Cart */
export const CartManager = () =>{

    /* Recupero  los datos guardados */
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")) || []);

    /* Actualizar Storage y estado */
    const updateStorage  = (newCart) =>{
        setCart(newCart);
        localStorage.setItem("cart", JSON.stringify(newCart));
        window.dispatchEvent(new Event("cartUpdated"));
    }

    /* Agregar un producto */
    const addItem = (item) => {
    const existing = cart.find((p) => p.id === item.id);
    let updatedCart;
    if (existing) {
        updatedCart = cart.map( (p) => p.id === item.id ? { ...p, quantity: p.quantity + item.quantity } : p );
    } else {
        updatedCart = [...cart, item];
    }
    updateStorage(updatedCart);
    };

    /* Precio Envio */
    const envio = 4500;

    /* Precio subTotal  */
    const subTotal = cart.reduce((acc, p) => acc + p.price * p.quantity, 0);

    /* Precio Total */
    const total = subTotal + envio;

    /* Items del carrito */
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    /* Eliminar un producto */
    const removeItem = (id) => {
        const updatedCart = cart.filter((p) => p.id !== id);
        updateStorage(updatedCart);
    };

    /* Vaciar el carrito */
    const clearCart = () => updateStorage([]);
    
    /* Escucha los cambios globales */
    useEffect(() => {
    const syncCart = () => setCart(JSON.parse(localStorage.getItem("cart")) || []);
    /* Evento de escucha, nuevo item */
    window.addEventListener("cartUpdated", syncCart);
    /* Evento de escucha, en otros navegadores/pestañas */
    window.addEventListener("storage", syncCart);
    return () => {
        window.removeEventListener("cartUpdated", syncCart);
        window.removeEventListener("storage", syncCart);
    };
    }, []);

    return {cart, addItem, removeItem, clearCart, envio, total, subTotal, totalItems};

}