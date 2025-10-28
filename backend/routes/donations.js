import express from "express";
import { submitDonation } from "../controllers/donationController.js";
const router = express.Router();

router.post("/", submitDonation);

export default router;
