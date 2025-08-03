import { prisma } from "../config/db";
import bcrypt from "bcryptjs";
import { signToken } from "../utils/jwt";

export const registerUser = async (
  email: string,
  password: string,
  role: "USER" | "ADMIN"
) => {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    throw new Error("Email already exists");
  }

  const hashed = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { email, password: hashed, role },
  });

  return { email: user.email, role: user.role };
};

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error("User not found");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid password");
  }

  const token = signToken({ userId: user.id, role: user.role });
  return token;
};
