import { Component } from '@angular/core';
import { NgClass } from '@angular/common';

//Ngrx
import { Store } from '@ngrx/store';

//Stores
import { setDeletePerson, setUpdatePerson, removeDeletePerson, removeUpdatePerson } from '@stores/people/people.actions';


//Components
import { PeopleListComponent } from './people-list/people-list.component';
import { PeopleFormComponent } from './people-form/people-form.component';

//Services
import { PeopleService } from '@services/people.service';

//Models
import { Person } from '@models/person.model';
import { DeletePeopleComponent } from './delete-people/delete-people.component';

@Component({
    selector: 'people',
    imports: [PeopleListComponent, PeopleFormComponent, DeletePeopleComponent, NgClass],
    templateUrl: './people.component.html',
    styleUrl: './people.component.scss'
})
export class PeopleComponent {

    isDeleteModalOpen: boolean = false;
    isFormModalOpen: boolean = false;
    editMode: boolean = false;

    constructor(private peopleService: PeopleService, private store: Store) { }

    handleUpdate(person: Person) {
        this.editMode = true;
        this.store.dispatch(setUpdatePerson({ updatePerson: person }));
        this.openFormModal();
    }

    handleDelete(person: Person) {
        this.store.dispatch(setDeletePerson({ deletePerson: person }));
        this.openDeleteModal();
    }

    savePerson(person: Person) {
        if (this.editMode) {
            this.editPerson(person);
        } else {
            this.createPerson(person);
        }

        this.closeFormModal();
    }

    editPerson(person: Person) {
        this.peopleService.updatePerson(person).subscribe({
            next: (data) => {
                this.store.dispatch(removeUpdatePerson());
            },
            error: (error) => {
                console.log(error);
            }
        });
    }

    createPerson(person: Person) {
        this.peopleService.createPerson(person).subscribe({
            next: (data) => {
                //add notification service lul
            },
            error: (error) => {
                console.log(error);
            }
        });
    }

    deletePerson(person: Person) {
        this.peopleService.deletePerson(person.id!).subscribe({
            next: (data) => {
                this.closeDeleteModal();
                this.store.dispatch(removeDeletePerson());
            },
            error: (error) => {
                console.log(error);
            }
        })
    }

    openFormModal() {
        this.isFormModalOpen = true;
    }

    closeFormModal() {
        this.editMode = false;
        this.isFormModalOpen = false;
    }

    openDeleteModal() {
        this.isDeleteModalOpen = true;
    }

    closeDeleteModal() {
        this.isDeleteModalOpen = false;
    }
}
