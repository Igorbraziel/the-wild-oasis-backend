import { Bookings } from "../models/index.js";
import { INTEGER, Op } from "sequelize";

// GET

export const getBookings = async (req, res) => {
  try {
    const bookings = await Bookings.findAll({
      where: {
        guestId: req.params.guestId,
      },
      order: [["startDate", "DESC"]],
    });

    if (!bookings?.length) {
      return res.status(404).json({ message: "Bookings not found" });
    }

    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error Fetching Bookings:", error);
    res.status(500).json({ message: "Error Fetching Bookings" });
  }
};

export const getBookingById = async (req, res) => {
  try {
    const { bookingId } = req.params;

    const booking = await Bookings.findByPk(parseInt(bookingId));

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json(booking);
  } catch (error) {
    console.error("Error Fetching Booking By Id:", error);
    res.status(500).json({ message: "Error Fetching Booking By Id" });
  }
};

export const getBookingsByCabinId = async (req, res) => {
  try {
    const bookings = await Bookings.findAll({
      where: {
        cabinId: parseInt(req.params.cabinId),
        status: {
          [Op.in]: ["checked-in", "unconfirmed"],
        },
      },
    });
    if (!bookings?.length) {
      return res
        .status(404)
        .json({ message: "Bookings Not Found", data: bookings });
    }

    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching bookings by cabinId");
    res.status(500).json({ message: "Error Fetching Bookings" });
  }
};

// POST
export const createBooking = async (req, res) => {
  try {
    const newBooking = await Bookings.create(req.body);
    res.status(201).json({
      message: "Booking Successfully Created",
      data: newBooking,
    });
  } catch (error) {
    console.error("Error Creating a Booking:", error);
    res.status(500).json({ message: "An Error Occurred On the Server" });
  }
};

// UPDATE

export const updateBooking = async (req, res) => {
  try {
    const booking = await Bookings.findByPk(req.params.bookingId);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const [affectedRows] = await Bookings.update(req.body, {
      where: {
        id: req.params.bookingId,
      },
    });

    if (affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "Booking not found or no new data to update" });
    }

    const updatedBooking = await Bookings.findByPk(req.params.bookingId);

    res.status(200).json({
      message: "Booking successfully updated",
      data: updatedBooking,
    });
  } catch (error) {
    console.error("Error updating booking:", error);
    res.status(500).json({ message: "An error occurred on the server." });
  }
};

// DELETE

export const deleteAllBookings = async (req, res) => {
  try {
    const deletedRows = await Bookings.destroy({
      where: {
        id: {
          [Op.gt]: 0,
        },
      },
    });

    if (!deletedRows) {
      return res.status(404).json({ message: "Bookings not found" });
    }

    res.status(204).send();
  } catch (error) {
    console.error("Error deleting bookings:", error);
    res.status(500).json({ message: "An error occurred on the server." });
  }
};

export const deleteBookingById = async (req, res) => {
  try {
    const deletedRows = await Bookings.destroy({
      where: {
        id: req.params.bookingId,
      },
    });

    if (!deletedRows) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(204).send();
  } catch (error) {
    console.error("Error deleting booking:", error);
    res.status(500).json({ message: "An error occurred on the server." });
  }
};
