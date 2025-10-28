import express from "express";
import { getPrayerTimes } from "../controllers/prayerController.js";

const router = express.Router();

// GET /api/prayers
router.get("/", getPrayerTimes);

export default router;



