import mongoose, { Schema } from "mongoose";

const sessionSchema = new mongoose.Schema({

    initDate: {
        type: Date,
        required: [true, 'Init Date is required'],
    },
    endDate: {
        type: Date,
        required: [true, 'End Date is required'],
    },
    duration: {
        type: Number,
        required: [true, 'Duration is required'],
    },
    machine: {
        type: Schema.Types.ObjectId,
        ref: 'Machine',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
})

sessionSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret, options) {
        delete ret._id
        delete ret.password;
    }
})



export const SessionModel = mongoose.model('Session', sessionSchema)