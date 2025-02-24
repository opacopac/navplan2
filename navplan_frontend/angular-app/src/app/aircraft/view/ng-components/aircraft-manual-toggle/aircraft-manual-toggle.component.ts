import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Aircraft} from '../../../domain/model/aircraft';
import {MatSlideToggleChange} from '@angular/material/slide-toggle';


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
    }


    protected getAircraftName() {
        if (this.selectedAircraft) {
            return this.selectedAircraft.registration;
        } else {
            return '(not selected)';
        }
    }


    protected onToggleChanged($event: MatSlideToggleChange) {
        if ($event.checked) {
            this.useAircraft = true;
            this.useAircraftValueChanged.emit(true);
        } else {
            this.useAircraft = false;
            this.useAircraftValueChanged.emit(false);
        }
    }
}
