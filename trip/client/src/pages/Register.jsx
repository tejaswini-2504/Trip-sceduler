import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
  const navigate = useNavigate();
  const { handleRegister, loading, error } = useContext(AuthContext);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await handleRegister(formData);
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="mx-auto max-w-lg rounded-3xl border border-slate-800 bg-slate-900/90 p-8 shadow-2xl shadow-slate-950/20">
      <h2 className="text-3xl font-semibold text-white">Register</h2>
      <p className="mt-3 text-slate-400">Create an account to save itineraries and manage trips.</p>
      <form onSubmit={onSubmit} className="mt-8 space-y-6">
        <label className="block text-sm text-slate-300">
          Name
          <input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required type="text" placeholder="Full name" className="mt-2 w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-cyan-400" />
        </label>
        <label className="block text-sm text-slate-300">
          Email
          <input value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required type="email" placeholder="you@example.com" className="mt-2 w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-cyan-400" />
        </label>
        <label className="block text-sm text-slate-300">
          Password
          <input value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required type="password" placeholder="••••••••" className="mt-2 w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-cyan-400" />
        </label>
        {error && <p className="text-sm text-rose-400">{error}</p>}
        <button disabled={loading} type="submit" className="w-full rounded-3xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60">
          {loading ? 'Registering...' : 'Create account'}
        </button>
      </form>
      <p className="mt-6 text-sm text-slate-500">Already have an account? <span className="text-cyan-300 hover:text-cyan-200 cursor-pointer" onClick={() => navigate('/login')}>Login</span></p>
    </div>
  );
};

export default Register;
