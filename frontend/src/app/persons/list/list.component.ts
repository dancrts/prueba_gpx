import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Person } from '../../models/person.model';
import { PersonsService } from '../../services/persons.service';

@Component({
    selector: 'app-list',
    imports: [],
    templateUrl: './list.component.html',
    styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {

    existingPersons: Person[] = [];

    @Output() eliminarPersona = new EventEmitter<Person>();
    @Output() editarPersona = new EventEmitter<Person>();

    constructor(private personService: PersonsService) { }

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
