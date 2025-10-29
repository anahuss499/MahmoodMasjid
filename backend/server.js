import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import contactRoutes from "./routes/contact.js";
import donationRoutes from "./routes/donations.js";
import prayerRoutes from "./routes/prayers.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// API routes
app.use("/api/contact", contactRoutes);
app.use("/api/donations", donationRoutes);
app.use("/api/prayers", prayerRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

