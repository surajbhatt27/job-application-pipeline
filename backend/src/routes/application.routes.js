import {Router} from 'express'
import {
    applyToJob,
    fetchApplication,
    transitionApplication
} from '../controllers/application.controller.js'

const router = Router()

// Apply to Job
router.route('/jobs/:job_id/apply').post(applyToJob)

// Fetch Application
router.route('/applications/:application_id').get(fetchApplication)

// Transition Application State
router.route('/applications/:application_id/transition').post(transitionApplication)

export default router