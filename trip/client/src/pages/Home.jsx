import { motion } from 'framer-motion';
import HeroSection from '../components/HeroSection';
import DestinationCard from '../components/DestinationCard';
import destinations from '../data/destinations';

const Home = () => {
  return (
    <div className="space-y-12">
      <HeroSection />
      <section className="mx-auto max-w-7xl space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Popular routes</p>
            <h2 className="text-3xl font-semibold text-white">Featured destinations</h2>
          </div>
          <p className="max-w-xl text-slate-400">Choose a destination to generate a smart itinerary, budget summary, and map guide instantly.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {destinations.map((item) => (
            <motion.div key={item.destination} whileHover={{ y: -5 }}>
              <DestinationCard {...item} />
            </motion.div>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-7xl rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl shadow-slate-900/20">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-emerald-300">Experience travel planning</p>
            <h2 className="mt-4 text-3xl font-semibold text-white">Turn local data into a complete trip itinerary.</h2>
            <p className="mt-4 text-slate-400">TripWise uses preloaded destination datasets to build day-wise schedules, restaurant choices, and map routes without external paid APIs.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-slate-950/80 p-6 text-slate-200 shadow-lg shadow-slate-900/20">
              <h3 className="text-xl font-semibold text-white">Budget-friendly</h3>
              <p className="mt-3 text-slate-400">See transport, food, and entry costs in one place.</p>
            </div>
            <div className="rounded-3xl bg-slate-950/80 p-6 text-slate-200 shadow-lg shadow-slate-900/20">
              <h3 className="text-xl font-semibold text-white">Routes on map</h3>
              <p className="mt-3 text-slate-400">Visualize place markers and travel paths using OpenStreetMap.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
