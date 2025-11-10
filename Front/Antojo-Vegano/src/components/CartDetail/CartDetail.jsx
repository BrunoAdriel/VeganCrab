import React from "react";
import { useLocation } from "react-router-dom";
import { CartManager } from "../HookCartManager/CartManager";
import { Link } from "react-router-dom";
import  BtnBack  from "../BtnBack/BtnBack.jsx";
import "./CartDetial.css";

const CartDetail = () =>{
    const location = useLocation();
    const {cart, removeItem, envio, total, subTotal, clearCart} = CartManager(); /* Acceso a las funciones */

    return(<>

        <div className="page-content">
        <BtnBack/>

        <div className="container mt-4">
            <h2 className="mb-4 text-center">Resumen de tu Carrito</h2>
                {cart.length === 0 ? (
                    <p className="text-center">Tu carrito está vacío.</p>
                ) : (<>
                <div className="table-responsive">
                    <table className="table table-secondary table-striped text-center align-middle">
                        <thead>
                            <tr>
                                <th scope="col">Producto</th>
                                <th scope="col">Cantidad</th>
                                <th scope="col">Precio</th>
                                <th scope="col">Tamaño</th>
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
                                <td>{prod.size || " - "}</td>
                                <td>${prod.price * prod.quantity}</td>
                                <td><button className="btn btn-sm btn-outline-danger" onClick={() => removeItem(prod.id)}>✖</button></td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

          {/* Sección de totales */}
            <div className="d-flex flex-column align-items-end my-3">
                <p className="mb-1">Subtotal : ${subTotal}</p>
                <p className="mb-2">Envío :  ${envio}</p>
                <h5>Total a pagar: <strong>${total.toLocaleString()}</strong></h5>
                {cart.length > 1 &&(
                    <div>
                        <button className='button-card mt-1' onClick={clearCart}>Vaciar Carrito</button>
                    </div>
                )}
                <Link to="/Finalizar-Compra" className="btn btn-success mt-3" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                >Finalizar Compra</Link>
            </div>
            </>)}
        </div>
        </div>
    </>);
};

export default CartDetail;