"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelBooking = exports.getAllBookings = exports.getUserBookings = exports.createBooking = void 0;
const validateBooking_1 = require("../utils/validateBooking");
const prisma_1 = __importDefault(require("../utils/prisma"));
const createBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { roomId, date, startTime, endTime } = req.body;
    const userId = req.user.id;
    if (!(yield (0, validateBooking_1.isBookingAvailable)(roomId, new Date(startTime), new Date(endTime)))) {
        return res.status(400).json({ message: "Room is unavailable for the selected time" });
    }
    const booking = yield prisma_1.default.booking.create({
        data: { roomId, userId, date: new Date(date), startTime: new Date(startTime), endTime: new Date(endTime) },
    });
    res.json(booking);
});
exports.createBooking = createBooking;
const getUserBookings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.id;
    const bookings = yield prisma_1.default.booking.findMany({ where: { userId }, include: { room: true } });
    res.json(bookings);
});
exports.getUserBookings = getUserBookings;
const getAllBookings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (user.role !== "ADMIN")
        return res.status(403).json({ message: "Forbidden" });
    const bookings = yield prisma_1.default.booking.findMany({ include: { room: true, user: true } });
    res.status(200).json(bookings);
});
exports.getAllBookings = getAllBookings;
const cancelBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const { id } = req.params;
        const booking = yield prisma_1.default.booking.findUnique({ where: { id } });
        if (!booking)
            return res.status(404).json({ message: "Booking not found" });
        if (user.role !== "ADMIN" && booking.userId !== user.id)
            return res.status(403).json({ message: "You don't have an access to cancel this booking" });
        yield prisma_1.default.booking.delete({ where: { id } });
        res.status(200).json({ message: "Booking canceled" });
    }
    catch (error) {
        console.log({ error });
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.cancelBooking = cancelBooking;
