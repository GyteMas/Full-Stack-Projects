import { useContext } from "react";
import AppointmentsContext from "../contexts/AppointmentsContext";
import axios from "axios";
import { toast } from "react-hot-toast";
import useAuth from "../contexts/useAuth";

const Status = ({ id, status }) => {
  const { isAdmin, loading, user } = useAuth();
  const { setAppointments } = useContext(AppointmentsContext);

  const handleStatus = async (id, status) => {
    // Define the next status based on the current one
    let nextStatus;
    if (status === "Pending") {
      nextStatus = "Confirmed";
    } else if (status === "Confirmed") {
      nextStatus = "Closed";
    } else {
      return; // Do nothing if the status is already "Closed"
    }

    try {
      if (user && !isAdmin) {
        // Fetch appointments for normal users
        const res = await axios.patch(
          `${import.meta.env.VITE_API_URL}/appointments/${id}`,
          { status: nextStatus
           },
          { withCredentials: true }
        );

        if (res.status === 200) {
          // Update the status in the context (appointments state)
          setAppointments((prevAppointments) =>
            prevAppointments.map((appt) =>
              appt.id === id ? { ...appt, status: nextStatus } : appt
            )
          );
          toast.success(`Status updated to ${nextStatus}`);
        }
      } else if (user && isAdmin) {
        const res = await axios.patch(
          `${import.meta.env.VITE_API_URL}/admin/appointments/${id}`,
          { status: nextStatus },
          { withCredentials: true }
        );

        if (res.status === 200) {
          // Update the status in the context (appointments state)
          setAppointments((prevAppointments) =>
            prevAppointments.map((appt) =>
              appt.id === id ? { ...appt, status: nextStatus } : appt
            )
          );
          toast.success(`Status updated to ${nextStatus}`);
        }
      }
    } catch (error) {
      console.error("Failed to update status:", error);
      toast.error("Status update failed. Please try again.");
    }
  };

  return (
    <div>
      {!isAdmin ? (
        // Admin users only see a non-interactive span
        <span
          className={`px-3 py-1 rounded-md text-white 
          ${
            status === "Confirmed"
              ? "bg-purple-500"
              : status === "Closed"
              ? "bg-purple-800"
              : "bg-purple-300"
          }`}
        >
          {status}
        </span>
      ) : (
        // Non-admin users see an interactive button
        <button
          className={`px-3 py-1 rounded-md text-white 
          ${
            status === "Confirmed"
              ? "bg-purple-500"
              : status === "Closed"
              ? "bg-purple-800"
              : "bg-purple-300"
          }`}
          onClick={() => handleStatus(id, status)}
          disabled={loading} // Disable button while loading
        >
          {loading ? "Updating..." : status}
        </button>
      )}
    </div>
  );
};

export default Status;
