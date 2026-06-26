const buildItinerary = (places = [], days = 1) => {
  const sorted = [...places].sort((a, b) => b.rating - a.rating);
  const daysCount = Math.max(1, days);
  const itinerary = [];
  const chunkSize = Math.ceil(sorted.length / daysCount);

  for (let day = 0; day < daysCount; day += 1) {
    const slice = sorted.slice(day * chunkSize, day * chunkSize + chunkSize);
    const morning = slice.filter((_, index) => index % 3 === 0);
    const afternoon = slice.filter((_, index) => index % 3 === 1);
    const evening = slice.filter((_, index) => index % 3 === 2);

    itinerary.push({
      day: `Day ${day + 1}`,
      morning,
      afternoon,
      evening,
    });
  }

  return itinerary;
};

const calculateBudget = (places, restaurants, days) => {
  const entryFeeTotal = places.reduce((sum, place) => sum + (place.entryFee || 0), 0);
  const foodEstimate = restaurants.slice(0, 3).reduce((sum, rest) => sum + (rest.costForTwo || 400), 0) * days;
  const transportEstimate = days * 600;
  return {
    transport: transportEstimate,
    food: foodEstimate,
    entryFees: entryFeeTotal,
    total: transportEstimate + foodEstimate + entryFeeTotal,
  };
};

const estimateDistance = (itinerary) => {
  const count = itinerary.reduce((total, day) => total + day.morning.length + day.afternoon.length + day.evening.length, 0);
  const distance = Math.max(8, count * 3);
  return `${distance} km approx`;
};

module.exports = { buildItinerary, calculateBudget, estimateDistance };
