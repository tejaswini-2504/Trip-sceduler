import { createContext, useEffect, useState } from 'react';
import { loginUser, registerUser, logoutUser } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('tripwise_user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      localStorage.setItem('tripwise_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('tripwise_user');
    }
  }, [user]);

  const handleLogin = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const response = await loginUser(credentials);
      const { token, user: authenticatedUser } = response.data;
      localStorage.setItem('tripwise_token', token);
      setUser(authenticatedUser);
      setError(null);
      return authenticatedUser;
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (payload) => {
    setLoading(true);
    setError(null);
    try {
      const response = await registerUser(payload);
      const { token, user: registeredUser } = response.data;
      localStorage.setItem('tripwise_token', token);
      setUser(registeredUser);
      setError(null);
      return registeredUser;
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logoutUser();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, handleLogin, handleRegister, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
