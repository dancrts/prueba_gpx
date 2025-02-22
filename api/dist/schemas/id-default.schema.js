"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultIDSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.DefaultIDSchema = zod_1.default.number({
    required_error: "El parametro ID es requerido",
    invalid_type_error: "El parametro ID debe de ser un numero",
}).int();
