import { useContext, useState } from "react";
import AppointmentsContext from "../contexts/AppointmentsContext";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { toast } from "react-hot-toast";
import useAuth from "../contexts/useAuth";

const DeleteButton = ({ id }) => {
  const { setAppointments } = useContext(AppointmentsContext);
  const [isModalOpen, setIsModalOpen] = useState(false); // For controlling modal visibility
  const { isAdmin, user } = useAuth();

  const handleDelete = async (id) => {
    try {
      if (user && !isAdmin) {
        // Fetch appointments for normal users
        const res = await axios.delete(
          `${import.meta.env.VITE_API_URL}/appointments/${id}`,
          { withCredentials: true }
        );
  
        // Log the response to debug
  
        if (res.status === 204 || res.data.status === "success") {
          // Update the appointments state to remove the deleted appointment
          setAppointments((prevAppointments) =>
            prevAppointments.filter((appt) => appt.id !== id)
          );
  
          // Close the modal
          setIsModalOpen(false);
  
          // Show success toast
          toast.success('Appointment deleted successfully!');
        } else {
          // If something goes wrong with the response
          toast.error('Failed to delete the appointment.');
        }
      } else if (user && isAdmin) {
        const res = await axios.delete(
          `${import.meta.env.VITE_API_URL}/admin/appointments/${id}`,
          { withCredentials: true }
        );
  
        // Log the response to debug
  
        if (res.status === 204 || res.data.status === "success") {
          // Update the appointments state to remove the deleted appointment
          setAppointments((prevAppointments) =>
            prevAppointments.filter((appt) => appt.id !== id)
          );
  
          // Close the modal
          setIsModalOpen(false);
  
          // Show success toast
          toast.success('Appointment deleted successfully!');
        } else {
          // If something goes wrong with the response
          toast.error('Failed to delete the appointment.');
        }
      }
    } catch (error) {
      // Handle errors
      console.error("Failed to delete appointment:", error);
      toast.error('Appointment deletion failed. Please try again.');
    }
  };
  return (
    <>
      {/* Button that opens the modal */}
      <button
        className="border-purple-800 border text-purple-400 px-3 py-1 rounded hover:text-purple-800"
        onClick={() => setIsModalOpen(true)} // Open modal by setting state to true
      >
        <MdDelete />
      </button>

      {/* Modal */}
      {isModalOpen && (
        <dialog open className="modal modal-bottom sm:modal-middle">
          <div className="modal-box bg-purple-100 shadow-md">
            <h3 className="font-bold text-lg text-black">Delete Appointment</h3>
            <p className="py-4 text-black">Are you sure you want to delete this appointment?</p>

            <div className="flex justify-between mt-10">
              {/* Confirm button triggers the delete */}
              <button
                type="button"
                className="bg-purple-800 text-white p-2 rounded"
                onClick={() => {
                  handleDelete(id); // Delete appointment and show toast
                }}
              >
                Confirm
              </button>

              {/* Cancel button closes the modal */}
              <button
                type="button"
                className="bg-purple-800 text-white p-2 rounded"
                onClick={() => setIsModalOpen(false)} // Close the modal without deleting
              >
                Cancel
              </button>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
};

export default DeleteButton;
