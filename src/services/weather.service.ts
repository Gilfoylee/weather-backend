import axios from "axios";
import redis from "../config/redis";
import { prisma } from "../config/db";
import { WeatherQueryResponse } from "../types/openWeather";

const API_KEY = process.env.OPENWEATHER_API_KEY!;
const BASE_URL = process.env.OPENWEATHER_API_BASE_URL;

export const fetchWeatherData = async (city: string, userId: string) => {
  const cacheKey = `weather:${city.toLowerCase()}`;

  // Cache check
  const cached = await redis.get(cacheKey);
  if (cached) {
    const data = JSON.parse(cached);

    // Store the search to DB
    await prisma.weatherQuery.create({
      data: {
        city,
        userId,
        request: data.request,
        location: data.location,
        current: data.current,
      },
    });

    return { source: "cache", data };
  }

  // API call
  const response = await axios.get(BASE_URL, {
    params: {
      access_key: API_KEY,
      query: city,
    },
  });

  const data = response.data as WeatherQueryResponse;

  // Write to cache (cache timeout is set up as 1 min in order to test API fast. You can change it if you want)
  await redis.set(cacheKey, JSON.stringify(data), "EX", process.env.CACHE_TIME || 60);

  // Store the search to DB
  await prisma.weatherQuery.create({
    data: {
      city,
      userId,
      request: JSON.parse(JSON.stringify(data.request)),
      location: JSON.parse(JSON.stringify(data.location)),
      current: JSON.parse(JSON.stringify(data.current)),
    },
  });

  return { source: "api", data };
};

export const getWeatherHistory = async (userId: string, role: string) => {
  if (role === "ADMIN") {
    return await prisma.weatherQuery.findMany({
      include: {
        user: {
          select: { id: true, email: true, role: true },
        },
      },
      orderBy: { queriedAt: "desc" },
    });
  }

  return await prisma.weatherQuery.findMany({
    where: { userId },
    orderBy: { queriedAt: "desc" },
  });
};
