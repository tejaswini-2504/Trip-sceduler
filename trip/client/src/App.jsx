import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import SearchResults from './pages/SearchResults';
import TripDetails from './pages/TripDetails';
import SavedTrips from './pages/SavedTrips';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import { AuthProvider } from './context/AuthContext';
import { TripProvider } from './context/TripContext';
import ProtectedRoute from './components/ProtectedRoute';
import 'leaflet/dist/leaflet.css';

function App() {
  return (
    <AuthProvider>
      <TripProvider>
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 text-slate-100">
          <Navbar />
          <main className="px-4 py-6 md:px-8 lg:px-16">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/trip/:id" element={<TripDetails />} />
              <Route path="/saved" element={<ProtectedRoute><SavedTrips /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </TripProvider>
    </AuthProvider>
  );
}

export default App;
