//Defino los endpoints

import express from "express";
import {importCategory, importProducts, importCarrousel, importProductId, importProductsCard} from "../controllers/productController.js";


const router = express.Router();

router.get("/", importProducts);
router.get("/categorys", importCategory);
router.get("/carrousel", importCarrousel);
router.get("/cards", importProductsCard);
router.get("/:id", importProductId);

export default router;