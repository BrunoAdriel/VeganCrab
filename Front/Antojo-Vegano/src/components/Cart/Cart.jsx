import React,{useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import {CartManager} from "../HookCartManager/CartManager.jsx";
import './Cart.css';

const Cart = () => {
    const {cart, removeItem, envio, total, subTotal } = CartManager(); /* Acceso a las funciones */
    const [visible, setVisible] = useState(false);
    const navigate = useNavigate(); /* Constante para marcar un punto de navegacion */

    /* Funcion para ir a "Ver Carrito" */
    const handleGoToCart = () => {
        /* Indico la ruta  */
        setVisible(false);
        navigate("/cart", { state: { cart } });
    };

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
                    <p className="mb-1">SubTotal: ${subTotal}</p>
                    <p lassName="mb-1">Envío: ${envio}</p>
                    <h4>Total a pagar: ${total} </h4>
                </div>
                <div className="container-buttons">
                    <button className='btn-add' onClick={ handleGoToCart} >Ver Carrito</button>
                    <button className='btn-add'>Finalizar Compra</button>
                </div>
            </div>
        </div>
    );
};

export default Cart;