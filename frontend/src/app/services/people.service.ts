import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

//Models
import { Person } from "../models/person.model";

import { Environment } from "@env/environment";
import { BehaviorSubject, tap } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class PeopleService {

    peopleList = new BehaviorSubject<Person[]>([]);

    url = Environment.api + '/personas';

    constructor(private http: HttpClient) { }


    getPersons() {
        return this.http.get<Person[]>(this.url)
    }

    getPerson(id: number) {
        return this.http.get<Person>(`${this.url}/${id}`);
    }

    createPerson(person: Person) {
        return this.http.post<Person>(this.url, person).pipe(
            tap((newPerson) => {
                const updatedList = [...this.peopleList.value, newPerson];
                this.peopleList.next(updatedList);
            })
        );
    }

    updatePerson(person: Person) {
        return this.http.put<Person>(`${this.url}/${person.id!}`, person).pipe(
            tap(() => {
                const updatedList = this.peopleList.value.map(updatedPerson =>
                    updatedPerson.id === person.id ? person : updatedPerson
                );
                this.peopleList.next(updatedList);
            })
        );
    }

    deletePerson(id: number) {
        return this.http.delete(`${this.url}/${id}`).pipe(
            tap(() => {
                const updatedList = this.peopleList.value.filter(person => person.id !== id);
                this.peopleList.next(updatedList);
            })
        );
    }

}