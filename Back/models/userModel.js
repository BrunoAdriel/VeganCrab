// Manejo las consultas de SQL

import pool from "../database/connection.js";

// Cargo los usuarios a SQL

export const insertUser = async (userName, userLastName, phone, address, pass, birtday)=>{
    await pool.query("INSERT INTO users (userName, userLastName, phone, address, pass, birtday) VALUES (?,?,?,?,?,?)", [userName, userLastName, phone, address, pass, birtday]);
};

// Obtener usuario

export const validateUser = async(phone, pass)=>{
    const [rows] = await pool.query("SELECT * from users WHERE phone = ? AND pass = ?", [phone, pass]);
    return rows.length > 0 ? rows[0] : null;
}

// Cambio de contraseña

export const newPass = async(phone, pass)=>{
    await pool.query("UPDATE users VALUES pass = ? WHERE phone = ?",[pass, phone]);
};

// Cambiar direccion

export const newAddress = async(phone, address)=>{
    await pool.query("UPDATE users VALUES address = ? WHERE phone = ?", [address, phone]);
}

// Eliminar usuario

export const deleteUser = async(idUser)=>{
    await pool.query("DELETE FROM users WHERE idUser = ?", [idUser])
}
