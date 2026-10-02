const mongoose = require('mongoose');

const plotSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  plotName: { type: String, required: true },
  corners: [{ lat: Number, lng: Number }],
  areaSqMeters: Number,
  perimeterMeters: Number,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Plot', plotSchema);
