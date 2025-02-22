import { createFeatureSelector, createSelector } from "@ngrx/store";

import { SelectedPeopleState } from './people.reducer';

// Feature selector for the selected people state
export const selectSelectedPeopleState = createFeatureSelector<SelectedPeopleState>('selectedPeople');

// Selector to get the person marked for update
export const selectUpdatePerson = createSelector(
  selectSelectedPeopleState,
  (state) => state.updatePerson
);

// Selector to get the person marked for delete
export const selectDeletePerson = createSelector(
  selectSelectedPeopleState,
  (state) => state.deletePerson
);