import fetch from "node-fetch";

export const getPrayerTimes = async (req, res) => {
  try {
    const response = await fetch(
      "https://api.aladhan.com/v1/timingsByCity?city=Gujrat&country=Pakistan&method=1"
    );

    const data = await response.json();
    const timings = data.data.timings;

    const prayerTimes = {
      Fajr: timings.Fajr,
      Sunrise: timings.Sunrise,
      Dhuhr: timings.Dhuhr,
      Asr: timings.Asr,
      Maghrib: timings.Maghrib,
      Isha: timings.Isha,
      Jummah: "2:00 PM",
    };

    res.json(prayerTimes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to load prayer times" });
  }
};

