const mongoose = require('mongoose');

const absenceSchema = mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  startTime: {
    type: String, 
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
});

// Create the Absence model
const Absence = mongoose.model("Absence", absenceSchema);

module.exports = Absence;
