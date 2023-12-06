import { Router } from "express";
import auth from './AuthRoutes.js'
const router=Router();
router.use("/auth",auth)

export default router;