import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../utils/prisma";

const generateToken = (user: any) => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  );
};

export const register = async (req: Request, res: Response) => {
  const { email, password, role } = req.body;

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser)  res.status(400).json({ message: "Email sudah terdaftar" });
  console.log("email", email);
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      role: role || "USER",
    },
  });

  const token = generateToken(user);

  res.status(201).json({
    message: "Registrasi berhasil",
    token,
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
    },
  });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user)  res.status(404).json({ message: "User tidak ditemukan" });

  const isMatch = await bcrypt.compare(password, user!.password);
  if (!isMatch) res.status(400).json({ message: "Password salah" });

  const token = generateToken(user);

  res.json({
    message: "Login berhasil",
    token,
    user: {
      id: user!.id,
      email: user!.email,
      role: user!.role,
    },
  });
};
