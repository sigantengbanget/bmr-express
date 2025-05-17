"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const bookingControllers_1 = require("../controllers/bookingControllers");
const router = express_1.default.Router();
router.post("/", authMiddleware_1.authenticate, bookingControllers_1.createBooking);
router.get("/my", authMiddleware_1.authenticate, bookingControllers_1.getUserBookings);
router.get("/all", authMiddleware_1.authenticate, bookingControllers_1.getAllBookings);
router.delete("/:id", authMiddleware_1.authenticate, bookingControllers_1.cancelBooking);
exports.default = router;
