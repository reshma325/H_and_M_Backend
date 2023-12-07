import { Router } from "express";
import { getCurrentMember, login, register } from "../Controllers/AuthControllers.js";


const router=Router();
router.post("/login",login);
router.post("/register",register)
router.post("/getcurrentmember",getCurrentMember)

export default router;