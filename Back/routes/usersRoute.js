// Defino los endpoints

import express from "express";
import {createUser, loginUser, changePass, changeAddress ,deleteUser} from "../controllers/userController.js";


const router = express.Router();

router.post("/login", loginUser);
router.post("/register", createUser);
router.put("/password", changePass);
router.put("/address", changeAddress);
router.delete("/deleteUser", deleteUser);

export default router;