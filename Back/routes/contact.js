/* Envio de los mensajes de contacto hacia el mail */
import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

const router = express.Router();

router.post("/send-mail", async (req,res)=>{
    const { email, mesaje } = req.body;

    /* Gestiono la falta de campos */
    if(!email || !mesaje){
        return res.status(400).json({message:"Error Faltan campos para completar el envio"})
    }

    /* Quien envia la informacion */
    try{
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth:{
                user: process.env.EMAIL_USER,
                pass:  process.env.EMAIL_PASS,
            },
        });

        /* Quien la recive */
        await transporter.sendMail({
            from: email,
            to: "A.Bruno@outlook.com.ar",
            subject: "Nuevo mensaje desde Contactos",
            text: `Mensaje de: ${email} \n\n ${mesaje}`,
        });
        res.status(200).json({message:"Enviado con exito", success:true});
    } catch(error){
        console.error("Error al intentar enviar el mail:", error);
        res.status(500).json({message:"Error al intentar enviar el correo"});
    }
})

export default router;