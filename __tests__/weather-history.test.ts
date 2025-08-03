import request from "supertest";
import app from "../src/app";

describe("Weather History", () => {
  let adminToken = "";
  let userToken = "";

  beforeAll(async () => {
    const email1 = `admin${Date.now()}@example.com`;
    const email2 = `user${Date.now()}@example.com`;
    const password = "123456";

    await request(app).post("/api/auth/register").send({ email: email1, password, role: "ADMIN" });
    await request(app).post("/api/auth/register").send({ email: email2, password, role: "USER" });

    const res1 = await request(app).post("/api/auth/login").send({ email: email1, password });
    const res2 = await request(app).post("/api/auth/login").send({ email: email2, password });

    adminToken = res1.body.token;
    userToken = res2.body.token;

    // Birkaç sorgu yapalım
    await request(app)
      .get("/api/weather?city=Berlin")
      .set("Authorization", `Bearer ${userToken}`);

    await request(app)
      .get("/api/weather?city=Paris")
      .set("Authorization", `Bearer ${adminToken}`);
  });

  it("should return only user's own queries", async () => {
    const res = await request(app)
      .get("/api/weather/history")
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.data.every((q: any) => q.city)).toBe(true);
  });

  it("should return all queries for admin", async () => {
    const res = await request(app)
      .get("/api/weather/history")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.count).toBeGreaterThanOrEqual(2);
  });
});
