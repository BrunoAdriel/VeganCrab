// LLama a las consultas SQL y arma la logica

import {insertUser, isRegister, validateUser, newPass, newAddress, dropUser} from "../models/userModel.js";

// Crea al usuario sui el numero no esta registrado

export const createUser = async (req, res) =>{
    const {userName, userLastName, phone, address, pass, birtday} = req.body;

    try{
        const existing = isRegister(phone);
        if(existing){
            res.status(409).jsno({message:"Numero de telefono ya registrado"});
        }
        await insertUser(userName, userLastName, phone, address, pass, birtday);
        res.status(200).json({message:"Usuario registrado correctamente"});

    }catch(error){
        res.status(500).json({message:"Error al intentar crear el usuario", error});
    }
}

// Valida el ingreso del usuario

export const loginUser = async (req, res) => {
    const {phone, pass} =req.body;

    try{
        const user = await validateUser(phone, pass);
        if(!user){
            res.status(409).json({message:"Telefono o contrasseña incorrectas"});
        }
        res.status(200).json({message:"Ingreso realizado con exito", user});
    
    }catch(error){
        res.status(500).json({message:"Error al intentar validar el usuario", error});
    }
}

// Cambio la contraseña

export const changePass = async (req, res) =>{
    const {phone, pass} =req.body;

    try{
        await newPass(phone, pass);
        res.status(200).json({message:"Se cambio la contraseña con exito"})
    }catch(error){
        res.status(500).json({message:"Error al realizar el cambio de la contraseña", error});
    }
}

// Cambio de direccion

export const changeAddress = async (req, res) =>{
    const {phone, address} =req.body;
    
    try{
        await newAddress(phone, address);
        res.status(200).json({message:"Direccion cambiada correctamente"});
    }catch(error){
        res.status(500).json({message:"Error al intentar cambiar la direccion", error});
    }
}

// Eliminar usuarios

export const deleteUser = async (req, res) => {
    const {phone, pass} = req.body;
    
    try{
        await dropUser(phone, pass);
        res.status(200).json({message:"Usuario eliminado correctamente"});
    }catch(error){
        res.status(500).json({message:"Error al intentar eliminar usuario", error});
    }
}