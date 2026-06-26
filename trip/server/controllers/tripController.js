const fs = require('fs');
const path = require('path');
const Trip = require('../models/Trip');
const { buildItinerary, calculateBudget, estimateDistance } = require('../utils/itinerary');

const loadDestinationFile = (destination) => {
  const fileName = destination.toLowerCase().replace(/\s+/g, '') + '.json';
  const filePath = path.join(__dirname, '../data', fileName);
  if (!fs.existsSync(filePath)) return null;
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
};

const generateTrip = async (req, res, next) => {
  try {
    const { destination, days, travelType } = req.body;
    if (!destination || !days) {
      return res.status(400).json({ message: 'Destination and days are required.' });
    }

    const destinationData = loadDestinationFile(destination);
    if (!destinationData) {
      return res.status(404).json({ message: 'Destination data not found.' });
    }

    const itinerary = buildItinerary(destinationData.places, Number(days));
    const budget = calculateBudget(destinationData.places, destinationData.restaurants, Number(days));
    const totalDistance = estimateDistance(itinerary);

    const tripPayload = {
      destination: destinationData.destination,
      days: Number(days),
      travelType: travelType || 'family',
      itinerary,
      restaurants: destinationData.restaurants,
      budget,
      totalDistance,
      createdBy: req.user ? req.user.id : null,
    };

    if (req.user) {
      const savedTrip = await Trip.create(tripPayload);
      return res.status(201).json({ trip: savedTrip });
    }

    res.status(200).json({ trip: tripPayload });
  } catch (error) {
    next(error);
  }
};

const getDestinationTrip = async (req, res, next) => {
  try {
    const destination = req.params.destination;
    const destinationData = loadDestinationFile(destination);
    if (!destinationData) {
      return res.status(404).json({ message: 'Destination not found.' });
    }
    res.json(destinationData);
  } catch (error) {
    next(error);
  }
};

const getSavedTrips = async (req, res, next) => {
  try {
    const trips = await Trip.find({ createdBy: req.user.id }).sort({ createdAt: -1 });
    res.json(trips);
  } catch (error) {
    next(error);
  }
};

const deleteTrip = async (req, res, next) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found.' });
    }
    if (trip.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this trip.' });
    }
    await trip.remove();
    res.json({ message: 'Trip deleted successfully.' });
  } catch (error) {
    next(error);
  }
};

module.exports = { generateTrip, getDestinationTrip, getSavedTrips, deleteTrip };
