import { Component, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';

//Components
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';

//Services
import { PersonsService } from '../services/persons.service';

//Models
import { Person } from '../models/person.model';

@Component({
    selector: 'app-persons',
    imports: [ListComponent, FormComponent, NgClass],
    templateUrl: './persons.component.html',
    styleUrl: './persons.component.scss'
})
export class PersonsComponent implements OnInit {

    isModalOpen: boolean = false;

    constructor(private personService: PersonsService) { }

    ngOnInit(): void {

    }


    closeModal() {
        this.isModalOpen = false;
    }

    openModal() {
        this.isModalOpen = true;
    }

    clickOnOutside(event: MouseEvent) {
        const targetElement = event.target as HTMLElement;
        if (targetElement.classList.contains('modal')) {
            this.closeModal();
        }
    }

}
