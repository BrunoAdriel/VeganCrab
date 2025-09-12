// Gestiona las consultas SQL

import pool from "../database/connection.js";

// Obtengo los productos
export const getProducts = async()=> {
    const [rows] = await pool.query(`SELECT p.idProduct, p.prodName, p.prodDescription,
                                            v.idProdVariant, v.size, v.unit_price, v.quantityStock,
                                            GROUP_CONCAT(i.img_url) AS images,
                                            c.categoryName
                                    FROM products p
                                    INNER JOIN products_variant v ON p.idProduct = v.idProduct
                                    INNER JOIN product_img i ON p.idProduct = i.idProduct
                                    INNER JOIN categorys c ON p.idCategory = c.idCategory
                                    GROUP BY p.idProduct, v.idProdVariant, c.categoryName;`);
    return rows;
};

// Obtengo las categorias
export const getCategory = async() =>{
    const [rows] = await pool.query("SELECT * FROM categorys");
    return rows;
};


// Obtengo productos para carrucel
export const getCarrucel = async()=>{
    const [rows] = await pool.query(`
        SELECT idProduct, prodName, prodDescription
        FROM products
        WHERE idProduct IN (1,2,4)
        ORDER BY idProduct;
        `);
    return rows;
}; 