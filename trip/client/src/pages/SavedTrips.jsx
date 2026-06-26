import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TripContext } from '../context/TripContext';
import { fetchSavedTrips, deleteSavedTrip } from '../services/tripService';
import TripCard from '../components/TripCard';
import LoadingSpinner from '../components/LoadingSpinner';

const SavedTrips = () => {
  const navigate = useNavigate();
  const { savedTrips, setSavedTrips, setTripError, setCurrentTrip } = useContext(TripContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTrips = async () => {
      setLoading(true);
      try {
        const response = await fetchSavedTrips();
        setSavedTrips(response.data);
      } catch (error) {
        setTripError(error.response?.data?.message || 'Unable to load saved trips.');
      } finally {
        setLoading(false);
      }
    };
    loadTrips();
  }, [setSavedTrips, setTripError]);

  const handleDelete = async (id) => {
    try {
      await deleteSavedTrip(id);
      setSavedTrips(savedTrips.filter((trip) => trip._id !== id));
    } catch (error) {
      setTripError(error.response?.data?.message || 'Unable to delete trip.');
    }
  };

  const handleViewDetails = (trip) => {
    setCurrentTrip(trip);
    navigate(`/trip/${trip._id}`);
  };

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/20">
        <h1 className="text-3xl font-semibold text-white">Saved Trips</h1>
        <p className="mt-3 text-slate-400">Manage your saved itineraries and open a trip detail for planning.</p>
      </section>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {loading ? (
          <div className="col-span-full">
            <LoadingSpinner />
          </div>
        ) : savedTrips && savedTrips.length > 0 ? (
          savedTrips.map((trip) => (
            <div key={trip._id} className="relative">
              <TripCard trip={trip} />
              <div className="absolute right-4 top-4 flex gap-2">
                <button onClick={() => handleViewDetails(trip)} className="rounded-full bg-cyan-500 px-3 py-2 text-xs font-semibold text-slate-950 transition hover:bg-cyan-400">
                  View
                </button>
                <button onClick={() => handleDelete(trip._id)} className="rounded-full bg-rose-500 px-3 py-2 text-xs font-semibold text-white transition hover:bg-rose-400">
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full rounded-3xl border border-slate-800 bg-slate-900/80 p-10 text-slate-300 shadow-lg shadow-slate-950/20">
            <p className="text-lg">No saved trips found. Create a new itinerary from the home page.</p>
            <button onClick={() => navigate('/')} className="mt-5 rounded-full bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400">
              Start Planning
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedTrips;
