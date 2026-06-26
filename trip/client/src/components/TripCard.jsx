const TripCard = ({ trip }) => {
  return (
    <article className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-lg shadow-slate-900/20">
      <h3 className="text-xl font-semibold text-white">{trip.destination} • {trip.days} day(s)</h3>
      <p className="mt-3 text-slate-400">Estimated budget: ₹{trip.budget.total}</p>
      <p className="mt-2 text-slate-400">Distance: {trip.totalDistance}</p>
    </article>
  );
};

export default TripCard;
