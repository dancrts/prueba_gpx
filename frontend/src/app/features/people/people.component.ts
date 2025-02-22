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

    isModalOpen: boolean = false;

    constructor(private personService: PeopleService) { }

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
