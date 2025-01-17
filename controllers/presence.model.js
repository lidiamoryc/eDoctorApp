const Presence = require('../models/presence.model');


const getAllAbsences = async (req, res) => {
  try {
    const absences = await Presence.find();
    res.status(200).json(absences);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching presences', error });
  }
};

// Get a single absence by ID
const getAbsenceById = async (req, res) => {
  try {
    const absence = await Presence.findById(req.params.id);
    if (!absence) return res.status(404).json({ message: 'Presence not found' });
    res.status(200).json(absence);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching presences', error });
  }
};

// Create a new absence
const createAbsence = async (req, res) => {
  try {
    const newAbsence = new Presence(req.body);
    const savedAbsence = await newAbsence.save();
    res.status(201).json(savedAbsence);
  } catch (error) {
    res.status(400).json({ message: 'Error creating presences', error });
  }
};

// Update an absence by ID
const updateAbsence = async (req, res) => {
  try {
    const updatedAbsence = await Presence.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedAbsence) return res.status(404).json({ message: 'Presence not found' });
    res.status(200).json(updatedAbsence);
  } catch (error) {
    res.status(400).json({ message: 'Error updating presences', error });
  }
};

// Delete an absence by ID
const deleteAbsence = async (req, res) => {
  try {
    const deletedAbsence = await Presence.findByIdAndDelete(req.params.id);
    if (!deletedAbsence) return res.status(404).json({ message: 'Presence not found' });
    res.status(200).json({ message: 'Presence deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting presence', error });
  }
};



module.exports = {
    getAllAbsences,
    getAbsenceById,
    createAbsence,
    updateAbsence,
    deleteAbsence
};