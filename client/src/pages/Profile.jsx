import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="max-w-3xl rounded-3xl border border-slate-800 bg-slate-900/90 p-8 shadow-2xl shadow-slate-950/20">
      <h1 className="text-3xl font-semibold text-white">Profile</h1>
      <p className="mt-3 text-slate-400">Manage your account and view personalized trip options.</p>
      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-6">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Name</p>
          <p className="mt-3 text-xl font-semibold text-white">{user?.name}</p>
        </div>
        <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-6">
          <p className="text-sm uppercase tracking-[0.3em] text-emerald-300">Email</p>
          <p className="mt-3 text-xl font-semibold text-white">{user?.email}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
