// LLama a las consultas SQL y arma la logica

import {insertOrder, insertOrderDetail, updateOrderStatus, getOrdersUsers} from "../models/orderModel.js";

// Llama a las consultas del usuario
import {insertUser, getUserByPhone} from "../models/userModel.js";

// Importo controlador de MercadoPago
import { MercadoPagoConfig, Preference } from "mercadopago";
import dotenv from "dotenv";
dotenv.config();

// Coneccion a merdacoPago
const client = new MercadoPagoConfig({
    accessToken: process.env.MP_ACCESS_TOKEN
});

// Crear las ordenes / verifica y registra el usuario 

export const createOrder = async (req, res)=> {
    try {
        // Obtengo los datos del usuario y del producto, junto con las variables pasadas
        const { user, cart, deliveryCost, discountValue, total, extraInfo } = req.body;
        // Los datos del usuario los amaceno 
        const { name, lastName, phone, email, address, zip } = user;

        // 1. Buscar usuario por teléfono
        let idUser = await getUserByPhone(phone);

        // 2. Si no existe → crear usuario
        if (!idUser) {
            idUser = await insertUser(
                name,
                lastName,
                phone,
                address,
                email,
                zip
            );
        }

        // 3. Crear orden
        const idOrder = await insertOrder(
            idUser,
            total,
            discountValue,
            deliveryCost,
            extraInfo
        );

        // 4. Insertar detalles de la orden
        for (const item of cart) {
            await insertOrderDetail(
                idOrder,
                item.id,
                item.quantity,
                item.quantity * item.price
            );
        }

        // 5. Crear respuesta para MercadoPago
        const mpItems = cart.map((item)=>({
            title:item.name,
            quantity:Number(item.quantity),
            currency_id: "ARS",
            unit_price: Number(item.price),
        }));

        // Agregar envío
        if (deliveryCost > 0) {
            mpItems.push({
                title: "Costo de envío",
                quantity: 1,
                currency_id: "ARS",
                unit_price: Number(deliveryCost)
            });
        }

    // Agregar descuento
        if (discountValue > 0) {
            mpItems.push({
                title: "Descuento aplicado",
                quantity: 1,
                currency_id: "ARS",
                unit_price: Number(-discountValue)
            });
        }


        const preference = new Preference(client);

        const mpRes = await preference.create({
            body: {
                items: mpItems,
                back_urls: {
                    success: process.env.BACK_URL_SUCCESS,
                    failure: process.env.BACK_URL_FAILURE,
                    pending: process.env.BACK_URL_PENDING,
                },
                auto_return: "approved",
                external_reference: idOrder.toString(),
                notification_url: process.env.WEBHOOK_URL /* "https://fawnlike-unrefractively-ferdinand.ngrok-free.dev/webhook" */
            }
        });


        //Guardo las dos posibles llegadas del init_point
        const initPoint = mpRes.sandbox_init_point || mpRes.init_point;

        // 6. Respuesta al front: orden + init_point
        res.json({
            success: true,
            message: "Orden creada correctamente",
            idOrder,
            init_point: initPoint, 
        });

    } catch (error) {
        console.error("Error en createOrder:", error);
        res.status(500).json({ success: false, message: "Error al crear la orden" });
    }
}



// Cancela las ordenes

export const cancelOrder = async (req, res) =>{
    try{
        const {idOrder} = req.params;
        await updateOrderStatus(idOrder, "cancelled");
        res.json({message:"Orden cancelada con exito"});
    }catch(error){
        res.status(500).json({message:"Error al querer cancelar la orden", error});
    }
}

// Obtener las ordenes de los clientes

export const importOrdersUsers = async (req, res) =>{
    try{
        const { idUser } = req.params;
        await getOrdersUsers(idUser);
        res.status(200).json({ message: "Ordenes del cliente obtenidas correctamente", orders});
    }catch(error){
        res.status(500).json({ message: "Error al intentar obtener las ordenes de los usuarios"});
    }
}