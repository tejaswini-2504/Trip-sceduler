const mongoose = require('mongoose');

const DayPlanSchema = new mongoose.Schema({
  morning: [{ type: Object }],
  afternoon: [{ type: Object }],
  evening: [{ type: Object }],
});

const TripSchema = new mongoose.Schema({
  destination: { type: String, required: true },
  days: { type: Number, required: true },
  travelType: { type: String, default: 'family' },
  itinerary: [DayPlanSchema],
  restaurants: [{ type: Object }],
  budget: { type: Object, required: true },
  totalDistance: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Trip', TripSchema);
