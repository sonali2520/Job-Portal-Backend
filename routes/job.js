import express from "express";
import isAuthenticated from "../middlewares/auth.js";
import { getAdminJobs, getAllJobs, getJobById, postJob } from "../controllers/job.js";

const router=express.Router();

router.route("/post").post(isAuthenticated,postJob);
router.route("/getall").get(isAuthenticated,getAllJobs);
router.route("/get/:id").get(isAuthenticated,getJobById);
router.route("/getallforadmin").get(isAuthenticated,getAdminJobs);

export default router;