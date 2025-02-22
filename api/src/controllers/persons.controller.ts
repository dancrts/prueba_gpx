import { NextFunction, Request, RequestHandler, Response } from "express";
import createHttpError from "http-errors";

//Servicio
import * as PersonasService from "../services/persons.service";

//Schemas
import { Persona, PersonaSchema } from "../schemas/person.schema";
import { DefaultIDSchema } from "../schemas/id-default.schema";

const obtenerID = (req: Request): number => {
    const personaId = DefaultIDSchema.safeParse(parseInt(req.params.id))
    if (!personaId.success || !personaId.data) {
        throw createHttpError(400, personaId.error!.errors[0].message)
    }

    return personaId.data
}

const obtenerDataPersona = (req: Request): Persona => {
    const resultadoPersona = PersonaSchema.safeParse(req.body)

    if (!resultadoPersona.success || !resultadoPersona.data) {
        throw createHttpError(400, resultadoPersona.error!.errors[0].message)
    }

    return resultadoPersona.data
}

export const obtenerPersonas: RequestHandler = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const personas = await PersonasService.obtenerPersonas()
        res.status(200).json(personas)
    } catch (error) {
        next(error)
    }
}

export const obtenerPersonaPorID: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const personaId = obtenerID(req)
        const persona = await PersonasService.obtenerPersonaPorId(personaId)
        res.status(200).json(persona)
    } catch (error) {
        next(error)
    }
}

export const crearPersona: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const resultadoPersona = obtenerDataPersona(req)
        const personaCreada = await PersonasService.crearPersona(resultadoPersona)
        res.status(201).json(personaCreada)
    } catch (error) {
        next(error)
    }
}

export const actualizarPersona: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const personaId = obtenerID(req)
        const resultadoPersona = obtenerDataPersona(req)
        const personaActualizada = await PersonasService.actualizarPersona(personaId, resultadoPersona)
        res.status(200).json(personaActualizada)
    } catch (error) {
        next(error)
    }
}

export const borrarPersona: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const personaId = obtenerID(req)
        const resultado = await PersonasService.eliminarPersona(personaId)
        res.status(204).json(resultado)
    } catch (error) {
        next(error)
    }
}