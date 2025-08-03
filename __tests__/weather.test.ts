import request from "supertest";
import app from "../src/app";

describe("Weather API", () => {
  let token = "";

  beforeAll(async () => {
    const email = `testweather${Date.now()}@example.com`;
    const password = "testpass";

    await request(app)
      .post("/api/auth/register")
      .send({ email, password, role: "USER" });

    const res = await request(app)
      .post("/api/auth/login")
      .send({ email, password });

    token = res.body.token;
  });

  it("should return weather data for a city", async () => {
    const res = await request(app)
      .get("/api/weather?city=London")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("data");
    expect(res.body).toHaveProperty("source");
  });
});
