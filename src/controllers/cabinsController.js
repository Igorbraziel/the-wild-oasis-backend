import { Cabins } from "../models/index.js";
import { Op } from "sequelize";

// GET

export const getCabinById = async (req, res) => {
  try {
    const { cabinId } = req.params;

    const cabin = await Cabins.findByPk(parseInt(cabinId));
    if (!cabin) {
      return res.status(404).json({ message: "Cabin not found." });
    }

    res.status(200).json(cabin);
  } catch (error) {
    console.error("Error fetching cabin:", error);
    res.status(500).json({ message: "Error fetching cabin" });
  }
};

export const getCabinPriceById = async (req, res) => {
  try {
    const { cabinId } = req.params;

    const cabin = await Cabins.findByPk(parseInt(cabinId), {
      attributes: ["regularPrice", "discount"],
    });
    if (!cabin) {
      return res.status(404).json({ message: "Cabin not found." });
    }

    res.status(200).json(cabin);
  } catch (error) {
    console.error("Error fetching cabin:", error);
    res.status(500).json({ message: "Error fetching cabin" });
  }
};

export const getCabins = async (req, res) => {
  try {
    const cabins = await Cabins.findAll();
    if (!cabins?.length) {
      return res.status(404).json({ message: "Cabins not found" });
    }

    res.status(200).json(cabins);
  } catch (error) {
    console.error("Error fetching the cabins:", error);
    return res.status(500).json({ message: "Error fetching the cabins" });
  }
};

// POST

export const createCabin = async (req, res) => {
  try {
    const newCabin = await Cabins.create(req.body);
    res.status(201).json({
      message: "Cabin Successfully Created!",
      data: newCabin,
    });
  } catch (error) {
    console.error("Error creating cabin:", error);
    if (error.name === "SequelizeUniqueConstraintError") {
      return res
        .status(409)
        .json({ message: "A cabin with this name already exists." });
    }
    res.status(500).json({ message: "An error occurred on the server." });
  }
};

// UPDATE

export const updateCabin = async (req, res) => {
  try {
    const cabin = await Cabins.findByPk(req.params.cabinId);

    if (!cabin) {
      return res.status(404).json({ message: "Cabin not found" });
    }

    const [affectedRows] = await Cabins.update(req.body, {
      where: {
        id: req.params.cabinId,
      },
    });

    if (affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "Cabin not found or no new data to update" });
    }

    const updatedCabin = await Cabins.findByPk(req.params.cabinId);

    res.status(200).json({
      message: "Cabin successfully updated",
      data: updatedCabin,
    });
  } catch (error) {
    console.error("Error updating cabin:", error);
    res.status(500).json({ message: "An error occurred on the server." });
  }
};


// DELETE

export const deleteAllCabins = async (req, res) => {
  try { 
    const deletedRows = await Cabins.destroy({
      where: {
        id: {
          [Op.gt]: 0,
        },
      },
    });

    if (!deletedRows) {
      return res.status(404).json({ message: "Cabins not found" });
    }

    res.status(204).send();
  } catch (error) {
    console.error("Error deleting cabins:", error);
    res.status(500).json({ message: "An error occurred on the server." });
  }
};

export const deleteCabinById = async (req, res) => {
  try {
    const deletedRows = await Cabins.destroy({
      where: {
        id: req.params.cabinId,
      },
    });

    if (!deletedRows) {
      return res.status(404).json({ message: "Cabin not found" });
    }

    res.status(204).send();
  } catch (error) {
    console.error("Error deleting cabin:", error);
    res.status(500).json({ message: "An error occurred on the server." });
  }
};