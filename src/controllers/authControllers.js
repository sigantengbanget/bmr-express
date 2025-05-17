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
exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = __importDefault(require("../utils/prisma"));
const generateToken = (user) => {
    return jsonwebtoken_1.default.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
};
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, role } = req.body;
    const existingUser = yield prisma_1.default.user.findUnique({ where: { email } });
    if (existingUser)
        res.status(400).json({ message: "Email sudah terdaftar" });
    console.log("email", email);
    const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
    const user = yield prisma_1.default.user.create({
        data: {
            email,
            password: hashedPassword,
            role: role || "USER",
        },
    });
    const token = generateToken(user);
    res.status(201).json({
        message: "Registrasi berhasil",
        token,
        user: {
            id: user.id,
            email: user.email,
            role: user.role,
        },
    });
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield prisma_1.default.user.findUnique({ where: { email } });
    if (!user)
        res.status(404).json({ message: "User tidak ditemukan" });
    const isMatch = yield bcryptjs_1.default.compare(password, user.password);
    if (!isMatch)
        res.status(400).json({ message: "Password salah" });
    const token = generateToken(user);
    res.json({
        message: "Login berhasil",
        token,
        user: {
            id: user.id,
            email: user.email,
            role: user.role,
        },
    });
});
exports.login = login;
