import mongoose, {Schema} from 'mongoose'

const jobSchema = new Schema(
    {
        title: {
        type: String,
        required: true
        },

        description: {
        type: String,
        required: true
        },

        minCgpa: {
        type: Number,
        required: true
        },

        allowedBranches: {
        type: [String],
        required: true
        }
    },
    { timestamps: true }
)

export const Job = mongoose.model('Job', jobSchema)
