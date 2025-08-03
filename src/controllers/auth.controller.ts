import { Request, Response } from "express";
import { loginUser, registerUser } from "../services/auth.service";

export const register = async (req: Request, res: Response) => {
  const { email, password, role } = req.body;

  try {
    const user = await registerUser(email, password, role);
    res.status(201).json({ message: "User created", user });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const token = await loginUser(email, password);
    res.json({ token });
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
};
