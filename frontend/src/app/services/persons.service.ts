import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

//Models
import { Person } from "../models/person.model";

@Injectable({
    providedIn: 'root'
})
export class PersonsService {

    url = 'http://localhost:3005/api/v1/personas';

    constructor(private http: HttpClient) { }


    getPersons() {
        return this.http.get<Person[]>(this.url);
    }

    getPerson(id: string) {
        return this.http.get<Person>(`${this.url}/${id}`);
    }

    createPerson(person: Person) {
        return this.http.post<Person>(this.url, person);
    }

    updatePerson(person: Person) {
        return this.http.put<Person>(`${this.url}/${person.id}`, person);
    }

    deletePerson(id: string) {
        return this.http.delete(`${this.url}/${id}`);
    }

}