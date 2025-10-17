import React,{useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import './Cart.css';

const Cart = () => {
    /* Recupero  los datos guardados */
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")) || []);
    const [visible, setVisible] = useState(false);
    const navigate = useNavigate(); /* Constante para marcar un punto de navegacion */

    /* Funcion para eliminar por (ID) */
    const removeItem = (id) => {
        const removedCart = cart.filter((prod) => prod.id !== id);
        setCart(removedCart);
        localStorage.setItem("cart", JSON.stringify(removedCart));

        // Actualizo el evento
        window.dispatchEvent(new Event("cartUpdated"));
    };

    /* Funcion para ir a "Ver Carrito" */
    const handleGoToCart = () => {
        /* Indico la ruta  */
        setVisible(false);
        navigate("/cart", { state: { cart } });
    };


    /* Escucha del btn de cierre el modal */
    useEffect(() => {
        /* Funcion para actualizar el estado */
        const updateCart = () =>{
            const update = JSON.parse(localStorage.getItem("cart")) || [];
            setCart(update);
        }

        /* Evento de escucha, nuevo item */
        window.addEventListener("cartUpdated", updateCart)
        /* Evento de escucha, en otros navegadores/pestañas */
        window.addEventListener("storage", updateCart);

        return () => {
            window.removeEventListener("cartUpdated", updateCart);
            window.removeEventListener("storage", updateCart);
        };
    }, []);

    /* Mostrar / Ocultar desde BTn o overlay */
    useEffect(() => {
        const toggleCart = () => setVisible((prev) => !prev);
        window.addEventListener("toggleCart", toggleCart);

    return () => window.removeEventListener("toggleCart", toggleCart);
    }, []);
    if (!visible) return null;


    return (
        <div className="cart-overlay" onClick={(e) => e.target.classList.contains("cart-overlay") && setVisible(false)}>
        <div className="container-cart">
            <button className="close-btn" onClick={() => setVisible(false)}>◀️</button>
            <h3>Tu Carrito</h3>
            {/* Inyecto los productos guardados en el Storage */}
            <section className="cart-prods">
            {cart.length === 0 ? (
                <p>No hay productos en el carrito.</p>
            ) : (
                cart.map(prod => {
                const total = prod.price * prod.quantity;
                return (
                    <div key={prod.id} className="card-cart">
                    <img src={prod.image || "/placeholder.jpg"} alt={prod.name} />
                    <div>
                        <h5>{prod.name}</h5>
                        <p>{prod.size || ""}</p>
                        <p>{prod.quantity} X ${prod.price}</p>
                        <p>Total: ${total}</p>
                        <button className='remove-item' onClick={() => removeItem(prod.id)}>✖</button>
                    </div>
                    </div>
                );
                })
            )}
            </section>
            <div className="cart-total">
                <h4>Total a pagar: ${cart.reduce((acc, prod) => acc + prod.price * prod.quantity, 0)}</h4>
            </div>
            <div className="container-buttons">
            <button className='btn-add' onClick={ handleGoToCart} >Ver Carrito</button>
            <button className='btn-add'>Finalizar Compra</button>
{/*             <button className='btn-see-more'>Ver Carrito</button> */}
            </div>
        </div>
        </div>
    );
};

export default Cart;