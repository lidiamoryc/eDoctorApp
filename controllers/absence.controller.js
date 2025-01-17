const Absence = require('../models/absence.model');


const getAllAbsences = async (req, res) => {
  try {
    const absences = await Absence.find();
    res.status(200).json(absences);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching absences', error });
  }
};

// Get a single absence by ID
const getAbsenceById = async (req, res) => {
  try {
    const absence = await Absence.findById(req.params.id);
    if (!absence) return res.status(404).json({ message: 'Absence not found' });
    res.status(200).json(absence);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching absence', error });
  }
};

// Create a new absence
const createAbsence = async (req, res) => {
  try {
    const newAbsence = new Absence(req.body);
    const savedAbsence = await newAbsence.save();
    res.status(201).json(savedAbsence);
  } catch (error) {
    res.status(400).json({ message: 'Error creating absence', error });
  }
};

// Update an absence by ID
const updateAbsence = async (req, res) => {
  try {
    const updatedAbsence = await Absence.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedAbsence) return res.status(404).json({ message: 'Absence not found' });
    res.status(200).json(updatedAbsence);
  } catch (error) {
    res.status(400).json({ message: 'Error updating absence', error });
  }
};

// Delete an absence by ID
const deleteAbsence = async (req, res) => {
  try {
    const deletedAbsence = await Absence.findByIdAndDelete(req.params.id);
    if (!deletedAbsence) return res.status(404).json({ message: 'Absence not found' });
    res.status(200).json({ message: 'Absence deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting absence', error });
  }
};



module.exports = {
  getAllAbsences,
  getAbsenceById,
  createAbsence,
  updateAbsence,
  deleteAbsence
};