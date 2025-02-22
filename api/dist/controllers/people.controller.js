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
exports.deletePerson = exports.updatePerson = exports.createPerson = exports.getPersonById = exports.getPeople = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
//Servicio
const PeopleService = __importStar(require("../services/people.service"));
//Schemas
const person_schema_1 = require("../schemas/person.schema");
const id_default_schema_1 = require("../schemas/id-default.schema");
const getID = (req) => {
    const personID = id_default_schema_1.DefaultIDSchema.safeParse(parseInt(req.params.id));
    if (!personID.success || !personID.data) {
        throw (0, http_errors_1.default)(409, personID.error.errors[0].message);
    }
    return personID.data;
};
const getPersonData = (req) => {
    const personResult = person_schema_1.PersonSchema.safeParse(req.body);
    if (!personResult.success || !personResult.data) {
        throw (0, http_errors_1.default)(409, personResult.error.errors[0].message);
    }
    return personResult.data;
};
const getPeople = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const people = yield PeopleService.getPeople();
        res.status(200).json(people);
    }
    catch (error) {
        next(error);
    }
});
exports.getPeople = getPeople;
const getPersonById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const personID = getID(req);
        const person = yield PeopleService.getPersonById(personID);
        res.status(200).json(person);
    }
    catch (error) {
        next(error);
    }
});
exports.getPersonById = getPersonById;
const createPerson = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const personResult = getPersonData(req);
        const createdPerson = yield PeopleService.createPerson(personResult);
        res.status(201).json(createdPerson);
    }
    catch (error) {
        next(error);
    }
});
exports.createPerson = createPerson;
const updatePerson = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const personId = getID(req);
        const personResult = getPersonData(req);
        const updatedPerson = yield PeopleService.updatePerson(personId, personResult);
        res.status(200).json(updatedPerson);
    }
    catch (error) {
        next(error);
    }
});
exports.updatePerson = updatePerson;
const deletePerson = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const personID = getID(req);
        const result = yield PeopleService.deletePerson(personID);
        res.status(204).json(result);
    }
    catch (error) {
        next(error);
    }
});
exports.deletePerson = deletePerson;
