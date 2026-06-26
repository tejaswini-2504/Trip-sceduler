import { createContext, useState } from 'react';

export const TripContext = createContext();

export const TripProvider = ({ children }) => {
  const [currentTrip, setCurrentTrip] = useState(null);
  const [savedTrips, setSavedTrips] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tripError, setTripError] = useState(null);

  return (
    <TripContext.Provider value={{ currentTrip, setCurrentTrip, savedTrips, setSavedTrips, loading, setLoading, tripError, setTripError }}>
      {children}
    </TripContext.Provider>
  );
};
