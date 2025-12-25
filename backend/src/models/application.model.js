import mongoose ,{Schema} from 'mongoose'
import { APPLICATION_STATES } from '../config/constant.js'

const applicationSchema = new Schema({
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: true,
        index: true                  
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',      // User schema not required for the assignment.
        required: true,
        index: true
    },

    state: {
        type: String,
        enum: Object.values(APPLICATION_STATES),
        default: APPLICATION_STATES.CREATED
    },

    eligibilityDecision: {
        eligible: Boolean,
        reason: String,
        evaluatedAt: Date
    },

    atsScore: {
        score: Number,
        matchedKeywords: [String], //array of string.
        missingKeywords: [String]
    }

}, { timestamps: true })

export const Application = mongoose.model('Application', applicationSchema)
