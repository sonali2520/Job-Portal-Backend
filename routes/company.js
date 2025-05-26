import express from "express";
import isAuthenticated from "../middlewares/auth.js";
import {
    singleUpload
} from "../middlewares/multer.js";
import {
    getCompany,
    getCompanyById,
    registerCompany,
    updatecompany
} from "../controllers/company.js";

const router = express.Router();

router.route("/register").post(isAuthenticated, registerCompany);
router.route("/getall").get(isAuthenticated, getCompany);
router.route("/get/:id").get(isAuthenticated, getCompanyById);
router.route("/update/:id").put(isAuthenticated, singleUpload, updatecompany);

export default router;