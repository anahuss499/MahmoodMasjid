// backend/routes/quran.js
import express from "express";
import fs from "fs";
import path from "path";

const router = express.Router();

// GET /api/quran/:surahNumber
router.get("/:surahNumber", (req, res) => {
  const surahNumber = req.params.surahNumber;
  const filePath = path.join(
    process.cwd(),
    "backend/quran",
    `surah_${surahNumber}.json`
  );

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ message: "Surah not found" });
  }

  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  res.json(data);
});

export default router;
