import { Person } from "@models/person.model";
import { createAction, props } from "@ngrx/store";

export const setUpdatePerson = createAction('[People] Set Update Person', props<{updatePerson: Person}>())

export const setDeletePerson = createAction('[People] Set Delete Person', props<{deletePerson: Person}>())

export const removeDeletePerson = createAction('[People] Remove Delete Person')

export const removeUpdatePerson = createAction('[People] Remove Update Person')