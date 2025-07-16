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

const router = express.Router();

// GET
router.get("/", getCabins);
router.get("/:cabinId", getCabinById);
router.get("/price/:cabinId", getCabinPriceById);

// POST
router.post("/create", createCabin);

// PATCH (UPDATE)
router.patch("/update/:cabinId", updateCabin);

// DELETE
router.delete("/delete/all", deleteAllCabins);
router.delete("/delete/:cabinId", deleteCabinById);

export default router;
