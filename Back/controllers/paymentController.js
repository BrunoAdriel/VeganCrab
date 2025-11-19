import mercadopago from "mercadopago";
import {updateOrderStatus} from "../models/orderModel.js";

export const mercadopagoWebhook = async ( req,res ) => {
    try{
        const { type,data } = req.body;
        // Mercado Pago suele mandar type: "payment"
        if (type === "payment") {
            const paymentId = data.id;

            // Traer info del pago desde Mercado Pago
            const payment = await mercadopago.payment.findById(paymentId);

            const status = payment.body.status; // approved, pending, rejected, etc.
            const paymentReference = payment.body.external_reference; // idOrder que mandamos

            let updated = false;

            // Verifica el estado en que vuelve
            if (status === "approved") {
                updated = await updateOrderStatus(paymentReference, "paid");
            } else if (status === "rejected") {
                updated = await updateOrderStatus(paymentReference, "cancelled");
            }

            if (!updated) {
                console.warn("⚠ No se pudo actualizar la orden:", paymentReference);
            }

            console.log("Webhook procesado para orden:", paymentReference, "status:", status);
        }

        res.sendStatus(200);
    }catch(error){
        console.error("Error en webhook de Mercado Pago:", error);
        res.sendStatus(500);
    }
};