import PlaceCard from './PlaceCard';

const DayPlanCard = ({ dayPlan }) => {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-lg shadow-slate-900/20">
      <h3 className="text-xl font-semibold text-white">{dayPlan.day}</h3>
      <div className="mt-5 space-y-6">
        <section>
          <h4 className="text-lg font-semibold text-cyan-300">Morning</h4>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {dayPlan.morning.map((place) => <PlaceCard key={place.id} place={place} />)}
          </div>
        </section>
        <section>
          <h4 className="text-lg font-semibold text-amber-300">Afternoon</h4>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {dayPlan.afternoon.map((place) => <PlaceCard key={place.id} place={place} />)}
          </div>
        </section>
        <section>
          <h4 className="text-lg font-semibold text-violet-300">Evening</h4>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {dayPlan.evening.map((place) => <PlaceCard key={place.id} place={place} />)}
          </div>
        </section>
      </div>
    </div>
  );
};

export default DayPlanCard;
