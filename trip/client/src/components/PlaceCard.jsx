const PlaceCard = ({ place }) => {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg shadow-slate-900/20">
      <h4 className="text-lg font-semibold text-white">{place.name}</h4>
      <p className="mt-2 text-slate-400">{place.description}</p>
      <div className="mt-4 grid gap-2 text-sm text-slate-500 sm:grid-cols-2">
        <span>Best Time: {place.bestTime}</span>
        <span>Duration: {place.timeRequired}</span>
      </div>
    </div>
  );
};

export default PlaceCard;
