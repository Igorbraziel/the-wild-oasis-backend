import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

export default function defineSettings() {
  const Settings = sequelize.define(
    "settings",
    {
      minBookingLength: {
        type: DataTypes.INTEGER,
      },
      maxGuestsPerBooking: {
        type: DataTypes.INTEGER,
      },
      breakfastPrice: {
        type: DataTypes.FLOAT,
      },
      maxBookingLength: {
        type: DataTypes.INTEGER,
      },
    },
    { timestamps: true }, // Automatically adds createdAt and updatedAt
  );
  return Settings;
}
