import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Person } from '@models/person.model';
import { PeopleService } from '@services/people.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'people-list',
    imports: [],
    templateUrl: './people-list.component.html',
    styleUrl: './people-list.component.scss'
})
export class PeopleListComponent implements OnInit, OnDestroy {

    existingPersons: Person[] = [];

    peopleSubscription!: Subscription;

    @Output() deletePerson = new EventEmitter<Person>();
    @Output() updatePerson = new EventEmitter<Person>();

    constructor(private people: PeopleService) { }

    ngOnInit(): void {
        this.getAllPersons();
    }

    ngOnDestroy(): void {
        this.peopleSubscription.unsubscribe();
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
                this.people.peopleList.next(data);
            },
            error: (error) => {
                
            }
        });;
        this.peopleSubscription = this.people.peopleList.subscribe((persons) => {
            this.existingPersons = persons;            
        });
    }
}
