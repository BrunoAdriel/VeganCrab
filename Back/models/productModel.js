// Gestiona las consultas SQL

import pool from "../database/connection.js";

// Obtengo los productos
export const getProducts = async()=> {
    const [rows] = await pool.query(`SELECT p.idProduct, p.prodName, p.prodDescription,
                                            v.idProdVariant, v.size, v.unit_price, v.quantityStock,
                                            i.img_url, i.main_img,
                                            c.categoryName
                                    FROM products p
                                    INNER JOIN products_variant v ON p.idProduct = v.idProduct
                                    INNER JOIN product_img i ON p.idProduct = i.idProduct
                                    INNER JOIN categorys c ON p.idCategory = c.idCategory`);
    return rows;
};

// Obtengo las categorias
export const getCategory = async() =>{
    const [rows] = await pool.query("SELECT * FROM categorys");
    return rows;
};
