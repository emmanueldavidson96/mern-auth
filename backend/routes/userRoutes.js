import express from "express";
import { auth_user, register_user, update_user_profile, logout_user,get_user_profile } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", register_user);
router.post("/auth", auth_user);
router.post("/logout", logout_user);
router.route("/profile").get(protect,get_user_profile).put(protect,update_user_profile);

export default router