"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const http_errors_1 = __importStar(require("http-errors"));
const express_1 = __importDefault(require("express"));
//routes
const people_routes_1 = __importDefault(require("./routes/people.routes"));
//Express
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
//Routes
app.use("/api/v1/personas", people_routes_1.default);
//Errores
app.use((req, res, next) => {
    next((0, http_errors_1.default)(404, "Endpoint no encontrado"));
});
app.use((error, req, res, next) => {
    console.log(error);
    let errorMessage = "Ha ocurrido un error";
    let statusCode = 500;
    if ((0, http_errors_1.isHttpError)(error)) {
        errorMessage = error.message;
        statusCode = error.statusCode;
    }
    res.status(statusCode).json({ error: errorMessage });
});
exports.default = app;
