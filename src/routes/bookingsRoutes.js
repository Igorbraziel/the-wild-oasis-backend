import express from "express";
import {
  createBooking,
  deleteAllBookings,
  deleteBookingById,
  getBookingById,
  getBookings,
  getBookingsByCabinId,
  updateBooking,
} from "../controllers/bookingsController.js";
import { protect } from "../middlewares/protect.js";

const router = express.Router();

// GET
router.get("/guest/:guestId", protect, getBookings);
router.get("/:bookingId", getBookingById);
router.get("/cabin/:cabinId", getBookingsByCabinId);

// POST
router.post("/create", protect, createBooking)

// PATCH (UPDATE)
router.patch("/update/:bookingId", protect, updateBooking)

// DELETE
router.delete("/delete/all", protect, deleteAllBookings)
router.delete("/delete/:bookingId", protect, deleteBookingById)


export default router;
