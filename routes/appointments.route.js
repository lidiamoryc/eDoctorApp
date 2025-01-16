const express = require('express');
const Appointment = require('../models/appointments.model');
const router = express.Router();
const {getAppointments, getAppointment, postAppointment, putAppointment, deleteAppointment,} = require('../controllers/appointments.controller')

router.get('/', getAppointments);
router.get('/:id', getAppointment);

router.post('/', postAppointment);

router.put('/:id', putAppointment);

router.delete('/:id', deleteAppointment);

module.exports = router;

