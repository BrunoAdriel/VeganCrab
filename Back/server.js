import express from "express";
import cors from "cors";
import productRoutes from "./routes/productsRoute.js";
import userRoutes from "./routes/productsRoute.js";
import orderRoutes from "./routes/ordersRoute.js";
import contactRouter from "./routes/contact.js";

const app = express();
app.use(express.json());
app.use(cors());

//Rutas
app.use("/products", productRoutes);
app.use("/user", userRoutes);
app.use("/orders", orderRoutes);
app.use("/api/contact", contactRouter);

// Prueba de coneccion
app.get("/", (req, res) =>{
    res.send("Coneccion establecida");
});

app.listen(3000, () => {
    console.log("Servidor corriendo en puerto 3000");
});