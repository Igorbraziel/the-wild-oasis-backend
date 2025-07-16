import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

export default function defineCabins() {
  const Cabins = sequelize.define(
    "cabins",
    {
      name: {
        type: DataTypes.TEXT,
        unique: true,
      },
      maxCapacity: {
        type: DataTypes.INTEGER,
      },
      regularPrice: {
        type: DataTypes.INTEGER,
      },
      discount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      description: {
        type: DataTypes.TEXT,
      },
      image: {
        type: DataTypes.TEXT,
      },
    },
    { timestamps: true }, // Automatically adds createdAt and updatedAt
  );
  return Cabins;
}
