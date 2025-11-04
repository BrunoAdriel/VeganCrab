// LLama a las consultas SQL y armo la logica

import {getProducts, getCategory, getCarrucel, getProductId, getProductsCard, getProductFilter} from "../models/productModel.js";

// Obtengo los productos 
export const importProducts = async (req, res) =>{
    try{
        const products = await getProducts();
        res.status(200).json({message:"Productos importar correctamente", products});
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

//obtengo la informacion para el carrusel
export const importCarrousel = async (req, res)=> {
    try{
        const carrousel = await getCarrucel();
        res.status(200).json({message:"Productos de carruosel traidos correctamente", carrousel});
    }catch(error){
        res.status(500).json({message:"Error al intentar importar productos  de carrousel", error})
    }
};


// Obtengo el id que necesito y hago al consulta 
export const importProductId = async (req, res)=>{
    try{
        const {id} = req.params;
        const idProduct = await getProductId(id);
        res.status(200).json({message:"Informacion del productoId obtenida correctamente", idProduct})
    }catch(error){
        res.status(500).json({message:"Error al obtener el producto seleccionado", error})
    }
};

// Manejo la obtencion de los productos
export const importProductsCard = async (req, res)=>{
    try{
        const products = await getProductsCard();
        res.status(200).json({message:"Productos de Card obtenidos correctamente", products});
    }catch(error){
        res.status(500).json({message:"Error al obtener los productos para las cards", error})
    }
}

//Manejo el mensaje resivido y la devolucion
export const importProductSerach = async ( req, res ) => {
    try{
        const {q} = req.query;

        if( !q || q.trim() === ""){
            res.status(500).json({message:"Faltan parametros de busqueda", error})
        }

        const filter = await getProductFilter(q)
        res.status(200).json({message:"Producto encontrado", filter})
    }catch(error){}
}