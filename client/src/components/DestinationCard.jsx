import { motion } from 'framer-motion';

const DestinationCard = ({ destination, description, image }) => {
  return (
    <motion.article whileHover={{ y: -6 }} className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/80 shadow-xl shadow-slate-900/20 transition">
      <img src={image} alt={destination} className="h-52 w-full object-cover" />
      <div className="space-y-3 p-5">
        <h3 className="text-xl font-semibold text-white">{destination}</h3>
        <p className="text-slate-400">{description}</p>
      </div>
    </motion.article>
  );
};

export default DestinationCard;
