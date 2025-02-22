import createHttpError from "http-errors";

import prisma from "../config/prisma.config";

import { Person } from "../schemas/person.schema";

export const createPerson = async (persona: Person) => {
    const existingPerson = await prisma.persona.findFirst({ where: { telefono: persona.telefono } })

    if (existingPerson) {
        throw createHttpError(409, "Ya existe una persona con ese número de teléfono")
    }

    return await prisma.persona.create({ data: persona })
}

export const getPeople = async () => {
    return await prisma.persona.findMany();
}

export const getPersonById = async (id: number) => {
    const existingPerson = await prisma.persona.findUnique({ where: { id } })

    if (!existingPerson) {
        throw createHttpError(404, "Persona no encontrada")
    }

    return existingPerson
}

export const updatePerson = async (id: number, persona: Person) => {
    const existingPerson = await prisma.persona.findUnique({ where: { id } })

    if (!existingPerson) {
        throw createHttpError(404, "Persona no encontrada")
    }

    const existingPhone = await prisma.persona.findFirst({
        where: { telefono: persona.telefono, NOT: { id } }
    });

    if (existingPhone) {
        throw createHttpError(409, "El teléfono ya está en uso por otra persona");
    }

    return await prisma.persona.update({ where: { id }, data: persona })
}

export const deletePerson = async (id: number) => {
    const existingPerson = await prisma.persona.findUnique({ where: { id } })

    if (!existingPerson) {
        throw createHttpError(404, "Persona no encontrada")
    }

    return await prisma.persona.delete({ where: { id } })
}