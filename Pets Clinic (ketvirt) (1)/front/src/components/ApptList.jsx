import AppointmentCard from "./Appointment";


const AppointmentList = ({ appointments }) => {

  return (
    <div className=" grid grid-cols-1 gap-4 place-self-center md:max-w-1/2 w-full">
      {appointments.map((appointment) => (
        <AppointmentCard key={appointment.id} appointment={appointment} />
      ))}
    </div>
  );
};

export default AppointmentList;

