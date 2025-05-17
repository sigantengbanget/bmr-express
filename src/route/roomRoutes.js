"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const roomControllers_1 = require("../controllers/roomControllers");
const router = express_1.default.Router();
router.post("/", authMiddleware_1.authenticate, roomControllers_1.createRoom);
router.get("/", roomControllers_1.getAllRoom);
router.patch("/:id", authMiddleware_1.authenticate, roomControllers_1.updateRoom);
router.delete("/:id", authMiddleware_1.authenticate, roomControllers_1.deleteRoom);
exports.default = router;
