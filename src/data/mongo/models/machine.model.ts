import mongoose, { Schema } from "mongoose";

const machineSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    currentUsedTime: {
        type: Number,
        required: [true, 'Current Used Time is required'],
    },
    accumulatedUsedTime: {
        type: Number,
        required: [true, 'Accumulated Used Time is required'],
    },
    limitTime: {
        type: Number,
        required: [true, 'Limit Time is required']
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