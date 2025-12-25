import mongoose, {Schema} from 'mongoose'

const applicationLogSchema = new Schema({
    applicationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Application',
        required: true,
        index: true
    },

    fromState: {
        type: String,
        required: true
    },

    toState: {
        type: String,
        required: true
    },

    reason: {
        type: String,
        required: true
    },

    // Extra log container.
    metadata: {         
        type: Object   
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
})

export const ApplicationLog = mongoose.model('ApplicationLog', applicationLogSchema)
