import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

export default function defineGuests(){
  const Guests = sequelize.define(
    "guests",
    {
      fullName: {
        type: DataTypes.TEXT,
      },
      email: {
        type: DataTypes.TEXT,
      },
      nationalID: {
        type: DataTypes.TEXT
      },
      nationality: {
        type: DataTypes.TEXT
      },
      countryFlag: {
        type: DataTypes.TEXT
      }
    },
    { timestamps: true }, // Automatically adds createdAt and updatedAt
  );
  return Guests;
}

