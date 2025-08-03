import { Request, Response } from "express";
import { registerUser } from "../services/auth.service";

export const adminCreateUser = async (req: Request, res: Response) => {
  const { email, password, role } = req.body;

  try {
    const user = await registerUser(email, password, role);
    res.status(201).json({ message: "User created by admin", user });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
