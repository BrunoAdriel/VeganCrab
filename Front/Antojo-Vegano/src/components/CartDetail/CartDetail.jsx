import React from "react";
import { useLocation } from "react-router-dom";
import "./CartDetial.css";

const CartDetail = () =>{
    const location = useLocation();
    const cart = location.state?.cart || JSON.parse(localStorage.getItem("cart")) || [];
    const envio = 4500;

    const subtotal = cart.reduce((acc, p) => acc + p.price * p.quantity, 0);
    const total = subtotal + envio;

    /* Funcion para eliminar por (ID) */
    const removeItem = (id) => {
        const updatedCart = cart.filter((prod) => prod.id !== id);
        cart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        window.dispatchEvent(new Event("cartUpdated"));
    };

    return(
        <div className="container mt-4">
            <h2 className="mb-4 text-center">Resumen de tu Carrito</h2>
                {cart.length === 0 ? (
                    <p className="text-center">Tu carrito está vacío.</p>
                ) : (<>
                <table className="table table-secondary table-striped text-center align-middle">
                    <thead>
                        <tr>
                            <th scope="col">Producto</th>
                            <th scope="col">Cantidad</th>
                            <th scope="col">Precio</th>
                            <th scope="col">Total</th>
                            <th scope="col">Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map((prod) => (
                        <tr key={prod.id}>
                            <td>{prod.name}</td>
                            <td>{prod.quantity}</td>
                            <td>${prod.price}</td>
                            <td>${prod.price * prod.quantity}</td>
                            <td><button className="btn btn-sm btn-outline-danger" onClick={() => removeItem(prod.id)}>✖</button></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
          {/* Sección de totales */}
            <div className="d-flex flex-column align-items-end mt-3">
                <p className="mb-1">+ ${envio} de envío</p>
                <h5>Total a pagar: <strong>${total.toLocaleString()}</strong></h5>
                <button className="btn btn-success mt-3">Finalizar Compra</button>
            </div>
            </>)}
        </div>
    );
};

export default CartDetail;