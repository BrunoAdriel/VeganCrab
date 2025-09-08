//Defino los endpoints

import express from "express";
import {importCategory, importProducts} from "../controllers/productController.js";


const router = express.Router();

router.get("/", importProducts);
router.get("/categorys", importCategory);

export default router;