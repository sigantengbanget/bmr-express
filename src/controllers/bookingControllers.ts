import { Request, Response } from "express";
import { isBookingAvailable } from "../utils/validateBooking";
import prisma from "../utils/prisma";

export const createBooking = async (req: Request, res: Response) => {
  const { roomId, date, startTime, endTime } = req.body;
  const userId = (req as any).user.id;

  if (!(await isBookingAvailable(roomId, new Date(startTime), new Date(endTime)))) {
    return res.status(400).json({ message: "Room is unavailable for the selected time" });
  }

  const booking = await prisma.booking.create({
    data: { roomId, userId, date: new Date(date), startTime: new Date(startTime), endTime: new Date(endTime) },
  });

  res.json(booking);
};

export const getUserBookings = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const bookings = await prisma.booking.findMany({ where: { userId }, include: { room: true } });
  res.json(bookings);
};

export const getAllBookings = async (req: Request, res: Response) => {
  const user = (req as any).user;
  if (user.role !== "ADMIN") return res.status(403).json({ message: "Forbidden" });

  const bookings = await prisma.booking.findMany({ include: { room: true, user: true } });
  res.status(200).json(bookings);
};

export const cancelBooking = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const { id } = req.params;

    const booking = await prisma.booking.findUnique({ where: { id } });
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    if (user.role !== "ADMIN" && booking!.userId !== user.id)
      return res.status(403).json({ message: "You don't have an access to cancel this booking" });

    await prisma.booking.delete({ where: { id } });
    res.status(200).json({ message: "Booking canceled" });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ message: "Internal server error" });
  }
};
