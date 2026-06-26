import { motion } from 'framer-motion';
import SearchBar from './SearchBar';

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-hero-gradient px-6 py-16 shadow-2xl sm:px-10 sm:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="mb-4 inline-flex rounded-full bg-cyan-500/20 px-4 py-2 text-sm font-semibold text-cyan-200">
              Explore South India
            </p>
            <h1 className="text-4xl font-semibold text-white sm:text-5xl">
              Smart tourism planning for your next adventure.
            </h1>
            <p className="mt-6 max-w-2xl text-slate-300 sm:text-lg">
              Discover curated day-wise itineraries, budget estimates, restaurant picks, and live route maps for popular destinations.
            </p>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-slate-900/80 p-6 shadow-xl shadow-cyan-500/10">
                <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">Best for</p>
                <h3 className="mt-3 text-xl font-semibold text-white">Weekend getaways</h3>
                <p className="mt-2 text-slate-400">Mysore, Ooty, Coorg and more with smart plans.</p>
              </div>
              <div className="rounded-3xl bg-slate-900/80 p-6 shadow-xl shadow-purple-500/10">
                <p className="text-sm uppercase tracking-[0.2em] text-violet-300">Fast trip planning</p>
                <h3 className="mt-3 text-xl font-semibold text-white">AI style itinerary generator</h3>
                <p className="mt-2 text-slate-400">Local datasets, route estimates, and restaurant suggestions.</p>
              </div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <div className="rounded-[2rem] bg-slate-900/85 p-8 shadow-2xl shadow-cyan-500/10 sm:p-10">
              <h2 className="text-xl font-semibold text-white">Start your trip plan</h2>
              <p className="mt-2 text-slate-400">Search a destination and get a full itinerary with maps and budget.</p>
              <div className="mt-8">
                <SearchBar />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
