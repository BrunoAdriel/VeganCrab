import React, {useState, useEffect} from "react";
import { CartManager } from "../HookCartManager/CartManager";
import BtnBack from "../BtnBack/BtnBack";

import "./EndPurchase.css";

const EndPurchase = () =>{
    const {cart, removeItem, envio, total, subTotal} = CartManager(); /* Acceso a las funciones */

    return(<>

    {/* Btn Volver */}
    <BtnBack/>
    
    <div className="section-title">
        <span></span>
        <h2>Finalizar Compra</h2>
        <span></span>
    </div>
    <form className="container-form">
        <div className="rigth-container">
            {/* Nombre y Apellido */}
            <div className="row">
                <div className="col">
                    <input type="text" className="form-control" placeholder="First name" aria-label="First name"/>
                </div>
                <div className="col">
                    <input type="text" className="form-control" placeholder="Last name" aria-label="Last name"/>
                </div>
            </div>
            {/* Telefono */}
            <div className="mb-3">
                <label for="inputNumber" className="form-label">Telefono</label>
                <input type="number" className="form-control" id="inputNumber" placeholder="1122334455"/>
            </div>
            {/* Email */}
            <div className="mb-3">
                <label for="exampleFormControlInput1" className="form-label">Email address</label>
                <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com"/>
            </div>
            {/* Direccion */}
                <div className="col-12">
                    <label for="inputAddress" className="form-label">Address</label>
                    <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St"/>
                </div>
                <div className="col-md-6">
                    <label for="inputCity" className="form-label">City</label>
                    <input type="text" className="form-control" id="inputCity"/>
                </div>
                <div className="col-md-2">
                    <label for="inputZip" className="form-label">Zip</label>
                    <input type="text" className="form-control" id="inputZip" /> 
                </div>
        </div>
        <div className="left-container">
            {/* Comnetarios extras */}
            <div className="form-floating">
                <textarea className="form-control" placeholder="No dudes en dejarnos tu comentario" id="floatingTextarea2" ></textarea>
                <label for="floatingTextarea2">Por algun detalle extra del produto</label>
            </div>
            {/* Devilery */}
            <div className="col-md-4">
                <label for="inputDelivery" className="form-label">Tipo de entrega</label>
                    <select id="inputDelivery" className="form-select">
                    <option selected>Delivery</option>
                    <option>Delivery</option>
                    <option>Retiro en el Local</option>
                </select>
            </div>
            {/* Horario de entrega */}
            <div className="col-md-4">
                <label for="inputTimeDilivery" className="form-label">Tipo de entrega</label>
                <select id="inputTimeDilivery" className="form-select">
                    <option selected>Horario de entrega</option>
                    <option>De 10hrs a 12hrs</option>
                    <option>De 16hrs a 19hrs</option>
                </select>
            </div>  
        </div>
    </form>
    {/* info de los productos */}
    <div className="container-items">

    </div>
    </>);
};

export default EndPurchase;  