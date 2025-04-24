import { useState, useEffect } from "react";
import axios from "axios";
import useAuth from '../contexts/useAuth';
import { toast } from "react-hot-toast";

const Stars = ({ setAppointments, id, rating, isEditable }) => {
  const { isAdmin, user } = useAuth();
  const [selectedRatings, setSelectedRatings] = useState({});

  const handleRating = async (id, num) => {
  
    const parsedRating = Number(num);
  
    if (isNaN(parsedRating) || parsedRating < 1 || parsedRating > 5) {
      console.error("Invalid rating value:", parsedRating);
      return;
    }
  
    // Ensure correct rating is set for the selected ID
    setSelectedRatings((prev) => {
      const updatedRatings = { ...prev, [id]: parsedRating };
      return updatedRatings;
    });
  
    try {
      if (user && !isAdmin) {
        // For regular users
        const res = await axios.patch(
          `${import.meta.env.VITE_API_URL}/appointments/${id}`,
          { rating: parsedRating,
            user_id: user.id
           },
          { withCredentials: true }
        );

        console.log(parsedRating, id, res);
        
  
        if (res.status === 200 || res.data.status === "success") {
          // Update the appointment's rating in the context (state)
          setAppointments((prevAppointments) =>
            prevAppointments.map((appt) =>
              appt.id === id ? { ...appt, rating: parsedRating } : appt
            )
          );
          toast.success(`Rating updated to ${parsedRating} stars`);
        }
      } else if (user && isAdmin) {
        // For admins

        console.log(parsedRating, id, res);
        const res = await axios.patch(
          `${import.meta.env.VITE_API_URL}/admin/appointments/${id}`,
          { status: parsedRating },
          { withCredentials: true }
        );
  
        if (res.status === 200 || res.data.status === "success") {
          // Update the appointment's status in the context (state)
          setAppointments((prevAppointments) =>
            prevAppointments.map((appt) =>
              appt.id === id ? { ...appt, status: parsedRating } : appt
            )
          );
          toast.success(`Status updated to ${parsedRating}`);
        }
      }
    } catch (error) {
      console.error("Failed to update rating:", error.response?.data, error.response?.status);
      toast.error("Rating update failed. Please try again.");
    }
  };
  

  const renderStars = (id, rating, isEditable) => {
    return (
      <div className="flex justify-end">
        {[1, 2, 3, 4, 5].map((num) => (
          <label key={`${id}-${num}`} className="cursor-pointer text-2xl">
            <input
              type="radio"
              name={`rating-${id}`}
              className="hidden"
              value={num}
              checked={
                selectedRatings[id] ? selectedRatings[id] === num : rating === num
              }
              onChange={() => !isAdmin && isEditable && handleRating(id, num)}
              disabled={isAdmin}
            />
            <span
              className={`${
                selectedRatings[id] 
                  ? selectedRatings[id] >= num 
                    ? "text-yellow-500" 
                    : "text-gray-300" 
                  : rating >= num 
                  ? "text-yellow-500" 
                  : "text-gray-300"
              }`}
            >
              ★
            </span>
          </label>
        ))}
      </div>
    );
  };
  

  return <div>{renderStars(id, rating, rating === null, isEditable)}</div>;
};

export default Stars;
