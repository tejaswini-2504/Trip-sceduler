import { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TripContext } from '../context/TripContext';
import BudgetCard from '../components/BudgetCard';
import DayPlanCard from '../components/DayPlanCard';
import RestaurantCard from '../components/RestaurantCard';
import MapComponent from '../components/MapComponent';

const TripDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentTrip } = useContext(TripContext);

  if (!currentTrip) {
    return (
      <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/20">
        <h2 className="text-2xl font-semibold text-white">No trip selected</h2>
        <p className="mt-3 text-slate-400">Generate a new trip plan or select a saved trip to view details.</p>
        <button onClick={() => navigate('/')} className="mt-6 rounded-full bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400">
          Go To Home
        </button>
      </div>
    );
  }

  const places = currentTrip.itinerary.flatMap((day) => [...day.morning, ...day.afternoon, ...day.evening]);

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/20">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Trip details</p>
            <h1 className="mt-3 text-3xl font-semibold text-white">{currentTrip.destination} • {currentTrip.days} day itinerary</h1>
            <p className="mt-3 max-w-2xl text-slate-400">Complete schedule, restaurant suggestions, route summary, and budget estimate.</p>
          </div>
          <div className="rounded-3xl bg-slate-950/80 px-5 py-4 text-white shadow-lg shadow-slate-950/20">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Total distance</p>
            <p className="mt-3 text-2xl font-semibold">{currentTrip.totalDistance}</p>
          </div>
        </div>
      </section>
      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <div className="space-y-6">
          {currentTrip.itinerary.map((dayPlan) => (
            <DayPlanCard key={dayPlan.day} dayPlan={dayPlan} />
          ))}
        </div>
        <div className="space-y-6">
          <BudgetCard budget={currentTrip.budget} />
          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-lg shadow-slate-950/20">
            <h3 className="text-xl font-semibold text-white">Dining recommendations</h3>
            <div className="mt-5 space-y-4">
              {currentTrip.restaurants.map((restaurant) => (
                <RestaurantCard key={restaurant.name} restaurant={restaurant} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <section>
        <h2 className="mb-5 text-2xl font-semibold text-white">Route map</h2>
        <MapComponent places={places} />
      </section>
    </div>
  );
};

export default TripDetails;
