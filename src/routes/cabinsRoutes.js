import express from "express";
import {
  createCabin,
  deleteAllCabins,
  deleteCabinById,
  getCabinById,
  getCabinPriceById,
  getCabins,
  updateCabin,
} from "../controllers/cabinsController.js";
import { protect } from "../middlewares/protect.js";

const router = express.Router();

// GET
router.get("/", getCabins);
router.get("/:cabinId", getCabinById);
router.get("/price/:cabinId", getCabinPriceById);

// POST
router.post("/create", protect, createCabin);

// PATCH (UPDATE)
router.patch("/update/:cabinId", protect, updateCabin);

// DELETE
router.delete("/delete/all", protect, deleteAllCabins);
router.delete("/delete/:cabinId", protect, deleteCabinById);

export default router;
