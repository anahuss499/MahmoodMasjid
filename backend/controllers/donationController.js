import Donation from "../models/Donation.js";

export const submitDonation = async (req, res) => {
  try {
    const newDonation = await Donation.create(req.body);
    res.status(201).json({ message: "Donation recorded", data: newDonation });
  } catch (error) {
    res.status(500).json({ error: "Failed to record donation" });
  }
};
