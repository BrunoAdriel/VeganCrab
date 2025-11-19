import express from "express";
import {mercadopagoWebhook} from "../controllers/paymentController.js";

const router = express.Router();

router.post("/mercadopago", mercadopagoWebhook);

export default router;