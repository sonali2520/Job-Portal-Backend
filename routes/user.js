import express from "express";
import {
    login,
    logout,
    register,
    updateProfile
} from "../controllers/user.js";
import isAuthenticated from "../middlewares/auth.js";
import {
    singleUpload
} from "../middlewares/multer.js";

const router = express.Router();

router.route("/register").post(singleUpload, register);
router.route("/login").post(login);
router.route("/profile/update").post(isAuthenticated, singleUpload, updateProfile);
router.route("/logout").get(logout);

export default router;