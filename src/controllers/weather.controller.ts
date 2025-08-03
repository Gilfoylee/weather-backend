import { Request, Response } from "express";
import { fetchWeatherData, getWeatherHistory } from "../services/weather.service";

export const getWeather = async (req: Request, res: Response) => {
  const { city } = req.query;
  const user = (req as any).user;

  if (!city || typeof city !== "string") {
    return res.status(400).json({ message: "City is required" });
  }

  try {
    const result = await fetchWeatherData(city, user.userId);
    res.json(result);
  } catch (err) {
    console.error("Weather error:", err);
    res.status(500).json({ message: "Failed to fetch weather data" });
  }
};

export const getHistory = async (req: Request, res: Response) => {
  const user = (req as any).user;

  try {
    const queries = await getWeatherHistory(user.userId, user.role);
    res.json({ count: queries.length, data: queries });
  } catch (error) {
    console.error("History error:", error);
    res.status(500).json({ message: "Failed to retrieve history" });
  }
};
