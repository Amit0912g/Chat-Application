import express from "express";
import { getOtherProfile, getProfile, Login, logout, register } from "../controllers/userController.js";
import { authentication } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/login",Login)
router.post("/register",register)
router.get("/get-profile",authentication,getProfile)
router.get("/get-otherProfile",authentication,getOtherProfile)
router.post("/logout",authentication,logout)

export default router;