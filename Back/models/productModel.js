// Gestiona las consultas SQL

import pool from "../database/connection.js";

// Obtengo los productos
export const getProducts = async()=> {
    const [rows] = await pool.query(`SELECT p.idProduct, p.prodName, p.prodDescription,
                                            c.categoryName,
                                            MIN(v.unit_price) AS minPrice,
                                            MAX(v.unit_price) AS maxPrice,
                                            GROUP_CONCAT(i.img_url, i.main_img SEPARATOR '|') AS images
                                    FROM products p
                                    INNER JOIN categorys c ON p.idCategory = c.idCategory
                                    LEFT JOIN products_variant v ON p.idProduct = v.idProduct
                                    LEFT JOIN product_img i ON p.idProduct = i.idProduct
                                    GROUP BY p.idProduct;`);
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