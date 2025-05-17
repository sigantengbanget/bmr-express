"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const authRoutes_1 = __importDefault(require("./route/authRoutes"));
const bookingRoutes_1 = __importDefault(require("./route/bookingRoutes"));
const roomRoutes_1 = __importDefault(require("./route/roomRoutes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get("/ping", (req, res) => {
    res.send("pong");
});
app.use('/api/auth', authRoutes_1.default);
app.use('/api/booking', bookingRoutes_1.default);
app.use('/api/room', roomRoutes_1.default);
exports.default = app;
