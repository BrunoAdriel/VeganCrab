// LLama a las consultas SQL y arma la logica

import {insertOrder, insertOrderDetail, updateOrderStatus, getOrdersUsers} from "../models/orderModel.js";

// Crear las ordenes

export const createOrder = async (req, res)=> {
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