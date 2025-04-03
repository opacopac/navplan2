import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroupDirective} from '@angular/forms';
import { ButtonColor } from '../../model/button-color';


@Component({
    selector: 'app-save-button',
    templateUrl: './save-button.component.html',
    styleUrls: ['./save-button.component.scss']
})
export class SaveButtonComponent implements OnInit {
    @Input() public isEnabled: boolean;
    @Output() public saveClicked = new EventEmitter<null>();

    protected readonly ButtonColor = ButtonColor;


    constructor(public parentForm: FormGroupDirective) {
    }


    ngOnInit() {
    }


    protected onSaveClicked() {
        this.saveClicked.emit();
    }
}
