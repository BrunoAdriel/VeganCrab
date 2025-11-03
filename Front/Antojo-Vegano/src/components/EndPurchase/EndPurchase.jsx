import React, {useState, useEffect} from "react";
import { CartManager } from "../HookCartManager/CartManager";
import BtnBack from "../BtnBack/BtnBack";
import "./EndPurchase.css";

const EndPurchase = () =>{
    /* Acceso a las funciones */
    const {cart, removeItem, envio, subTotal} = CartManager();
    /* Constantes de gastos de deliveri */
    const [deliveryType, setDeliveryType] = useState("Delivery");
    const [deliveryCost, setDeliveryCost] = useState(envio);
    const [total, setTotal] = useState(subTotal + deliveryCost);

    /* Acutualizar el costo de envio */
    useEffect(()=>{
        if(deliveryType === "Delivery"){
            setDeliveryCost(envio);
        } else {
            setDeliveryCost(0);
        }
    }, [deliveryType]);

    // Actualizar total dinámicamente
    useEffect(() => {
        setTotal(subTotal + deliveryCost);
    }, [subTotal, deliveryCost]);

    /* Escucha el cambio de estado */
    const handleDeliveryChange = (e) => {
        setDeliveryType(e.target.value);
    };

    return(<>

    <div className="page-content">
    {/* Btn Volver */}
    <BtnBack/>
    
    <div className="section-title">
        <span></span>
        <h2>Finalizar Compra</h2>
        <span></span>
    </div>
    <form className="container-form endpurchase-form">
        <div className="rigth-container">
            {/* Nombre y Apellido */}
            <section className="name-information">
                <div className="mb-3">
                    <label for="inputName" className="form-label">Nombre</label>
                    <input type="text" className="form-control" id="inputName" />
                </div>
                <div className="mb-3">
                    <label for="inputLast" className="form-label">Apellido</label>
                    <input type="text" className="form-control" id="inputLast" />
                </div>
            </section>
            {/* Telefono */}
            <div className="mb-3">
                <label for="inputNumber" className="form-label">Telefono</label>
                <input type="number" className="form-control" id="inputNumber" placeholder="1122334455"/>
            </div>
            {/* Email */}
            <div className="mb-3">
                <label for="emailControl" className="form-label">Email address</label>
                <input type="email" className="form-control" id="emailControl" placeholder="name@example.com"/>
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
                <div className="col-md-2 zip-size">
                    <label for="inputZip" className="form-label">Zip</label>
                    <input type="text" className=" form-control" id="inputZip" /> 
                </div>
        </div>
        <div className="left-container">
            {/* Comnetarios extras */}
                <div className="form-floating">
                    <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea2" ></textarea>
                    <label for="floatingTextarea2">Informacion extra del pedido</label>
                </div>
            {/* Devilery */}
            <div className="container-select">
                <div className="col-md-4">
                    <label for="inputDelivery" className="form-label">Tipo de entrega</label>
                        <select id="inputDelivery" className="form-select" value={deliveryType} onChange={handleDeliveryChange} >
                        <option selected>Delivery</option>
                        <option>Delivery</option>
                        <option>Retiro en el sucursal</option>
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
                {/* info de los productos */}
            <div  className="container-table">
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
                    </div>
                {/* Sección de totales */}
                <div className="d-flex flex-column align-items-end my-3">
                    <p className="mb-1">Subtotal : ${subTotal}</p>
                    {deliveryCost > 0 && (
                        <p className="mb-1">Envío : ${deliveryCost}</p>
                    )}
                    <h5>Total a pagar: <strong>${total.toLocaleString()}</strong></h5>
                </div>
                </>)}
            </div>
        </div>
    </form>
</div>
    </>);
};

export default EndPurchase;  