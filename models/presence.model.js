const mongoose = require('mongoose');

const presenceSchema = mongoose.Schema({
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

const Presence = mongoose.model("Presence", presenceSchema);

module.exports = Presence;
