import { useContext } from "react";
import  AppointmentsContext  from "../contexts/AppointmentsContext";
import DeleteButton from "./Delete";
import { FaPen } from "react-icons/fa";
import Stars from "./Stars";
import Status from "./Status";

const AppointmentCard = ({ appointment }) => {
  const { setAppointments } = useContext(AppointmentsContext);

  
return(
    <div className="p-4 bg-white border border-gray-300 grid grid-cols-[40px_1fr_100px_100px] items-center mb-2 min-w-[370px]">
      <div className="grid grid-rows-2 gap-1">
        <DeleteButton id={appointment.id}/>
        <button className="border-purple-800 border text-purple-400 px-3 py-1 rounded hover:text-purple-800">
          <FaPen />
        </button>
      </div>
      <div className="flex-1 px-4 col justify-items-start">
        <h3 className="text-lg font-semibold text-purple-700 text-left">{appointment.pet_name}</h3>
        <p className="text-sm text-gray-600 text-left">Owner: {appointment.username}</p>
        <p className="text-sm text-gray-600 text-left">Description: {appointment.description}</p>
      </div>
      <div>
        <p className="italic text-gray-600">{appointment.date}</p>
      </div>
      <div className="text-right">
        <Status status={appointment.status} id={appointment.id}  setAppointments={setAppointments} rating={appointment.rating}/>
        {appointment.status === "Closed" && (
          <Stars
            id={appointment.id}
            rating={appointment.rating}
            isEditable={appointment.rating === null}
            setAppointments={setAppointments}
          />
          
        )}
      </div>
    </div>
  );
};

export default AppointmentCard;
