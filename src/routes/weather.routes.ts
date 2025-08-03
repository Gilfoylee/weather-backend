import { Router } from "express";
import { getWeather, getHistory } from "../controllers/weather.controller";
import { isAuthenticated } from "../middleware/auth.middleware";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Weather
 *   description: Weather querying endpoints
 */

/**
 * @swagger
 * /api/weather:
 *   get:
 *     summary: Get weather data for a city
 *     tags: [Weather]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: city
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *         description: City name (e.g., London)
 *     responses:
 *       200:
 *         description: Weather data fetched successfully
 *       400:
 *         description: City query is required
 *       401:
 *         description: Unauthorized
 */
router.get("/", isAuthenticated, getWeather);

/**
 * @swagger
 * /api/weather/history:
 *   get:
 *     summary: Get weather query history
 *     tags: [Weather]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Weather query history fetched
 *       401:
 *         description: Unauthorized
 */
router.get("/history", isAuthenticated, getHistory);

export default router;
