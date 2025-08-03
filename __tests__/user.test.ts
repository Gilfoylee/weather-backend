import request from "supertest";
import app from "../src/app";

describe("Admin Create User", () => {
  let adminToken = "";

  beforeAll(async () => {
    const email = `admin${Date.now()}@example.com`;
    const password = "adminpass";

    await request(app)
      .post("/api/auth/register")
      .send({ email, password, role: "ADMIN" });

    const res = await request(app)
      .post("/api/auth/login")
      .send({ email, password });

    adminToken = res.body.token;
  });

  it("should allow admin to create a user", async () => {
    const res = await request(app)
      .post("/api/users")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        email: `newuser${Date.now()}@example.com`,
        password: "123456",
        role: "USER",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.user).toHaveProperty("email");
    expect(res.body.user.role).toBe("USER");
  });
});
