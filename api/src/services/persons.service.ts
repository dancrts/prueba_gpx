import createHttpError from "http-errors";

import prisma from "../config/prisma.config";

import { Persona } from "../schemas/person.schema";

export const crearPersona = async (persona: Persona) => {
    const personaExistente = await prisma.persona.findFirst({ where: { telefono: persona.telefono } })

    if (personaExistente) {
        throw createHttpError(400, "Ya existe una persona con ese número de teléfono")
    }

    return await prisma.persona.create({ data: persona })
}

export const obtenerPersonas = async () => {
    return await prisma.persona.findMany();
}

export const obtenerPersonaPorId = async (id: number) => {
    const personaExistente = await prisma.persona.findUnique({ where: { id } })

    if (!personaExistente) {
        throw createHttpError(404, "Persona no encontrada")
    }

    return personaExistente
}

export const actualizarPersona = async (id: number, persona: Persona) => {
    const personaExistente = await prisma.persona.findUnique({ where: { id } })

    if (!personaExistente) {
        throw createHttpError(404, "Persona no encontrada")
    }

    return await prisma.persona.update({ where: { id }, data: persona })
}

export const eliminarPersona = async (id: number) => {
    const personaExistente = await prisma.persona.findUnique({ where: { id } })

    if (!personaExistente) {
        throw createHttpError(404, "Persona no encontrada")
    }

    return await prisma.persona.delete({ where: { id } })
}