import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'modal',
    imports: [NgClass],
    templateUrl: './modal.component.html',
    styleUrl: './modal.component.scss'
})
export class ModalComponent {
    open: boolean = false;

    closeModal() {
        this.open = !this.open;
    }

    openModal() {
        this.open = !this.open;
    }

    clickOnOutside(event: MouseEvent) {
        const targetElement = event.target as HTMLElement;
        if (targetElement.classList.contains('modal')) {
            this.closeModal();
        }
    }
}
