import { NextFunction, Request, RequestHandler, Response } from "express";
import createHttpError from "http-errors";

//Servicio
import * as PeopleService from "../services/people.service";

//Schemas
import { Person, PersonSchema } from "../schemas/person.schema";
import { DefaultIDSchema } from "../schemas/id-default.schema";

const getID = (req: Request): number => {
    const personID = DefaultIDSchema.safeParse(parseInt(req.params.id))
    if (!personID.success || !personID.data) {
        throw createHttpError(409, personID.error!.errors[0].message)
    }

    return personID.data
}

const getPersonData = (req: Request): Person => {
    const personResult = PersonSchema.safeParse(req.body)

    if (!personResult.success || !personResult.data) {
        throw createHttpError(409, personResult.error!.errors[0].message)
    }

    return personResult.data
}

export const getPeople: RequestHandler = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const people = await PeopleService.getPeople()
        res.status(200).json(people)
    } catch (error) {
        next(error)
    }
}

export const getPersonById: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const personID = getID(req)
        const person = await PeopleService.getPersonById(personID)
        res.status(200).json(person)
    } catch (error) {
        next(error)
    }
}

export const createPerson: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const personResult = getPersonData(req)
        const createdPerson = await PeopleService.createPerson(personResult)
        res.status(201).json(createdPerson)
    } catch (error) {
        next(error)
    }
}

export const updatePerson: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const personId = getID(req)
        const personResult = getPersonData(req)
        const updatedPerson = await PeopleService.updatePerson(personId, personResult)
        res.status(200).json(updatedPerson)
    } catch (error) {
        next(error)
    }
}

export const deletePerson: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const personID = getID(req)
        const result = await PeopleService.deletePerson(personID)
        res.status(204).json(result)
    } catch (error) {
        next(error)
    }
}