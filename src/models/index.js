import sequelize from "../config/database.js";
import defineBookings from "./bookingsModel.js";
import defineCabins from "./cabinsModel.js";
import defineGuests from "./guestsModel.js";
import defineSettings from "./settingsModel.js";

const Cabins = defineCabins();
const Guests = defineGuests();
const Bookings = defineBookings();
const Settings = defineSettings();

Cabins.hasMany(Bookings, {
  foreignKey: {
    name: "cabinId",
    allowNull: false,
  },
});

Guests.hasMany(Bookings, {
  foreignKey: {
    name: "guestId",
    allowNull: false,
  },
});

Bookings.belongsTo(Guests, {
  foreignKey: {
    name: "guestId",
    allowNull: false,
  },
});

Bookings.belongsTo(Cabins, {
  foreignKey: {
    name: "cabinId",
    allowNull: false,
  },
});

export { sequelize, Bookings, Cabins, Guests, Settings };

export const db = { sequelize, Bookings, Cabins, Guests, Settings };
