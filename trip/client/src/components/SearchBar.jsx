import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const navigate = useNavigate();
  const [destination, setDestination] = useState('Mysore');
  const [days, setDays] = useState(2);
  const [travelType, setTravelType] = useState('family');

  const onSubmit = (event) => {
    event.preventDefault();
    navigate(`/search?destination=${encodeURIComponent(destination)}&days=${days}&type=${travelType}`);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2 text-sm text-slate-300">
          Destination
          <select value={destination} onChange={(e) => setDestination(e.target.value)} className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-cyan-400">
            <option>Mysore</option>
            <option>Coorg</option>
            <option>Ooty</option>
            <option>Bangalore</option>
            <option>Chikmagalur</option>
          </select>
        </label>
        <label className="space-y-2 text-sm text-slate-300">
          Days
          <input type="number" min="1" max="7" value={days} onChange={(e) => setDays(e.target.value)} className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-cyan-400" />
        </label>
      </div>
      <label className="space-y-2 text-sm text-slate-300">
        Travel Type
        <select value={travelType} onChange={(e) => setTravelType(e.target.value)} className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-cyan-400">
          <option value="solo">Solo</option>
          <option value="family">Family</option>
          <option value="friends">Friends</option>
          <option value="couple">Couple</option>
        </select>
      </label>
      <button type="submit" className="w-full rounded-2xl bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400">
        Generate Plan
      </button>
    </form>
  );
};

export default SearchBar;
