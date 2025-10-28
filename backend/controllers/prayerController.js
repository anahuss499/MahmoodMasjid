import axios from "axios";
import * as cheerio from "cheerio"; // npm install cheerio

export const fetchPrayerTimes = async (req, res) => {
  try {
    const url = "https://www.dawateislami.net/prayer-times/world/pakistan/ajnala-(gujrat)-prayer-times";
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const times = [];
    $("table tbody tr").each((_, el) => {
      const prayer = $(el).find("td:first-child").text().trim();
      const time = $(el).find("td:nth-child(2)").text().trim();
      if (prayer && time) times.push({ prayer, time });
    });

    res.json({ location: "Ajnala (Gujrat)", times });
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch prayer times" });
  }
};
