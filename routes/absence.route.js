const express = require('express');
const Absence = require('../models/absence.model');
const router = express.Router();
const {getAllAbsences, getAbsenceById, createAbsence, updateAbsence, deleteAbsence} = require('../controllers/absence.controller')

router.get('/', getAllAbsences);
router.get('/:id', getAbsenceById);

router.post('/', createAbsence);

router.put('/:id', updateAbsence);

router.delete('/:id', deleteAbsence);

module.exports = router;
