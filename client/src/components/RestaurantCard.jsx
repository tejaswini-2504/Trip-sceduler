const RestaurantCard = ({ restaurant }) => {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg shadow-slate-900/20">
      <h4 className="text-lg font-semibold text-white">{restaurant.name}</h4>
      <p className="mt-2 text-slate-400">Specialty: {restaurant.famousFor}</p>
      <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
        <span>Cost for two: ₹{restaurant.costForTwo}</span>
        <span>Rating: {restaurant.rating}</span>
      </div>
    </div>
  );
};

export default RestaurantCard;
