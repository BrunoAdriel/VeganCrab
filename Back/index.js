/* // Endpints que comunican a SQL

//Crear Orden

async function  createOrder(userId, items){

    //Verifica el Stock
    for(item of items){
        let product = await db.query('SELECT quantityStock, unit_price FROM products WHERE idProduct = ?', [item.idProduct]);
        if (!product || product[0].quantityStock < item.quantity){
            throw new Error(`No hay stock suficiente para el producto: ${item.idProduct}`);
        }
    }

    //Crear orden pendiente
    let total = 0;
    for (item of items){
        let product = await db.query('SELECT unit_price FROM products WHERE idProduct = ?', [item.idProduct]);
        total += product[0].unit_price * item.quantity;
    }

    let result = await db.query("INSERT INTO orders (userId, total, status) VALUES (?, ?, 'pending')", [userId, total]);
    const orderId = result.insertId;

    //Insertar detalles y descontar stock temporalmente
    for(item of items){
        let product = await db.query('SELECT unit_price FROM products WHERE idProduct = ?', [item.idProduct]);
        let subtotal = product[0].unit_price * item.quantity;

        await db.query('INSERT INTO oder_details(idOrder, idProduct, quantity, subtotal) VALUES (?, ?, ?, ?)',[orderId, item.idProduct, item.quantity, subtotal]);
        
        await db.query('UPDATE products SET quantityStock = quantityStock - ? WHERE idProduct = ?', [item.quantity, item.idProduct]);
    }

    return {message: "Orden pendiente creada exitosamente", orderId};

}

//Cancelar orden

async function cancelOrder(orderId){
    const details = await db.query('SELECT idProduct, quantity FROM order_detail WHERE idOrder = ?', [orderId]);

    //Devuelvo Stock
    for(let item of details){
        await db.query('UPDATE products SET quantityStock = quantityStock + ? WHERE idProduct = ?', [item.quantity, item.idProduct]);
    }

    //Estado de orden cancelado
    await db.query("UPDATE orders SET status = 'cancelled' WHERE idOrder = ?", [orderId]);
    return {message: "Orden cancelada exitosamente"};
}

//Confirmar ordern
async function confirmOrder(orderId){
    await db.query("UPDATE orders SET status = 'paid' WHERE idOrder = ?", [orderId]);
    return{message: "Orden pagada exitosamente"};
}

//Obtener lista de ordenes 
async function getUserOrders(userId){
    return await db.query(`
        SELECT  o.idOrder, o.orderDate, o.total, o.status,
                d.idProduct, d.qunaity, d.subtotal, p.prodName
        FROM orders o
        JOIN orders_detail d ON o.idOrder = d.idOrder
        JOIN products p ON d.idProduct = p.idProduct
        WHERE o.userId = ? 
        ORDER BY o.orderDate DESC`, [userId]);
}
 */