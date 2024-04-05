import mongoose, { Schema } from "mongoose";

const maintenanceSchema = new mongoose.Schema({

    date: {
        type: Date,
        required: [true, 'Date is required'],
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
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
    }
})

maintenanceSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret, maintenanceSchema) {
        delete ret._id
    }
})



export const MaintenanceModel = mongoose.model('Maintenance', maintenanceSchema)