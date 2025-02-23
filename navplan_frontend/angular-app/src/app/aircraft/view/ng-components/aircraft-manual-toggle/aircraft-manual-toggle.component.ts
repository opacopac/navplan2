import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Aircraft} from '../../../domain/model/aircraft';


@Component({
    selector: 'app-aircraft-manual-toggle',
    templateUrl: './aircraft-manual-toggle.component.html',
    styleUrls: ['./aircraft-manual-toggle.component.scss']
})
export class AircraftManualToggle implements OnInit {
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
