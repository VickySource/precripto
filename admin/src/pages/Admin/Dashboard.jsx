import { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { assets } from "../../assets/assets";

// local date formatter
function slotDateFormat(dateStr) {
  if (!dateStr) return "";

  const date = new Date(dateStr);
  if (isNaN(date)) {
    console.warn("Invalid date in Dashboard:", dateStr);
    return dateStr; // show raw
  }

  const day = date.getDate().toString().padStart(2, "0");
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

const Dashboard = () => {
  const { aToken, dashData, getDashData, cancelAppointment } =
    useContext(AdminContext) || {};

  useEffect(() => {
    console.log("Admin Dashboard - aToken:", aToken);
    if (aToken && getDashData) {
      getDashData();
    }
  }, [aToken, getDashData]);

  if (!dashData) {
    return (
      <div className="m-5 text-gray-500 text-sm">
        Loading dashboard...
      </div>
    );
  }

  const doctorsCount = dashData.doctors ?? 0;
  const appointmentsCount = dashData.appointments ?? 0;
  const patientsCount = dashData.patients ?? 0;
  const latestAppointments = dashData.latestAppointments || [];

  console.log("Dashboard dashData:", dashData);

  return (
    <div className="m-5">
      {/* Cards */}
      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
          <img className="w-14" src={assets.doctor_icon} alt="" />
          <div>
            <p className="text-xl font-semibold text-gray-600">
              {doctorsCount}
            </p>
            <p className="text-gray-400">Doctors</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
          <img className="w-14" src={assets.appointments_icon} alt="" />
          <div>
            <p className="text-xl font-semibold text-gray-600">
              {appointmentsCount}
            </p>
            <p className="text-gray-400">Appointments</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
          <img className="w-14" src={assets.patients_icon} alt="" />
          <div>
            <p className="text-xl font-semibold text-gray-600">
              {patientsCount}
            </p>
            <p className="text-gray-400">Patients</p>
          </div>
        </div>
      </div>

      {/* Latest bookings */}
      <div className="bg-white mt-5 border rounded">
        <div className="flex items-center gap-2.5 px-4 py-4 rounded-t border-b">
          <img src={assets.list_icon} alt="" />
          <p className="font-semibold">Latest Bookings</p>
        </div>

        <div className="pt-2">
          {latestAppointments.length === 0 && (
            <p className="px-6 py-4 text-sm text-gray-400">
              No recent bookings.
            </p>
          )}

          {latestAppointments.map((item) => (
            <div
              className="flex items-center px-6 py-3 gap-3 hover:bg-gray-100 border-t"
              key={item._id}
            >
              <img
                className="rounded-full w-10 h-10 object-cover bg-gray-200"
                src={item.docData?.image || assets.doctor_icon}
                alt={item.docData?.name || "Doctor"}
              />

              <div className="flex-1 text-sm">
                <p className="text-gray-800 font-medium">
                  {item.docData?.name || "Unknown Doctor"}
                </p>
                <p className="text-gray-600">
                  {slotDateFormat(item.slotDate)} • {item.slotTime}
                </p>
              </div>

              {item.cancelled ? (
                <p className="text-red-400 text-xs font-medium">
                  Cancelled
                </p>
              ) : item.isCompleted ? (
                <p className="text-green-500 text-xs font-medium">
                  Completed
                </p>
              ) : (
                <img
                  onClick={() => cancelAppointment && cancelAppointment(item._id)}
                  className="w-10 cursor-pointer"
                  src={assets.cancel_icon}
                  alt="Cancel"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
