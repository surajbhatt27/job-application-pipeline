import Application from '../models/Application.model.js'
import Job from '../models/job.model.js'
import { APPLICATION_STATES } from '../config/constant.js'
import { checkEligibility } from '../services/eligibility.service.js'
import { generateAtsScore } from '../services/ats.service.js'
import { transitionApplicationState } from '../services/applicationStateMachine.service.js'
import ApplicationLog from '../models/applicationLog.model.js'
import asyncHandler from '../utils/asyncHandler.js'

const applyToJob = asyncHandler(async (req, res) => {
    // get job id from url.
    // get user id, cgpa, branch and resume text from frontend.
    // fetch job and validate.
    // create application (CREATED state).And log it
    // check for eligibility.
    // store eligibility decision.
    // not eligible -> reject(change state).
    // evaluate ATS score and save it.
    // return response.

    const { job_id } = req.params
    const { user_id, cgpa, branch, resume_txt } = req.body

    const job = await Job.findById(job_id)
    if (!job) {
        return res.status(404).json({ message: 'Job not found' })
    }

    const application = await Application.create({
        jobId: job._id,
        userId: user_id
    })

    await transitionApplicationState({
        application,
        toState: APPLICATION_STATES.CREATED,
        reason: 'Application created'
    })

    const eligibility = checkEligibility({
        job,
        candidate: { cgpa, branch }
    })

    application.eligibilityDecision = {
        eligible: eligibility.eligible,
        reason: eligibility.reason,
        evaluatedAt: new Date()
    }
    await application.save()

    if (!eligibility.eligible) {
        await transitionApplicationState({
        application,
        toState: APPLICATION_STATES.REJECTED,
        reason: eligibility.reason,
        metadata: { cgpa, branch }
        })

        return res.status(400).json({
        message: 'Application rejected',
        reason: eligibility.reason
        })
    }

    await transitionApplicationState({
        application,
        toState: APPLICATION_STATES.ELIGIBLE,
        reason: 'Eligibility criteria met'
    })

    const atsResult = generateAtsScore({
        resumeText: resume_txt,
        jobDescription: job.description
    })

    application.atsScore = atsResult
    await application.save()

    return res.status(201).json({
        message: 'Application submitted successfully',
        applicationId: application._id,
        state: application.state,
        atsScore: atsResult
    })
})

const fetchApplication = asyncHandler(async (req, res) => {
    // get applicaion id.
    // fetch application and validate.
    // fetch audit log.
    // return response.
    const { application_id } = req.params

    const application = await Application.findById(application_id)

    if (!application) {
        return res.status(404).json({ message: 'Application not found' })
    }

    const logs = await ApplicationLog.find({
        applicationId: application._id
    }).sort({ createdAt: 1 })

    return res.status(200).json({
        applicationId: application._id,
        state: application.state,
        eligibilityDecision: application.eligibilityDecision,
        atsScore: application.atsScore,
        auditLog: logs
    })
})

const transitionApplication = asyncHandler(async (req, res) => {
    // get application from url.
    // get state and reason from frontend.
    // fetch applicaion.
    // do transition.

    const { application_id } = req.params
    const { to_state, reason } = req.body

    const application = await Application.findById(application_id)
    if (!application) {
        return res.status(404).json({ message: 'Application not found' })
    }

    try {
        await transitionApplicationState({
        application,
        toState: to_state,
        reason: reason || 'Manual state transition'
        })

        return res.status(200).json({
        message: 'State transitioned successfully',
        applicationId: application._id,
        newState: application.state
        })
    } catch (err) {
        return res.status(400).json({
        message: err.message
        })
    }
})

export {
    applyToJob,
    fetchApplication,
    transitionApplication
}