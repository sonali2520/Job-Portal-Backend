import express from "express";
import isAuthenticated from "../middlewares/auth.js";
import {
    applyJob,
    getApplicants,
    getAppliedJobs,
    updateStatus
} from "../controllers/application.js";

const router = express.Router();

router.route("/apply/:id").get(isAuthenticated, applyJob);
router.route("/appliedjobs").get(isAuthenticated, getAppliedJobs);
router.route("/get/:id").get(isAuthenticated, getApplicants);
router.route("/update/:id").put(isAuthenticated, updateStatus);

export default router;