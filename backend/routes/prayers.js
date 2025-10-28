import express from "express";
import { fetchPrayerTimes } from "../controllers/prayerController.js";
const router = express.Router();

router.get("/", fetchPrayerTimes);

export default router;
