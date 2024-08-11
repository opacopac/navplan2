import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Aircraft} from '../../../../../aircraft/domain/model/aircraft';


@Component({
    selector: 'app-toggle-manual-aircraft',
    templateUrl: './toggle-manual-aircraft.component.html',
    styleUrls: ['./toggle-manual-aircraft.component.scss']
})
export class ToggleManualAircraft implements OnInit {
    @Input() public selectedAircraft: Aircraft;
    @Input() public useAircraft: boolean;
    @Output() public useAircraftValueChanged = new EventEmitter<boolean>();


    constructor() {
    }


    ngOnInit() {
        if (this.selectedAircraft) {
            this.useAircraft = true;
        }
    }


    protected onUseAircraftClicked() {
        this.useAircraft = true;
        this.useAircraftValueChanged.emit(true);
    }


    protected onEditManualClicked() {
        this.useAircraft = false;
        this.useAircraftValueChanged.emit(false);
    }

    protected getAircraftName() {
        if (this.selectedAircraft) {
            return this.selectedAircraft.registration;
        } else {
            return '(not selected)';
        }
    }
}
