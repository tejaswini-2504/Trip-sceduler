import { useContext, useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { TripContext } from '../context/TripContext';
import { AuthContext } from '../context/AuthContext';
import { generateTrip } from '../services/tripService';
import MapComponent from '../components/MapComponent';
import BudgetCard from '../components/BudgetCard';
import DayPlanCard from '../components/DayPlanCard';
import RestaurantCard from '../components/RestaurantCard';
import LoadingSpinner from '../components/LoadingSpinner';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { currentTrip, setCurrentTrip, setTripError } = useContext(TripContext);
  const [destinationData, setDestinationData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const destination = searchParams.get('destination') || 'Mysore';
  const days = Number(searchParams.get('days') || 2);
  const type = searchParams.get('type') || 'family';

  useEffect(() => {
    const loadTrip = async () => {
      if (!user) {
        setMessage('Please login to generate a detailed itinerary and save trips.');
        return;
      }
      setLoading(true);
      setMessage('');
      try {
        const response = await generateTrip({ destination, days, travelType: type });
        const trip = response.data.trip;
        setCurrentTrip(trip);
        setDestinationData(trip);
      } catch (error) {
        setTripError(error.response?.data?.message || 'Unable to generate trip.');
        setMessage('We could not build your plan. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    loadTrip();
  }, [destination, days, type, user, setCurrentTrip, setTripError]);

  const handleViewDetails = () => {
    if (currentTrip) {
      navigate(`/trip/new`);
    }
  };

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/20">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Search result</p>
            <h1 className="mt-3 text-3xl font-semibold text-white">{destination} • {days} day plan</h1>
            <p className="mt-3 max-w-2xl text-slate-400">Your itinerary includes tourist attractions, route maps, restaurants and estimated budget.</p>
          </div>
          <button onClick={handleViewDetails} className="self-start rounded-full bg-emerald-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400 sm:self-center">
            View Trip Details
          </button>
        </div>
      </section>
      {!user ? (
        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 text-slate-300 shadow-lg shadow-slate-950/20">
          <p>{message}</p>
        </div>
      ) : loading ? (
        <LoadingSpinner />
      ) : destinationData ? (
        <div className="space-y-8">
          <div className="grid gap-6 lg:grid-cols-[1.5fr_0.9fr]">
            <div className="space-y-6">
              {destinationData.itinerary.map((dayPlan) => (
                <DayPlanCard key={dayPlan.day} dayPlan={dayPlan} />
              ))}
            </div>
            <div className="space-y-6">
              <BudgetCard budget={destinationData.budget} />
              <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-lg shadow-slate-950/20">
                <h3 className="text-xl font-semibold text-white">Recommended Restaurants</h3>
                <div className="mt-5 space-y-4">
                  {destinationData.restaurants.map((restaurant) => (
                    <RestaurantCard key={restaurant.name} restaurant={restaurant} />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-2xl font-semibold text-white">Map visualization</h3>
            <MapComponent places={destinationData.itinerary.flatMap((day) => [...day.morning, ...day.afternoon, ...day.evening])} />
          </div>
        </div>
      ) : (
        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 text-slate-300 shadow-lg shadow-slate-950/20">
          <p>{message || 'Preparing your itinerary...'}</p>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
