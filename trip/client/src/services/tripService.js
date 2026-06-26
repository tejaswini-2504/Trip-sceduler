import api from './api';

export const generateTrip = (payload) => api.post('/trips/generate', payload);
export const fetchDestination = (destination) => api.get(`/trips/${destination}`);
export const fetchSavedTrips = () => api.get('/trips/user/all');
export const deleteSavedTrip = (id) => api.delete(`/trips/${id}`);
