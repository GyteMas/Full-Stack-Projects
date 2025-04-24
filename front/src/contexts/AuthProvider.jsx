import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { AuthContext } from './AuthContext';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  axios.defaults.withCredentials = true;

  const checkAuth = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/users/me`);
      setUser(res.data.data);
      setError(null);
    } catch (err) {
      setUser(null);
      if (window.location.pathname === '/dashboard' || window.location.pathname === '/admin') {
        setError(err.response?.data?.message || 'Failed to authenticate');
      } else {
        setError(null);
      }
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/users/login`, credentials);
      await checkAuth();
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
      throw err;
    }
  };

  const logout = async () => {
    try {
      await axios.get(`${import.meta.env.VITE_API_URL}/users/logout`);
      setUser(null);
      setError(null);
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  useEffect(() => {
    if (window.location.pathname === '/dashboard' || window.location.pathname === '/admin') {
      checkAuth().catch(() => {});
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, error, checkAuth, login, logout, isAdmin: user?.role === 'admin' }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;

