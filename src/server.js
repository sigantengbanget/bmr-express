"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
// app.listen(config.port, () => {
//   console.log(`Server running on port ${config.port}`);
// });
app_1.default.get(`/`, (req, res) => {
    res.send('Welcome to the BMR Server');
});
exports.default = app_1.default;
