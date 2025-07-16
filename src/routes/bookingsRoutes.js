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

const router = express.Router();

// GET
router.get("/guest/:guestId", getBookings);
router.get("/:bookingId", getBookingById);
router.get("/cabin/:cabinId", getBookingsByCabinId);

// POST
router.post("/create", createBooking)

// PATCH (UPDATE)
router.patch("/update/:bookingId", updateBooking)

// DELETE
router.delete("/delete/all", deleteAllBookings)
router.delete("/delete/:bookingId", deleteBookingById)


export default router;
