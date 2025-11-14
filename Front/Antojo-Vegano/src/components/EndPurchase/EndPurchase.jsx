import React, {useState, useEffect} from "react";
import { CartManager } from "../HookCartManager/CartManager";
import BtnBack from "../BtnBack/BtnBack";
import "./EndPurchase.css";
import { toast } from "react-toastify";

const EndPurchase = () =>{
    /* Acceso a las funciones */
    const {cart, removeItem, envio, subTotal} = CartManager();
    /* Constantes de gastos de deliveri, manejo del total, codigo de descuento */
    const [deliveryType, setDeliveryType] = useState("Delivery");
    const [deliveryCost, setDeliveryCost] = useState(envio);
    const [total, setTotal] = useState(subTotal + deliveryCost);
    const [discountCode, setDiscountCode] = useState("");
    const [discountValue, setDiscountValue] = useState(0);
    const [loading, setLoading] = useState(false);
    /* Constante de envio del formulario */
    const [formData, setFormData] = useState({
        name: "",
        lastName: "",
        phone: "",
        email: "",
        address: "",
/*         city: "", */
        zip: "",
        extra: "",
        deliveryType: "Delivery",
    });

    /* Envio de los datos hacia el Back */
    const handleSubmit = async (e) => {
        e.preventDefault();

        /* Validaciones para que el envio de los datos siempre sea correcto */
        if(!formData.name.trim() || !formData.lastName.trim() || !formData.phone.trim() || !formData.email.trim() || !formData.address.trim() || !formData.zip.trim() || !formData.deliveryType.trim() || !formData.deliveryType.trim()){
            toast.error("Por favor completa todo el formulario para poder continuar!");
        return;
        }
        setLoading(true);
            try{
                const payload = {
                    user: formData,
                    cart,
                    deliveryType,
                    deliveryCost,
                    discountValue,
                    total: finalTotal
                };
                /* Verificoo el resultado */
                console.log("Resultado de la informacion:", payload);

                const res = await fetch("http://localhost:3000/orders/", {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(payload)
                });

                const data = await res.json();

        /*     if (data.init_point) {
                window.location.href = data.init_point; // Redirige a MP
            } */
        }catch(error){
            toast.error("Hubo un error al realizar el pedido.❌");
        }finally{
            setLoading(false);
        }
    }


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

    // Actualizar el costo por descuento
    useEffect(()=>{
        if(discountCode==="DescuentoVegano"){
            setDiscountValue(subTotal * 0.15);
        }else{
            setDiscountValue(0);
        }
    }, [discountCode, subTotal]);


    /* Escucha el cambio de estado */
    const handleDeliveryChange = (e) => {
        setDeliveryType(e.target.value);
    };

    /* Escucha el cambio de percio por descuento */
    const handleDiscountChange = (e) => {
        setDiscountCode(e.target.value);
    };
    const finalTotal = total - discountValue;

    /* Previene el "ENTER" en los inputs evita el refresco de la pagina y el error en la misma */
    const preventEnter = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
        }
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
    <form className="container-form endpurchase-form" onSubmit={handleSubmit} onKeyDown={preventEnter}>
        <div className="rigth-container">
            {/* Nombre y Apellido */}
            <section className="name-information">
                <div className="mb-3">
                    <label for="inputName" className="form-label">Nombre</label>
                    <input type="text" className="form-control" id="inputName" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                </div>
                <div className="mb-3">
                    <label for="inputLast" className="form-label">Apellido</label>
                    <input type="text" className="form-control" id="inputLast" value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} />
                </div>
            </section>
            {/* Telefono */}
            <div className="mb-3">
                <label for="inputNumber" className="form-label">Telefono</label>
                <input type="number" className="form-control" id="inputNumber" placeholder="1122334455"  value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})}/>
            </div>
            {/* Email */}
            <div className="mb-3">
                <label for="emailControl" className="form-label">Email address</label>
                <input type="email" className="form-control" id="emailControl" placeholder="name@example.com" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}/>
            </div>
            {/* Direccion */}
                <div className="col-12">
                    <label for="inputAddress" className="form-label">Address</label>
                    <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})}/>
                </div>
                <div className="col-md-2 zip-size">
                    <label for="inputZip" className="form-label">Zip</label>
                    <input type="text" className=" form-control" id="inputZip" value={formData.zip} onChange={(e) => setFormData({...formData, zip: e.target.value})}/> 
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
                    {deliveryCost > 0 && (
                        <p className="mb-1">Envío : ${deliveryCost}</p>
                    )}
                {/* Descuento */}
                <div className="mb-3">
                    <label htmlFor="discountInput"  className="form-label fw-semibold">¿Tenés un descuento?</label>
                    <input type="text" className="form-control" id="discountInput" value={discountCode} onChange={handleDiscountChange}/>
                </div>
                {discountValue > 0 &&(
                    <p className="text-success"> ✅ Código aplicado: -15% (${discountValue.toFixed(2)}) </p>
                )}
                {/* Precio tachado + nuevo */}
                {discountValue > 0 ? (<>
                    <section className="center-discount">
                        <h6 className="text-muted text-decoration-line-through"> Total original: ${total.toLocaleString()} </h6>
                        <h5 className="fw-bold text-success"> Total con descuento: ${finalTotal.toLocaleString()} </h5>
                    </section>
                    </>
                    ) : (
                        <h5> Total a pagar: <strong>${total.toLocaleString()}</strong> </h5>
                    )}
                </div>
                </>)}
            </div>
        </div>
    </form>
    <div className="d-flex justify-content-center mb-5">
        <button className="btn btn-success endBtn" type="button" onClick={handleSubmit}>Finalizar Compra</button>
    </div>
</div>
    </>);
};

export default EndPurchase;  