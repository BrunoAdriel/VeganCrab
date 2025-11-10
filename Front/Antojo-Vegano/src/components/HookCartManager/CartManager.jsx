import React,{useState, useEffect} from "react";
import { toast } from "react-toastify";


/* Hook osbre las acciones del Cart */
export const CartManager = () =>{

    /* Recupero  los datos guardados */
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")) || []);

    /* Gradiante toastify */
    const toastColors = {
        success: "linear-gradient(90deg, #b8e994, #78e08f)",
        error: "linear-gradient(90deg, #ff9a9e, #f6416c)",
        warning: "linear-gradient(90deg, #f6d365, #fda085)"
    };


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
        toast.success(`Se agregaron ${item.quantity} más de ${item.name} 🛒`, { style: {background:  toastColors.success}});
    } else {
        updatedCart = [...cart, item];
        toast.success(`Agregaste  ${item.name} X ${item.quantity} al carrito 🎉`, { style: {background:  toastColors.success}});
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
        const productRemoved = cart.find((p) => p.id === id);
        const updatedCart = cart.filter((p) => p.id !== id);
        updateStorage(updatedCart);
            if(productRemoved){
                toast.warning(`🗑️ Se eliminó ${productRemoved.name} ${productRemoved.quantity} unidades`, { style: {background:  toastColors.warning}});
            }else{
                toast.warning("El producto ya no esta el en carrito", { style: {background:  toastColors.warning}});
            }
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