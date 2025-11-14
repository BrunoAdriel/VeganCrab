// LLama a las consultas SQL y arma la logica

import {insertOrder, insertOrderDetail, updateOrderStatus, getOrdersUsers} from "../models/orderModel.js";

// Llama a las consultas del usuario
import {insertUser, getUserByPhone} from "../models/userModel.js";



// Crear las ordenes

export const createOrder = async (req, res)=> {
    try {
        const {
            user,      // datos del form
            cart,      // carrito
            deliveryType,
            discountValue,
            total,
            extraInfo
        } = req.body;

        const {
            name,
            lastName,
            phone,
            email,
            address,
/*             city, */
            zip
        } = user;

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
/*                 city, */
                zip
            );
        }

        // 3. Crear orden
        const idOrder = await insertOrder(
            idUser,
            total,
            discountValue,
            deliveryType,
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

        // 5. Respuesta
        res.json({
            success: true,
            message: "Orden creada correctamente",
            idOrder
        });

    } catch (error) {
        console.error("Error en createOrder:", error);
        res.status(500).json({ success: false, message: "Error al crear la orden" });
    }


    /*     
    Estructura anterior
    try{
        const {idUser, items, discount} = req.body;

        // Calcular el total
        const total = items.reduce((acc, item) => acc + item.subTotal, 0 ) - (discount || 0);

        // Crear las ordenes
        const idOrder = await insertOrder(idUser, total, discount || 0);

        // Insertar detalles al order detail
        for(const item of items){
            await insertOrderDetail(idOrder, item.idProduct, item.quantity, item.subTotal);
        }

        res.status(200).json({message: "Orden creada correctamente", idOrder});

    }catch(error){
        res.status(500).json({message: "Error al crear orden", error});
    } */
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