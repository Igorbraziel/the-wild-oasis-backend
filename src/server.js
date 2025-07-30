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

const whitelist = [process.env.FRONTEND_PRODUCTION_URL];

//Middleware
app.use(
  cors({
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

app.use(
  process.env.NODE_ENV === "production" ? morgan("combined") : morgan("dev")
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (request, response) => {
  response.send("Server running!");
});

app.get("/healthcheck", (req, res) => {
  res.status(200).send("OK")
})

// Routes
app.use("/api/cabins", cabinsRoutes);
app.use("/api/bookings", bookingsRoutes);
app.use("/api/guests", guestsRoutes);
app.use("/api/settings", settingsRoutes);

// --- Sync Database and Start Server ---
const startServer = async () => {
  try {
    await connectDB();
    await db.sequelize.sync();
    console.log("Database connection established.");
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to synchronize database or start server:", error);
    process.exit(1);
  }
};

startServer();
