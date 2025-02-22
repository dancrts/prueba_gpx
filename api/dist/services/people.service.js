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
exports.deletePerson = exports.updatePerson = exports.getPersonById = exports.getPeople = exports.createPerson = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const prisma_config_1 = __importDefault(require("../config/prisma.config"));
const createPerson = (persona) => __awaiter(void 0, void 0, void 0, function* () {
    const existingPerson = yield prisma_config_1.default.persona.findFirst({ where: { telefono: persona.telefono } });
    if (existingPerson) {
        throw (0, http_errors_1.default)(409, "Ya existe una persona con ese número de teléfono");
    }
    return yield prisma_config_1.default.persona.create({ data: persona });
});
exports.createPerson = createPerson;
const getPeople = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_config_1.default.persona.findMany();
});
exports.getPeople = getPeople;
const getPersonById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const existingPerson = yield prisma_config_1.default.persona.findUnique({ where: { id } });
    if (!existingPerson) {
        throw (0, http_errors_1.default)(404, "Persona no encontrada");
    }
    return existingPerson;
});
exports.getPersonById = getPersonById;
const updatePerson = (id, persona) => __awaiter(void 0, void 0, void 0, function* () {
    const existingPerson = yield prisma_config_1.default.persona.findUnique({ where: { id } });
    if (!existingPerson) {
        throw (0, http_errors_1.default)(404, "Persona no encontrada");
    }
    const existingPhone = yield prisma_config_1.default.persona.findFirst({
        where: { telefono: persona.telefono, NOT: { id } }
    });
    if (existingPhone) {
        throw (0, http_errors_1.default)(409, "El teléfono ya está en uso por otra persona");
    }
    return yield prisma_config_1.default.persona.update({ where: { id }, data: persona });
});
exports.updatePerson = updatePerson;
const deletePerson = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const existingPerson = yield prisma_config_1.default.persona.findUnique({ where: { id } });
    if (!existingPerson) {
        throw (0, http_errors_1.default)(404, "Persona no encontrada");
    }
    return yield prisma_config_1.default.persona.delete({ where: { id } });
});
exports.deletePerson = deletePerson;
