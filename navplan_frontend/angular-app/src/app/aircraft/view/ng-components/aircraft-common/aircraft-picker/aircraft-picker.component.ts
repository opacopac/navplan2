import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Aircraft} from '../../../../domain/model/aircraft';
import {ButtonColor} from '../../../../../common/view/model/button-color';


@Component({
    selector: 'app-aircraft-picker',
    templateUrl: './aircraft-picker.component.html',
    styleUrls: ['./aircraft-picker.component.scss']
})
export class AircraftPickerComponent implements OnInit {
    @Input() currentAircraft: Aircraft;
    @Input() labelText: string;
    @Input() showIcon: boolean;
    @Input() showRegistration: boolean;
    @Output() pickAircraftClicked = new EventEmitter<void>();

    protected readonly ButtonColor = ButtonColor;


    constructor() {
    }


    ngOnInit() {
    }
}
