import { ActionReducerMap } from "@ngrx/store";

import { selectedPeopleReducer, SelectedPeopleState } from "./people/people.reducer";

export interface State {
    selectedPeople: SelectedPeopleState;   
}

export const reducers: ActionReducerMap<State> = {
    selectedPeople: selectedPeopleReducer,
}