import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroupDirective} from '@angular/forms';
import {ButtonColor} from '../../../../../common/view/model/button-color';


@Component({
    selector: 'app-fuel-save',
    templateUrl: './fuel-save.component.html',
    styleUrls: ['./fuel-save.component.scss']
})
export class FuelSaveComponent implements OnInit {
    @Input() public isUserLoggedIn: boolean;
    @Output() public saveClicked = new EventEmitter<null>();

    protected readonly ButtonColor = ButtonColor;


    constructor(public parentForm: FormGroupDirective) {
    }

    ngOnInit() {
    }


    protected isSaveButtonEnabled(): boolean {
        return this.isUserLoggedIn && !this.parentForm.invalid;
    }


    protected onSaveClicked() {
        this.saveClicked.emit();
    }
}
