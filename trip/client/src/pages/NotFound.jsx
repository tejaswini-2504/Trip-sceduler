import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="mx-auto max-w-3xl rounded-3xl border border-slate-800 bg-slate-900/90 p-10 text-center shadow-2xl shadow-slate-950/20">
      <h1 className="text-5xl font-semibold text-white">404</h1>
      <p className="mt-4 text-xl text-slate-300">Page not found.</p>
      <p className="mt-2 text-slate-400">The trip planner page you are looking for does not exist.</p>
      <Link to="/" className="mt-8 inline-flex rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400">
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
