import { useContext, useState } from "react";
import AppointmentsContext from "../contexts/AppointmentsContext";
import AppointmentList from "../components/ApptList";
import SearchOrder from "../components/SearchOrder";
import CreateNew from "../components/AddNew";
import  useAuth  from "../contexts/useAuth";

const Dashboard = () => {

  const { appointments, error } = useContext(AppointmentsContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState("date");
  const [sortOrder, setSortOrder] = useState("asc");
  const { isAdmin } = useAuth();

  const filteredAppointments = appointments.filter((appointment) =>
    (appointment.pet_name ? appointment.pet_name.toLowerCase().includes(searchTerm.toLowerCase()) : false) ||
    (appointment.owner ? appointment.owner.toLowerCase().includes(searchTerm.toLowerCase()) : false)
  );

  const sortedAppointments = filteredAppointments.sort((a, b) => {
    if (a[sortKey] < b[sortKey]) return sortOrder === "asc" ? -1 : 1;
    if (a[sortKey] > b[sortKey]) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  return (
    <div className=" bg-white pt-24 w-full h-full">
      <h1 className="text-3xl font-bold mb-4 text-center bg-purple-700 text-white p-4 w-3/4 grid place-self-center">Pets Medicare</h1>
      {!isAdmin && <CreateNew className="mb-4" />}
      {error && <p className="text-red-500">{error}</p>}
      <SearchOrder
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setSortKey={setSortKey}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />
      <AppointmentList appointments={sortedAppointments} />
    </div>
  );
};

export default Dashboard;



