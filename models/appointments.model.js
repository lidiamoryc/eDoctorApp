const mongoose = require('mongoose')

const AppointmentSchema = mongoose.Schema(
    {
        date: {
            type: String,
            required: true,
        },

        name_and_surname: {
            type: String,
            required: true,
        },

        type: {
            type: String,
            required: true,
        },

        age: {
            type: Number,
            required: true,
        },

        gender: {
            type: String,
            required: false,
        },

        startTime: {
            type: String,
            required: true,
            default: 0
        },

        endTime: {
            type: String,
            required: true,
            default: 0
        },

        additional_info: {
            type: String,
            required: false,
        }

    }
);

const Appointment = mongoose.model("Appointment", AppointmentSchema);

module.exports = Appointment;