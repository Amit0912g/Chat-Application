import express from "express";
import { authentication } from "../middlewares/auth.middleware.js";
import { getMessages, sendMessage } from "../controllers/messageController.js";

const router = express.Router();

router.post("/sendMessage/:receiverID",authentication,sendMessage)
router.get("/getMessage/:receiverID",authentication,getMessages)


export default router;