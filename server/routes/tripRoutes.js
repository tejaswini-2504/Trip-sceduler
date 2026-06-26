const express = require('express');
const { generateTrip, getDestinationTrip, getSavedTrips, deleteTrip } = require('../controllers/tripController');
const protect = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/generate', generateTrip);
router.get('/user/all', protect, getSavedTrips);
router.delete('/:id', protect, deleteTrip);
router.get('/:destination', getDestinationTrip);

module.exports = router;
