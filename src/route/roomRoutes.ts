import express from "express";

import { authenticate } from "../middleware/authMiddleware";
import { createRoom, deleteRoom, getAllRoom, updateRoom } from "../controllers/roomControllers";

const router = express.Router();

router.post("/", authenticate as express.RequestHandler, createRoom as express.RequestHandler);
router.get("/", getAllRoom as unknown as express.RequestHandler);
router.patch("/:id", authenticate as express.RequestHandler, updateRoom as express.RequestHandler);
router.delete("/:id", authenticate as express.RequestHandler, deleteRoom as express.RequestHandler);

export default router;
