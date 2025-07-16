import { Settings } from "../models/index.js";

export const getSettings = async (req, res) => {
  try {
    const settings = await Settings.findAll();

    if (!settings?.length) {
      return res.status(404).json({ message: "Settings not found" });
    }

    res.status(200).json(settings);
  } catch (error) {
    console.error("Error Fetchin Settings:", error);
    res.status(500).json({ message: "Error Fetchin Settings" });
  }
};
