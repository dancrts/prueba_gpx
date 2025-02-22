import { Component, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';

//Components
import { PeopleListComponent } from './people-list/people-list.component';
import { PeopleFormComponent } from './people-form/people-form.component';

//Services
import { PeopleService } from '@services/people.service';

//Models
import { Person } from '@models/person.model';

@Component({
    selector: 'people',
    imports: [PeopleListComponent, PeopleFormComponent, NgClass],
    templateUrl: './people.component.html',
    styleUrl: './people.component.scss'
})
export class PeopleComponent implements OnInit {

    isDeleteModalOpen: boolean = false;
    isFormModalOpen: boolean = false;

    constructor(private personService: PeopleService) { }

    ngOnInit(): void {

    }

    handleUpdate(person: Person) {
        console.log("Update person: ", person);
        this.openFormModal();
    }

    handleDelete(person: Person) {
        console.log("Delete person: ", person);
        this.openDeleteModal();
    }

    openFormModal() {
        this.isFormModalOpen = true;
    }

    closeFormModal() {
        this.isFormModalOpen = false;
    }

    openDeleteModal() {
        this.isDeleteModalOpen = true;
    }

    closeDeleteModal() {
        this.isDeleteModalOpen = false;
    }

    handleFormOutsideClick(event: MouseEvent) {
        const targetElement = event.target as HTMLElement;
        if (targetElement.classList.contains('modal')) {
            this.closeFormModal();
        }
    }

    handleDeleteOutsideClick(event: MouseEvent) {
        const targetElement = event.target as HTMLElement;
        if (targetElement.classList.contains('modal')) {
            this.closeDeleteModal();
        }
    }

}
