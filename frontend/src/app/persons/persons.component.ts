import { Component } from '@angular/core';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';

@Component({
    selector: 'app-persons',
    imports: [ListComponent, FormComponent],
    templateUrl: './persons.component.html',
    styleUrl: './persons.component.scss'
})
export class PersonsComponent {

}
