import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

export default function defineBookings() {
  const Bookings = sequelize.define(
    "bookings",
    {
      startDate: {
        type: DataTypes.DATE,
      },
      endDate: {
        type: DataTypes.DATE,
      },
      numNights: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      numGuests: {
        type: DataTypes.INTEGER,
      },
      cabinPrice: {
        type: DataTypes.FLOAT,
      },
      extrasPrice: {
        type: DataTypes.FLOAT,
      },
      totalPrice: {
        type: DataTypes.FLOAT,
      },
      status: {
        type: DataTypes.TEXT,
      },
      hasBreakfast: {
        type: DataTypes.BOOLEAN,
      },
      isPaid: {
        type: DataTypes.BOOLEAN,
      },
      observations: {
        type: DataTypes.TEXT,
      },
    },
    { timestamps: true }, // Automatically adds createdAt and updatedAt
  );

  return Bookings;
}
