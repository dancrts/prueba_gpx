import { createReducer, on } from "@ngrx/store"

import { Person } from "@models/person.model"
import { setUpdatePerson, setDeletePerson, removeDeletePerson, removeUpdatePerson } from "./people.actions";

export interface SelectedPeopleState {
    deletePerson?: Person ;
    updatePerson?: Person;
}

export const initialState: SelectedPeopleState = {
    deletePerson: undefined,
    updatePerson: undefined
}

export const selectedPeopleReducer = createReducer(
    initialState,
    on(setUpdatePerson, (state, action) => {
        state = {
            updatePerson: action.updatePerson
        }
        return state;
    }),
    on(setDeletePerson, (state, action) => {
        state = {
            deletePerson: action.deletePerson
        }
        return state;
    }),
    on(removeDeletePerson, (state) => {
        state = {
            deletePerson: undefined
        }
        return state;
    }),
    on(removeUpdatePerson, (state) => {
        state = {
            updatePerson: undefined
        }
        return state;
    })
)