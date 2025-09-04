//Defino los endpoints

import express from "express";
import {importCategory, importProducts} from "../controllers/productController.js";


const router = express.Router();

app.get("/", importProducts);
app.get("/categorys", importCategory);

export default router;