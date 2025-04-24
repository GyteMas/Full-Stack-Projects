import { useForm } from "react-hook-form";
import useAuth from "../contexts/useAuth"; // Assuming this gives you user info
import axios from "axios";
import { useContext } from "react";
import AppointmentsContext from "../contexts/AppointmentsContext";
import { toast } from "react-hot-toast";

const CreateNew = () => {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      date: "",
      description: "",
    },
  });
  const { user } = useAuth(); // Assuming this returns the logged-in user with their `user_id`
  const { setAppointments } = useContext(AppointmentsContext);

  const onSubmit = async (data) => {
    try {
      // Create the appointment, include the user_id from the logged-in user
      const appointmentData = {
        ...data,
        user_id: user.id, // Attach the authenticated user's ID to the appointment data
      };
      console.log("API Request Data:", appointmentData);

      // Make the API request to create the appointment
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/appointments`, // Adjust the URL if necessary
        appointmentData,
        { withCredentials: true }
      );


      if (res.status === 201 || res.data.status === "success") {
        // Close the modal
        document.getElementById("my_modal_1").close();

        // Add the new appointment to the list in context (re-render)
        setAppointments((prevAppointments) => [...prevAppointments, res.data.data]);

        // Reset the form and show success toast
        reset();
        toast.success('Appointment created successfully!');
      } else {
        toast.error('Failed to create the appointment. Please try again.');
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError("general", {
          type: "manual",
          message: err.response.data.message,
        });
      } else {
        setError("general", {
          type: "manual",
          message: "Appointment creation failed. Please try again.",
        });
      }
    }
  };

  return (
    <>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="text-xl font-bold mb-4 text-center bg-purple-600 text-white p-4 w-1/2 grid place-self-center place-content-center"
        onClick={() => {
          document.getElementById("my_modal_1").showModal();
          reset();
        }}
      >
        + Add New Appointment
      </button>

      <dialog id="my_modal_1" className="modal modal-middle">
        <div className="modal-box bg-purple-100 shadow-md min-h-1/3">
          <h3 className="font-bold text-lg text-center m-5 text-black">
            Add New Appointment
          </h3>
          <form onSubmit={handleSubmit(onSubmit)} method="dialog" className="mt-10">
            <input
              {...register("pet_name", { required: "Pet name is required" })}
              placeholder="Pet Name"
              className="w-full p-2 border rounded mb-2 text-black"
            />
            {errors.pet_name && (
              <p className="text-red-500 text-sm">{errors.pet_name.message}</p>
            )}

            <input
              {...register("date", { required: "Date is required" })}
              type="datetime-local"
              placeholder="Date and time"
              className="w-full p-2 border rounded mb-2 text-black"
            />
            {errors.date && (
              <p className="text-red-500 text-sm">{errors.date.message}</p>
            )}

            <textarea
              {...register("description", {
                required: "Description is required",
              })}
              placeholder="Description"
              className="w-full p-2 border rounded mb-2 text-black"
            />
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description.message}</p>
            )}

            <div className="flex justify-between mt-10">
              <button
                type="submit"
                className="bg-purple-800 text-white p-2 rounded flex place-self-start"
              >
                Confirm
              </button>
              <button
                className="bg-purple-800 text-white p-2 rounded"
                onClick={() => {
                  document.getElementById("my_modal_1").close();
                }}
              >
                Cancel
              </button>
            </div>
          </form>

          {errors.general && (
            <p className="text-red-500 text-sm mt-2">{errors.general.message}</p>
          )}
        </div>
      </dialog>
    </>
  );
};

export default CreateNew;

