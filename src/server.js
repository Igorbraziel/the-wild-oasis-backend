import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";

import { connectDB } from "./config/database.js";
import { db } from "./models/index.js";

import cabinsRoutes from "./routes/cabinsRoutes.js";
import bookingsRoutes from "./routes/bookingsRoutes.js";
import settingsRoutes from "./routes/settingsRoutes.js";
import guestsRoutes from "./routes/guestsRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

//Middleware
app.use(cors({
  origin: ""
}));
app.use(helmet());
app.use(morgan("dev")); // use "combined" for production logging
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (request, response) => {
  response.send("Hello, Express!");
});

// Routes
app.use("/api/cabins", cabinsRoutes);
app.use("/api/bookings", bookingsRoutes);
app.use("/api/guests", guestsRoutes);
app.use("/api/settings", settingsRoutes);

// --- Sync Database and Start Server ---
const startServer = async () => {
  try {
    // This connects to the DB and syncs models.
    // { force: true } will drop and re-create all tables. Use with caution.
    // { alter: true } will check the current state and perform necessary changes.
    connectDB();
    await db.sequelize.sync({ alter: true });
    console.log("Database synchronized successfully.");
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Failed to synchronize database or start server:", error);
    process.exit(1);
  }
};

startServer();
