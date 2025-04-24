import { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "./useAuth";
import AppointmentsContext from "./AppointmentsContext";
import {useNavigate} from 'react-router';
function AppointmentsContextProvider({ children }) {
  const { user, loading, isAdmin } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      console.log(isAdmin);
      console.log(loading);
      console.log(user);
      
      
      if (user && !isAdmin) {
        // Fetch appointments for normal users
        axios
          .get(`${import.meta.env.VITE_API_URL}/appointments`, { withCredentials: true })
          .then((res) => setAppointments(res.data.data))
          .catch(() => setError("Failed to fetch appointments"));
      } else if (user && isAdmin) {
        axios
          .get(`${import.meta.env.VITE_API_URL}/admin/appointments`, { withCredentials: true })
          .then((res) => setAppointments(res.data.data))
          .catch(() => setError('Failed to fetch appointments'));
      }
    }
  }, [loading, user, isAdmin, navigate]);

  return (
    <AppointmentsContext.Provider value={{ appointments, setAppointments, error, setError }}>
      {children}
    </AppointmentsContext.Provider>
  );
}

export default AppointmentsContextProvider;
