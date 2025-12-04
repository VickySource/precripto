import { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

// Helper: calculate age from DOB
function calculateAge(dob) {
  if (!dob) return "";

  // Force local date (ignore timezone)
  const dateStr = typeof dob === "string" ? dob.split("T")[0] : dob;
  const [year, month, day] = dateStr.split("-").map(Number);

  if (!year || !month || !day) {
    console.warn("Invalid DOB format:", dob);
    return "";
  }

  const today = new Date();
  let age = today.getFullYear() - year;

  const hasHadBirthdayThisYear =
    today.getMonth() + 1 > month ||
    (today.getMonth() + 1 === month && today.getDate() >= day);

  if (!hasHadBirthdayThisYear) {
    age--;
  }

  return Math.max(age, 0); // never show -1
}

const AllAppointments = () => {
  const {
    aToken,
    appointments,
    getAllAppointments,
    cancelAppointment,
  } = useContext(AdminContext) || {}; // <-- avoid crash if context is undefined

  const { slotDateFormat, currency } = useContext(AppContext) || {};

  useEffect(() => {
    console.log("Admin AllAppointments - aToken:", aToken);
    if (aToken) {
      getAllAppointments && getAllAppointments();
    }
  }, [aToken, getAllAppointments]);

  // While loading or if appointments missing
  if (!appointments) {
    return (
      <div className="m-5 text-gray-500 text-sm">
        Loading appointments...
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">All Appointments</p>

      <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll">
        <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>

        {appointments.length === 0 && (
          <p className="px-6 py-4 text-sm text-gray-400">
            No appointments found.
          </p>
        )}

        {appointments.map((item, index) => (
          <div
            className="flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50"
            key={item._id || index}
          >
            <p className="max-sm:hidden">{index + 1}</p>

            {/* Patient */}
            <div className="flex items-center gap-2">
              <img
                className="w-8 h-8 rounded-full object-cover bg-gray-200"
                src={item.userData?.image || assets.profile_pic}
                alt={item.userData?.name || "Patient"}
              />
              <p>{item.userData?.name || "Unknown"}</p>
            </div>

            {/* Age */}
            <p className="max-sm:hidden">
              {item.userData?.dob ? calculateAge(item.userData.dob) : ""}
            </p>

            {/* Date & time */}
            <p>
              {slotDateFormat
                ? slotDateFormat(item.slotDate)
                : item.slotDate}{" "}
              , {item.slotTime}
            </p>

            {/* Doctor */}
            <div className="flex items-center gap-2">
              <img
                className="w-8 h-8 rounded-full object-cover bg-gray-200"
                src={item.docData?.image || assets.doctor_icon}
                alt={item.docData?.name || "Doctor"}
              />
              <p>{item.docData?.name || "Unknown Doctor"}</p>
            </div>

            {/* Fees */}
            <p>
              {currency || "₹"}
              {item.amount}
            </p>

            {/* Status / cancel button */}
            {item.cancelled ? (
              <p className="text-red-400 text-xs font-medium">Cancelled</p>
            ) : item.isCompleted ? (
              <p className="text-green-500 text-xs font-medium">
                Completed
              </p>
            ) : (
              <img
                onClick={() => cancelAppointment && cancelAppointment(item._id)}
                className="w-10 cursor-pointer"
                src={assets.cancel_icon}
                alt="Cancel appointment"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllAppointments;
