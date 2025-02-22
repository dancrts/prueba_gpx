import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

//Models
import { Person } from "../models/person.model";

import { Environment } from "@env/environment";

@Injectable({
    providedIn: 'root'
})
export class PeopleService {

    url = Environment.api + '/personas';

    constructor(private http: HttpClient) { }


    getPersons() {
        return this.http.get<Person[]>(this.url);
    }

    getPerson(id: number) {
        return this.http.get<Person>(`${this.url}/${id}`);
    }

    createPerson(person: Person) {
        return this.http.post<Person>(this.url, person);
    }

    updatePerson(person: Person) {
        console.log("Updating person: ", person);
        return this.http.put<Person>(`${this.url}/${person.id!}`, person);
    }

    deletePerson(id: number) {
        return this.http.delete(`${this.url}/${id}`);
    }

}