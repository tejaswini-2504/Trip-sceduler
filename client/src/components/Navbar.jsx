import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, handleLogout } = useContext(AuthContext);
  const navigate = useNavigate();

  const onLogout = () => {
    handleLogout();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="text-2xl font-semibold text-cyan-300">
          TripWise
        </Link>
        <div className="hidden items-center space-x-6 md:flex">
          <NavLink to="/" className={({ isActive }) => isActive ? 'text-white' : 'text-slate-400 hover:text-white'}>
            Home
          </NavLink>
          <NavLink to="/saved" className={({ isActive }) => isActive ? 'text-white' : 'text-slate-400 hover:text-white'}>
            Saved Trips
          </NavLink>
          <NavLink to="/profile" className={({ isActive }) => isActive ? 'text-white' : 'text-slate-400 hover:text-white'}>
            Profile
          </NavLink>
        </div>
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="hidden text-sm text-slate-300 md:inline">Hi, {user.name}</span>
              <button onClick={onLogout} className="rounded-full bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400">
                Logout
              </button>
            </>
          ) : (
            <div className="flex gap-3">
              <Link to="/login" className="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-100 transition hover:border-cyan-400 hover:text-white">
                Login
              </Link>
              <Link to="/register" className="rounded-full bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
