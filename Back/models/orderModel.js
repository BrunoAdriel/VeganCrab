// Gentiona las consultas de SQL

import pool from "../database/connection.js";

// Agrega una nueva orden
export const insertOrder = async (idUser, total, discount) =>{
    const [result] = await pool.query("INSERT INTO orders (idUser, total, discount) VALUES (?, ?, ?)", [idUser, total, discount]);
    return result.insertId;
}

// Agrega contenido a order_detail
export const insertOrderDetail =  async (idOrder, idProduct, quantity, subTotal)=> {
    await pool.query("INSERT INTO orders_detail (idOrder, idProduct, quantity, subTotal) VALUES (?, ?, ?, ?)", [idOrder, idProduct, quantity, subTotal]);
}

// Modifica el estado de la orden
export const updateOrderStatus = async (idOrder, status) =>{
    const [result] = await pool.query("UPDATE orders SET status = ? WHERE idOrder = ?", [status, idOrder]);
    return result.affectedRows > 0;
};

// Obtengo las ordenes de compra de los clientes
export const getOrdersUsers = async (idUser) => {
    await pool.query("SELECT * FROM orders WHERE idUser = ? ORDER BY orderDate DESC", [idUser]);
}

