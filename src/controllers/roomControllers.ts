import { Request, Response } from "express";
import prisma from "../utils/prisma";

export const createRoom = async (req: Request, res: Response) => {
    try {
        const user = (req as any).user;
        if (user.role !== "ADMIN") return res.status(403).json({ msg: "Only admin can create room" })
        const { name } = req.body;
        const room = await prisma.room.create({
            data: {
                name
            }
        })
        res.status(201).json({ msg: "Success create room", data: room })
    } catch (error) {
        console.log({ error });
        res.status(500).json({ msg: "Internal server error" })
    }
}

export const getAllRoom = async (req: Request, res: Response) => {
    try {
        const rooms = await prisma.room.findMany()
        return res.status(200).json({ msg: "Success get all room", data: rooms })
    } catch (error) {
        console.log({error});
        return res.status(500).json({ msg: "Internal server error" })
    }
}

export const updateRoom = async (req: Request, res: Response) => {
    try {
        const user = (req as any).user;
        if (user.role !== "ADMIN") return res.status(403).json({ msg: "Only admin can update room" })
        const { id } = req.params;
        const { name } = req.body;
        const room = await prisma.room.update({
            where: {
                id
            },
            data: {
                name
            }
        })
        res.status(200).json({ msg: "Success update room", data: room })
    } catch (error) {
        console.log({ error });
        res.status(500).json({ msg: "Internal server error" })
    }

}

export const deleteRoom = async (req: Request, res: Response) => {
    try {
        const user = (req as any).user;
        if (user.role !== "ADMIN") return res.status(403).json({ msg: "Only admin can delete room" })
        const { id } = req.params;
        const room = await prisma.room.delete({
            where: {
                id
            }
        })
        res.status(200).json({ msg: "Success delete room", data: room })
    } catch (error) {
        console.log({ error });
        res.status(500).json({ msg: "Internal server error" })
    }
}