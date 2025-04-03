import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroupDirective} from '@angular/forms';
import {ButtonColor} from '../../../../../common/view/model/button-color';


@Component({
    selector: 'app-flightroute-save',
    templateUrl: './flightroute-save.component.html',
    styleUrls: ['./flightroute-save.component.scss']
})
export class FlightrouteSaveComponent implements OnInit {
    @Input() public isUserLoggedIn: boolean;
    @Output() public saveFlightrouteClick = new EventEmitter<null>();

    protected readonly ButtonColor = ButtonColor;


    constructor(public parentForm: FormGroupDirective) {
    }

    ngOnInit() {
    }


    protected isSaveButtonEnabled(): boolean {
        return this.isUserLoggedIn && !this.parentForm.invalid;
    }


    protected onSaveFlightrouteClick() {
        this.saveFlightrouteClick.emit();
    }
}
