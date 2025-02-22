import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Person } from '@models/person.model';
import { PeopleService } from '@services/people.service';

@Component({
    selector: 'people-list',
    imports: [],
    templateUrl: './people-list.component.html',
    styleUrl: './people-list.component.scss'
})
export class PeopleListComponent implements OnInit {

    existingPersons: Person[] = [];

    @Output() eliminarPersona = new EventEmitter<Person>();
    @Output() editarPersona = new EventEmitter<Person>();

    constructor(private personService: PeopleService) { }

    ngOnInit(): void {
        this.getAllPersons();
    }

    getAllPersons() {
        this.personService.getPersons().subscribe({
            next: (data) => {
                this.existingPersons = data;
            },
            error: (error) => {
                console.log(error);
            }
        });
    }
}
