// LLama a las consultas SQL y armo la logica

import {getProducts, getCategory} from "../models/productModel.js";

// Obtengo los productos 
export const importProducts = async (req, res) =>{
    try{
        const products = await getProducts();
        res.status(200).json({message:"Productos imoprtar correctamente", products});
    }catch(error){
        res.status(500).json({message:"Error al imoprtar los productos", error});
    }
};

// Obtengo las categorias
export const importCategory = async (req, res) =>{
    try{
        const categorys = await getCategory();
        res.status(200).json({message:"Categorias obtenidas correctamente", categorys});
    }catch(error){
        res.status(500).json({message:"Error al importar las categorias"})
    }
};