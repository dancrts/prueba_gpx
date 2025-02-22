"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.PersonSchema = zod_1.default.object({
    nombre: zod_1.default.string({
        required_error: "Es necesario un nombre",
    }).regex(/^[a-zA-ZáéíóúÁÉÍÓÚ ]+$/, "Solo se admiten letras y/o espacios en el nombre!"),
    apellido_materno: zod_1.default.string({
        required_error: "Es necesario un apellido materno",
    }).regex(/^[a-zA-ZáéíóúÁÉÍÓÚ]+$/, "Solo se admiten letras en el apellido materno!"),
    apellido_paterno: zod_1.default.string({
        required_error: "Es necesario un apellido paterno",
    }).regex(/^[a-zA-ZáéíóúÁÉÍÓÚ]+$/, "Solo se admiten letras en el apellido paterno!"),
    telefono: zod_1.default.string({
        required_error: "Es necesario un telefono",
        invalid_type_error: "El telefono debe de contener solo numeros!",
    }).regex(/^[0-9]+$/).length(10, "El telefono debe de tener 10 digitos!"),
    direccion: zod_1.default.string({
        required_error: "Es necesaria una dirección"
    }).regex(/^[a-zA-Z0-9., áéíóúÁÉÍÓÚ]+$/, "La direccion debe de contener solo letras, numeros, espacios y puntos!")
});
