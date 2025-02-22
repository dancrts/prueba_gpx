import { NgClass } from '@angular/common';
import { Component, EventEmitter, input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

//Models
import { Person } from '@models/person.model';
import { Store } from '@ngrx/store';
import { selectUpdatePerson } from '@stores/people/people.selector';

@Component({
    selector: 'people-form',
    imports: [ReactiveFormsModule, NgClass],
    templateUrl: './people-form.component.html',
    styleUrl: './people-form.component.scss'
})
export class PeopleFormComponent {

    peopleForm!: FormGroup;
    selectedPerson: Person | undefined;

    isEdit = input<boolean>(false);

    @Output() formSubmit = new EventEmitter<Person>();
    @Output() formClose = new EventEmitter<void>();

    constructor(private store: Store) {
        this.initForm();
        this.initFormValues();
    }

    initForm() {
        this.peopleForm = new FormGroup({
            nombre: new FormControl(null, [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚ ]+$/)]),
            apellido_paterno: new FormControl(null, [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚ]+$/)]),
            apellido_materno: new FormControl(null, [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚ]+$/)]),
            telefono: new FormControl(null, [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(/^[0-9]+$/)]),
            direccion: new FormControl(null, [Validators.required, Validators.pattern(/^[a-zA-Z0-9., áéíóúÁÉÍÓÚ]+$/)]),
        });
    }

    initFormValues() {
        this.store.select(selectUpdatePerson).subscribe((selectedPerson) => {
            if (selectedPerson) {
                this.patchFormValues(selectedPerson);
                this.selectedPerson = selectedPerson;
            }
        });
    }   

    patchFormValues(person: Person) {
        this.peopleForm.setValue({
            nombre: person.nombre,
            apellido_paterno: person.apellido_paterno,
            apellido_materno: person.apellido_materno,
            telefono: person.telefono,
            direccion: person.direccion,
        });
    }

    isFormInvalid(name: string) {
        return !this.peopleForm.get(name)!.valid && this.peopleForm.get(name)!.touched;
    }

    fieldHasError(name: string, error: string) {
        return this.peopleForm.get(name)!.hasError(error) && this.peopleForm.get(name)!.touched;
    }

    handleFormSubmit() {
        if (!this.peopleForm.valid) {
            return;
        }

        if(this.selectedPerson) {
            const updatedPerson: Person = {
                id: this.selectedPerson.id,
                ...this.peopleForm.value
            }
            this.formSubmit.emit(updatedPerson);
        } else {
            this.formSubmit.emit(this.peopleForm.value);
        }
        this.peopleForm.reset();
    }

    handleFormClose() {
        this.peopleForm.reset();
        this.formClose.emit();
    }
}
