import { Guests } from "../models/index.js";
import { Op } from "sequelize";

// GET

export const getAllGuests = async (req, res) => {
  try {
    const guests = await Guests.findAll();

    if (!guests?.length) {
      return res.status(404).json({ message: "No Guests found" });
    }

    res.status(200).json(guests);
  } catch (error) {
    console.error("Error Fetching The Guests:", error);
    res.status(500).json({ message: "Error Fetching The Guests" });
  }
};

export const getGuestByEmail = async (req, res) => {
  try {
    const { email } = req.params;

    const guest = await Guests.findOne({
      where: {
        email: email,
      },
    });

    if (!guest) {
      return res.status(404).json({
        message: "No Guest found with the current email address",
        guest,
      });
    }

    res.status(200).json({ guest });
  } catch (error) {
    console.error("Error Fetching The Guest By Email:", error);
    res.status(500).json({ message: "Error Fetching The Guest By Email" });
  }
};

// POST

export const createGuest = async (req, res) => {
  try {
    const newGuest = await Guests.create(req.body);
    res.status(201).json({
      message: "Guest Successfully created",
      data: newGuest,
    });
  } catch (error) {
    console.error("Error Creating Guest:", error);
    res.status(500).json({
      message: "An Error occurred on the server",
    });
  }
};

// UPDATE

export const updateGuest = async (req, res) => {
  try {
    const guest = await Guests.findByPk(req.params.guestId);

    if (!guest) {
      return res.status(404).json({ message: "Guest not found" });
    }

    const [affectedRows] = await Guests.update(req.body, {
      where: {
        id: req.params.guestId,
      },
    });

    if (affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "Guest not found or no new data to update" });
    }

    const updatedGuest = await Guests.findByPk(req.params.guestId);

    res.status(200).json({
      message: "Guest successfully updated",
      data: updatedGuest,
    });
  } catch (error) {
    console.error("Error updating guest:", error);
    res.status(500).json({ message: "An error occurred on the server." });
  }
};

// DELETE

export const deleteAllGuests = async (req, res) => {
  try {
    const deletedRows = await Guests.destroy({
      where: {
        id: {
          [Op.gt]: 0,
        },
      },
    });

    if (!deletedRows) {
      return res.status(404).json({ message: "No guests yet" });
    }

    res.status(204).send();
  } catch (error) {
    console.error("Error deleting guests:", error);
    res.status(500).json({ message: "An error occurred on the server." });
  }
};

export const deleteGuestById = async (req, res) => {
  try {
    const deletedRows = await Guests.destroy({
      where: {
        id: req.params.guestId,
      },
    });

    if (!deletedRows) {
      return res.status(404).json({ message: "Guest not found" });
    }

    res.status(204).send();
  } catch (error) {
    console.error("Error deleting guest:", error);
    res.status(500).json({ message: "An error occurred on the server." });
  }
};
