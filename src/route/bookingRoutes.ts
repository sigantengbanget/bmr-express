import express from "express";

import { authenticate } from "../middleware/authMiddleware";
import { cancelBooking, createBooking, getAllBookings, getUserBookings } from "../controllers/bookingControllers";

const router = express.Router();

router.post("/", authenticate as express.RequestHandler, createBooking as express.RequestHandler);
router.get("/my", authenticate as express.RequestHandler, getUserBookings);
router.get("/all", authenticate as express.RequestHandler, getAllBookings as express.RequestHandler);
router.delete("/:id", authenticate as express.RequestHandler, cancelBooking as express.RequestHandler);

export default router;
