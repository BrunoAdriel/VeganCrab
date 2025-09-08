import express from "express";
import dotenv from "dotenv";
import pool from "./database/connection.js"; //esto  tambien
import productRoutes from "./routes/productsRoute.js";
import userRoutes from "./routes/productsRoute.js";
import orderRoutes from "./routes/ordersRoute.js";

dotenv.config();  //checkear esto
const app = express();
app.use(express.json());

//Rutas
app.use("/products", productRoutes);
app.use("/user", userRoutes);
app.use("/orders", orderRoutes);

// Prueba de coneccion
app.get("/", (req, res) =>{
    res.send("Coneccion establecida");
})

app.listen(3000, () => {
    console.log("Servidor corriendo en puerto 3000");
})