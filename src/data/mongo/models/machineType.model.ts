import mongoose from "mongoose";

const machineType = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Name is required'],
        unique: true
    },
})

machineType.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret, options) {
        delete ret._id
        delete ret.password;
    }
})



export const MachineTypeModel = mongoose.model('MachineType', machineType)