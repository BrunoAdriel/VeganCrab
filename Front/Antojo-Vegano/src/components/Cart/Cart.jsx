import React,{useState, useEffect} from 'react';
import './Cart.css';

const Cart = () => {

    /* Recupero  los datos guardados */
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    /* Escucha del btn de cierre el modal */
    useEffect(() => {
        const closeBtn = document.querySelector(".close-btn");
        const overlay = document.querySelector(".cart-overlay");

        const closeCart = () => {
            overlay.classList.add("d-none");
        };

        if (closeBtn) closeBtn.addEventListener("click", closeCart);
        if (overlay) overlay.addEventListener("click", closeCart);

        return () => {
            if (closeBtn) closeBtn.removeEventListener("click", closeCart);
            if (overlay) overlay.removeEventListener("click", closeCart);
        };
    }, []);

    return (
        <div className="cart-overlay d-none" onClick={(e) => e.target.classList.contains("cart-overlay") && e.target.classList.add("d-none")}>
        <div className="container-cart">
            <button className="close-btn">✖</button>
            <h3>Tu Carrito</h3>

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
                    </div>
                    </div>
                );
                })
            )}
            </section>

            <div className="container-buttons">
            <button>Ver Carrito</button>
            <button>Finalizar Compra</button>
            </div>
        </div>
        </div>
    );
};

export default Cart;