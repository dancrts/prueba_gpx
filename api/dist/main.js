"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
//app
const app_1 = __importDefault(require("./app"));
const PORT = parseInt(process.env.PORT || '7000');
const run = () => {
    try {
        app_1.default.listen(PORT, () => {
            console.info('Server is running on port ' + PORT);
        });
    }
    catch (error) {
        console.error(`Error al inicializar el servidor: ${error}`);
    }
};
run();
