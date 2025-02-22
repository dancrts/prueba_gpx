import { NgClass } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

//Models
import { Person } from '@models/person.model';

@Component({
    selector: 'people-form',
    imports: [ReactiveFormsModule, NgClass],
    templateUrl: './people-form.component.html',
    styleUrl: './people-form.component.scss'
})
export class PeopleFormComponent {

    peopleForm: FormGroup;

    @Output() formSubmit = new EventEmitter<Person>();
    @Output() formClose = new EventEmitter<void>();

    constructor() {
        this.peopleForm = new FormGroup({
            nombre: new FormControl(null, [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚ]+$/)]),
            apellido_paterno: new FormControl(null, [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚ]+$/)]),
            apellido_materno: new FormControl(null, [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚ]+$/)]),
            telefono: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]*$/), Validators.minLength(10)]),
            direccion: new FormControl(null, [Validators.required, Validators.pattern(/^[a-zA-Z0-9., áéíóúÁÉÍÓÚ]+$/)]),
        });
    }

    isFormInvalid(name: string) {
        return !this.peopleForm.get(name)!.valid && this.peopleForm.get(name)!.touched;
    }

    fieldHasError(name: string, error: string) {
        return this.peopleForm.get(name)!.hasError(error) && this.peopleForm.get(name)!.touched;
    }

    ngOnInit(): void {
        console.log("PeopleFormComponent initialized");
    }

    handleFormSubmit() {
        console.log("Form submitted");
    }

    handleFormClose() {
        this.formClose.emit();
    }

}
