import { STATE_TRANSITIONS } from '../config/constant.js'
import { ApplicationLog } from '../models/applicationLog.model.js'
import asyncHandler from '../utils/asyncHandler.js'

const transitionApplicationState =asyncHandler(async ({
    application,
    toState,
    reason,
    metadata = {}
    }) => {
    const fromState = application.state

    // transition validation.
    const allowedNextStates = STATE_TRANSITIONS[fromState] || []

    if (!allowedNextStates.includes(toState)) { 
        throw new Error(
        `Invalid transition from ${fromState} to ${toState}`
        )
    }

    // Update application state
    application.state = toState
    await application.save()

    // Append audit log
    await ApplicationLog.create({
        applicationId: application._id,
        fromState,
        toState,
        reason,
        metadata
    })

    return application
})

export {transitionApplicationState}
