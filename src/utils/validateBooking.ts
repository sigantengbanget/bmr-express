import prisma from "./prisma";

export const isBookingAvailable = async (roomId: string, startTime: Date, endTime: Date) => {
  const conflict = await prisma.booking.findFirst({
    where: {
      roomId,
      AND: [
        { startTime: { lt: endTime } },
        { endTime: { gt: startTime } },
      ],
    },
  });
  return !conflict;
};
