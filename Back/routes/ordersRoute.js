// Define los endpoints

import express from "express";
import { createOrder, cancelOrder, importOrdersUsers } from "../controllers/orderController.js";

const router = express.Router();

router.post("/", createOrder);
router.put("/:idOrder/cancel", cancelOrder);
router.get("/user/:idUser", importOrdersUsers);

export default router;