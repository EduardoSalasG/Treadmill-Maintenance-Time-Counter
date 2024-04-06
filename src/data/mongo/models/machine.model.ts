import mongoose, { Schema } from "mongoose";

const machineSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Name is required'],
        unique: true
    },
    currentUsedTime: {
        type: Number,
        required: [true, 'Current Used Time is required'],
        default: 0
    },
    accumulatedUsedTime: {
        type: Number,
        required: [true, 'Accumulated Used Time is required'],
        default: 0
    },
    limitTime: {
        type: Number,
        required: [true, 'Limit Time is required']
    },
    status: {
        type: String,
        default: 'OPERATIVE',
        enum: ['OPERATIVE', 'NEEDS MAINTENANCE']
    },
    machineType: {
        type: Schema.Types.ObjectId,
        ref: 'MachineType',
        required: true
    }
})

machineSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret, options) {
        delete ret._id
    }
})



export const MachineModel = mongoose.model('Machine', machineSchema)