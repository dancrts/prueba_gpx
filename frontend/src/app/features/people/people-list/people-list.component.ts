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

    @Output() deletePerson = new EventEmitter<Person>();
    @Output() updatePerson = new EventEmitter<Person>();

    constructor(private people: PeopleService) { }

    ngOnInit(): void {
        this.getAllPersons();
    }

    emitDelete(person: Person) {
        this.deletePerson.emit(person);
    }

    emitUpdate(person: Person) {
        this.updatePerson.emit(person);
    }

    getAllPersons() {
        this.people.getPersons().subscribe({
            next: (data) => {
                this.existingPersons = data;
            },
            error: (error) => {
                console.log(error);
            }
        });
    }
}
