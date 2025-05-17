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
exports.deleteRoom = exports.updateRoom = exports.getAllRoom = exports.createRoom = void 0;
const prisma_1 = __importDefault(require("../utils/prisma"));
const createRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        if (user.role !== "ADMIN")
            return res.status(403).json({ msg: "Only admin can create room" });
        const { name } = req.body;
        const room = yield prisma_1.default.room.create({
            data: {
                name
            }
        });
        res.status(201).json({ msg: "Success create room", data: room });
    }
    catch (error) {
        console.log({ error });
        res.status(500).json({ msg: "Internal server error" });
    }
});
exports.createRoom = createRoom;
const getAllRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rooms = yield prisma_1.default.room.findMany();
        return res.status(200).json({ msg: "Success get all room", data: rooms });
    }
    catch (error) {
        console.log({ error });
        return res.status(500).json({ msg: "Internal server error" });
    }
});
exports.getAllRoom = getAllRoom;
const updateRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        if (user.role !== "ADMIN")
            return res.status(403).json({ msg: "Only admin can update room" });
        const { id } = req.params;
        const { name } = req.body;
        const room = yield prisma_1.default.room.update({
            where: {
                id
            },
            data: {
                name
            }
        });
        res.status(200).json({ msg: "Success update room", data: room });
    }
    catch (error) {
        console.log({ error });
        res.status(500).json({ msg: "Internal server error" });
    }
});
exports.updateRoom = updateRoom;
const deleteRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        if (user.role !== "ADMIN")
            return res.status(403).json({ msg: "Only admin can delete room" });
        const { id } = req.params;
        const room = yield prisma_1.default.room.delete({
            where: {
                id
            }
        });
        res.status(200).json({ msg: "Success delete room", data: room });
    }
    catch (error) {
        console.log({ error });
        res.status(500).json({ msg: "Internal server error" });
    }
});
exports.deleteRoom = deleteRoom;
