import express from "express";
import {
  createGuest,
  deleteAllGuests,
  deleteGuestById,
  getAllGuests,
  getGuestByEmail,
  updateGuest,
} from "../controllers/guestsController.js";
import { protect } from "../middlewares/protect.js";

const router = express.Router();

// GET
router.get("/", getAllGuests);
router.get("/:email", getGuestByEmail);

// POST
router.post("/create", createGuest);

// PATCH (UPDATE)
router.patch("/update/:guestId", protect, updateGuest);

// DELETE
router.delete("/delete/all", protect, deleteAllGuests);
router.delete("/delete/:guestId", protect, deleteGuestById);

export default router;
