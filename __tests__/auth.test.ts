import request from "supertest";
import app from "../src/app";

describe("Auth Endpoints", () => {
  const email = `testuser${Date.now()}@example.com`;
  const password = "testpass";

  it("should register a new user", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({ email, password, role: "USER" });

    expect(res.statusCode).toBe(201);
    expect(res.body.user).toHaveProperty("email", email);
  });

  it("should login the user", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email, password });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });
});
