import dotenv from "dotenv";
dotenv.config();

import Razorpay from "razorpay";
import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";

// ================== RAZORPAY INSTANCE (REAL) ==================

let razorpayInstance = null;

if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
  console.log("✅ Razorpay: using REAL instance");
  console.log("Razorpay KEY_ID:", process.env.RAZORPAY_KEY_ID);
  razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
} else {
  console.error(
    "⚠️ Razorpay: RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET missing in backend .env. Payment routes will return an error."
  );
}

// ================== AUTH / USER ==================

// API to register user
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.json({ success: false, message: "Missing Details!" });
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Enter a valid email!" });
    }

    if (password.length < 8) {
      return res.json({ success: false, message: "Enter a strong password!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashedPassword,
    };

    const newUser = new userModel(userData);
    const user = await newUser.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API for user login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get user profile data
const getProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const userData = await userModel.findById(userId).select("-password");

    res.json({ success: true, userData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to update user profile (JSON body, no image here)
const updateProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const { name, phone, address, dob, gender, email } = req.body;

    const update = {};

    if (name !== undefined) update.name = name;
    if (email !== undefined) update.email = email;
    if (phone !== undefined) update.phone = phone;
    if (address !== undefined) update.address = address;
    if (dob !== undefined)
      update.dob = dob && dob !== "" ? dob : "not selected";
    if (gender !== undefined)
      update.gender = gender && gender !== "" ? gender : "not selected";

    const updatedUser = await userModel
      .findByIdAndUpdate(userId, update, { new: true })
      .select("-password");

    if (!updatedUser) {
      return res.json({ success: false, message: "User not found" });
    }

    res.json({
      success: true,
      message: "Profile Updated",
      userData: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// ================== APPOINTMENTS ==================

// API to book appointment
const bookAppointment = async (req, res) => {
  try {
    const userId = req.userId;
    const { docId, slotDate, slotTime } = req.body;
    const docData = await doctorModel.findById(docId).select("-password");

    if (!docData) {
      return res.json({ success: false, message: "Doctor not found" });
    }

    if (!docData.available) {
      return res.json({ success: false, message: "Doctor Not Available" });
    }

    let slots_booked = docData.slots_booked || {};

    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return res.json({ success: false, message: "Slot Not Available" });
      } else {
        slots_booked[slotDate].push(slotTime);
      }
    } else {
      slots_booked[slotDate] = [slotTime];
    }

    const userData = await userModel.findById(userId).select("-password");
    const docDataObj = docData.toObject();
    delete docDataObj.slots_booked;

    const appointmentData = {
      userId,
      docId,
      userData,
      docData: docDataObj,
      amount: docData.fees,
      slotTime,
      slotDate,
      date: Date.now(),
    };

    const newAppointment = new appointmentModel(appointmentData);
    await newAppointment.save();

    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    res.json({ success: true, message: "Appointment Booked" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get user appointments for frontend my-appointment page
const listAppointment = async (req, res) => {
  try {
    const userId = req.userId;
    const appointments = await appointmentModel.find({ userId });

    res.json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to cancel appointment
const cancelAppointment = async (req, res) => {
  try {
    const userId = req.userId;
    const { appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);

    if (!appointmentData) {
      return res.json({ success: false, message: "Appointment not found" });
    }

    if (appointmentData.userId.toString() !== userId.toString()) {
      return res.json({ success: false, message: "Unauthorized action" });
    }

    await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });

    const { docId, slotDate, slotTime } = appointmentData;

    const doctorData = await doctorModel.findById(docId);

    if (
      doctorData &&
      doctorData.slots_booked &&
      doctorData.slots_booked[slotDate]
    ) {
      let slots_booked = doctorData.slots_booked;
      slots_booked[slotDate] = slots_booked[slotDate].filter(
        (e) => e !== slotTime
      );
      await doctorModel.findByIdAndUpdate(docId, { slots_booked });
    }

    res.json({ success: true, message: "Appointment Cancelled" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// ================== RAZORPAY PAYMENT FLOW ==================

// API to make payment of appointment using razorpay
const paymentRazorpay = async (req, res) => {
  try {
    if (!razorpayInstance) {
      return res.json({
        success: false,
        message: "Payment gateway not configured on server",
      });
    }

    const { appointmentId } = req.body;
    console.log("paymentRazorpay appointmentId:", appointmentId);

    const appointmentData = await appointmentModel.findById(appointmentId);

    if (!appointmentData || appointmentData.cancelled) {
      return res.json({
        success: false,
        message: "Appointment Cancelled or Not Found",
      });
    }

    const options = {
      amount: appointmentData.amount * 100,
      currency: process.env.CURRENCY || "INR",
      receipt: appointmentId.toString(),
    };

    const order = await razorpayInstance.orders.create(options);
    console.log("Razorpay order created:", order);

    res.json({ success: true, order });
  } catch (error) {
    console.log("paymentRazorpay ERROR:", error);
    res.json({ success: false, message: error.message });
  }
};

// API to verify payment of razorpay
const verifyRazorpay = async (req, res) => {
  try {
    if (!razorpayInstance) {
      return res.json({
        success: false,
        message: "Payment gateway not configured on server",
      });
    }

    const { razorpay_order_id } = req.body;
    console.log("verifyRazorpay received order_id:", razorpay_order_id);

    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
    console.log("Razorpay order info:", orderInfo);

    if (orderInfo.status === "paid") {
      await appointmentModel.findByIdAndUpdate(orderInfo.receipt, {
        payment: true,
      });

      return res.json({
        success: true,
        message: "Payment Successful",
      });
    }

    res.json({ success: false, message: "Payment Failed" });
  } catch (error) {
    console.log("verifyRazorpay ERROR:", error);
    res.json({ success: false, message: error.message });
  }
};

export {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  bookAppointment,
  listAppointment,
  cancelAppointment,
  paymentRazorpay,
  verifyRazorpay,
};
