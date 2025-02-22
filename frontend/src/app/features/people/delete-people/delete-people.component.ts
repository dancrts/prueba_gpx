import { Component, EventEmitter, Output, signal } from '@angular/core';
import { Person } from '@models/person.model';
import { Store } from '@ngrx/store';
import { selectDeletePerson } from '@stores/people/people.selector';


@Component({
  selector: 'delete-people',
  imports: [],
  templateUrl: './delete-people.component.html',
  styleUrl: './delete-people.component.scss'
})
export class DeletePeopleComponent {

    selectedPerson = signal<Person | undefined>(undefined)

    @Output() deletePerson = new EventEmitter<Person>();
    @Output() cancelDelete = new EventEmitter<void>();

    constructor(private store: Store) {
        this.store.select(selectDeletePerson).subscribe((selectedPeople) => {
            this.selectedPerson.set(selectedPeople);
        });
    }

    get selectedPersonText(): string {
        const person = this.selectedPerson();
        return person ? `${person.nombre} ${person.apellido_paterno}` : 'esta persona';
    }

    handleDelete() {
        this.deletePerson.emit(this.selectedPerson());
    }

    handleCancelDelete() {
        this.cancelDelete.emit();
    }
}
