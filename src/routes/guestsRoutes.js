import express from "express";
import {
  createGuest,
  deleteAllGuests,
  deleteGuestById,
  getAllGuests,
  getGuestByEmail,
  updateGuest,
} from "../controllers/guestsController.js";

const router = express.Router();

// GET
router.get("/", getAllGuests);
router.get("/:email", getGuestByEmail);

// POST
router.post("/create", createGuest);

// PATCH (UPDATE)
router.patch("/update/:guestId", updateGuest);

// DELETE
router.delete("/delete/all", deleteAllGuests);
router.delete("/delete/:guestId", deleteGuestById);

export default router;
