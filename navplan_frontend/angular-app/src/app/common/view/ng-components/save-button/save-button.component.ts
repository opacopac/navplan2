import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ButtonColor} from '../../model/button-color';
import {MatButtonModule} from '@angular/material/button';


@Component({
    selector: 'app-save-button',
    imports: [
        MatButtonModule
    ],
    templateUrl: './save-button.component.html',
    styleUrls: ['./save-button.component.scss']
})
export class SaveButtonComponent implements OnInit {
    @Input() public isEnabled: boolean;
    @Output() public saveClicked = new EventEmitter<null>();

    protected readonly ButtonColor = ButtonColor;


    constructor() {
    }


    ngOnInit() {
    }


    protected onSaveClicked() {
        this.saveClicked.emit();
    }
}
