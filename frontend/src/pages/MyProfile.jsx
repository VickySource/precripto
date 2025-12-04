import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";

const MyProfile = () => {
  const {
    userData: loggedInUser,
    backendUrl,
    token,
    setUserData: setGlobalUser,
  } = useContext(AppContext);

  // Empty initial state (no dummy data)
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    address: {
      line1: "",
      line2: "",
    },
    gender: "",
    dob: "",
  });

  const [isEdit, setIsEdit] = useState(false);

  // Prefill from logged-in user when available
  useEffect(() => {
    if (loggedInUser) {
      setUserData((prev) => ({
        ...prev,
        name: loggedInUser.name || "",
        email: loggedInUser.email || "",
        phone: loggedInUser.phone || "",
        address: {
          line1: loggedInUser.address?.line1 || "",
          line2: loggedInUser.address?.line2 || "",
        },
        gender:
          loggedInUser.gender && loggedInUser.gender !== "not selected"
            ? loggedInUser.gender
            : "",
        dob:
          loggedInUser.dob && loggedInUser.dob !== "not selected"
            ? loggedInUser.dob
            : "",
      }));
    }
  }, [loggedInUser]);

  const handleSave = async () => {
    try {
      const res = await axios.post(
        `${backendUrl}/api/user/update-profile`,
        {
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
          address: userData.address,
          gender: userData.gender || "not selected",
          dob: userData.dob || "not selected",
        },
        {
          headers: {
            // 👇 Match backend authUser middleware
            token: token,
          },
        }
      );

      if (res.data.success) {
        if (setGlobalUser && res.data.userData) {
          setGlobalUser(res.data.userData);
        }
        setIsEdit(false);
      } else {
        console.error("Update failed:", res.data.message);
      }
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  return (
    <div className="max-w-lg flex flex-col gap-2 text-sm">
      {isEdit ? (
        <input
          className="bg-gray-50 text-3xl font-medium max-w-60 mt-4"
          onChange={(e) =>
            setUserData((prev) => ({ ...prev, name: e.target.value }))
          }
          type="text"
          value={userData.name}
        />
      ) : (
        <p className="font-medium text-3xl text-neutral-800 mt-4">
          {userData.name || "—"}
        </p>
      )}

      <hr className="bg-zinc-400 h-[1px] border-none" />

      {/* CONTACT INFORMATION */}
      <div>
        <p className="text-neutral-500 underline mt-3">
          CONTACT INFORMATION
        </p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
          <p className="font-medium">Email id:</p>
          {isEdit ? (
            <input
              className="bg-gray-100 max-w-60"
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, email: e.target.value }))
              }
              type="email"
              value={userData.email}
            />
          ) : (
            <p className="text-blue-500">{userData.email || "—"}</p>
          )}

          <p className="font-medium">Phone:</p>
          {isEdit ? (
            <input
              className="bg-gray-100 max-w-52"
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, phone: e.target.value }))
              }
              type="text"
              value={userData.phone}
            />
          ) : (
            <p className="text-gray-400">{userData.phone || "—"}</p>
          )}

          <p className="font-medium">Address:</p>
          {isEdit ? (
            <>
              <input
                className="bg-gray-50 w-full mb-1"
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line1: e.target.value },
                  }))
                }
                type="text"
                value={userData.address.line1}
              />
            
            </>
          ) : (
            <p className="text-gray-400">
              {userData.address.line1 || "—"}
              <br />
              {userData.address.line2 || ""}
            </p>
          )}
        </div>
      </div>

      {/* BASIC INFORMATION */}
      <div>
        <p className="text-neutral-500 underline mt-3">
          BASIC INFORMATION
        </p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
          <p className="font-medium">Gender:</p>
          {isEdit ? (
            <select
              className="max-w-20 bg-gray-100"
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, gender: e.target.value }))
              }
              value={userData.gender}
            >
              <option value="">--</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          ) : (
            <p className="text-gray-400">{userData.gender || "—"}</p>
          )}

          <p className="font-medium">DOB:</p>
          {isEdit ? (
            <input
              className="max-w-28 bg-gray-100"
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, dob: e.target.value }))
              }
              value={userData.dob}
              type="date"
            />
          ) : (
            <p className="text-gray-400">{userData.dob || "—"}</p>
          )}
        </div>
      </div>

      {/* ACTION BUTTON */}
      <div className="mt-10">
        {isEdit ? (
          <button
            className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all"
            onClick={handleSave}
          >
            Save Information
          </button>
        ) : (
          <button
            className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all"
            onClick={() => setIsEdit(true)}
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
