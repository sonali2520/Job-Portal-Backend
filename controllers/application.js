import {
    Application
} from "../models/application.model.js";
import {
    Job
} from "../models/job.model.js";

export const applyJob = async (req, res) => {
    try {
        const userId = req.id;
        const jobId = req.params.id;

        if (!jobId) {
            return res.status(400).json({
                message: "Job Id required",
                success: false
            })
        }

        const existingApplication = await Application.findOne({
            job: jobId,
            applicant: userId
        });

        if (existingApplication) {
            return res.status(400).json({
                message: "You have already applied",
                success: false
            })
        }
        const job = await Job.findById(jobId);
        const newApplication = await Application.create({
            job: jobId,
            applicant: userId
        })

        job.applications.push(newApplication._id);
        await job.save();

        return res.status(200).json({
            message: "Applied successfully!",
            success: true,
        })
    } catch (error) {
        console.log(error);
    }
}

export const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.id;

        const appliedJobs = await Application.find({
            applicant: userId
        }).sort({
            createdAt: -1
        }).populate({
            path: 'job',
            options: {
                sort: {
                    createdAt: -1
                }
            },
            populate: {
                path: 'company',
                options: {
                    sort: {
                        createdAt: -1
                    }
                },
            }
        });

        if (!appliedJobs) {
            return res.status(400).json({
                message: "You have not applied to any job",
                success: false
            })
        }

        return res.status(200).json({
            appliedJobs,
            success: true
        })
    } catch (error) {
        console.log(error);

    }
}
//aplicants for particular job
export const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;

        const job = await Job.findById(jobId).populate({
            path: 'applications',
            options: {
                sort: {
                    createdAt: -1
                }
            },
            populate: {
                path: 'applicant'
            }
        });

        if (!job) {
            return res.status(400).json({
                message: "No applicants for this job",
                success: false
            })
        }

        return res.status(200).json({
            job,
            success: true
        })
    } catch (error) {
        console.log(error);

    }
}

export const updateStatus = async (req, res) => {
    try {
        const {
            status
        } = req.body;
        const applicationId = req.params.id;

        if (!status) {
            return res.status(400).json({
                message: "status is required",
                success: false
            })
        }

        const application = await Application.findOne({
            _id: applicationId
        });

        if (!application) {
            return res.status(404).json({
                message: "Application not found",
                success: false
            })
        }

        application.status = status;
        application.save();

        return res.status(200).json({
            message: "Status updated successfully",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}