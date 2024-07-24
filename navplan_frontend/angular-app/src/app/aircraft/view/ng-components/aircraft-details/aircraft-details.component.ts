import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Aircraft} from '../../../domain/model/aircraft';
import {FormControl, Validators} from '@angular/forms';
import {Consumption} from '../../../../geo-physics/domain/model/quantities/consumption';
import {Speed} from '../../../../geo-physics/domain/model/quantities/speed';
import {SpeedUnit} from '../../../../geo-physics/domain/model/quantities/speed-unit';
import {ConsumptionUnit} from '../../../../geo-physics/domain/model/quantities/consumption-unit';


export interface ListEntry {
    id: number;
    registration: string;
    type: string;
}


@Component({
    selector: 'app-aircraft-details',
    templateUrl: './aircraft-details.component.html',
    styleUrls: ['./aircraft-details.component.scss']
})
export class AircraftDetailsComponent implements OnInit {
    @Input() currentAircraft: Aircraft;
    @Input() speedUnit: SpeedUnit;
    @Input() consumptionUnit: ConsumptionUnit;
    @Output() onSaveAircraftClick = new EventEmitter<Aircraft>();

    protected readonly Speed = Speed;
    protected readonly Consumption = Consumption;
    protected registrationInput: FormControl;
    protected typeInput: FormControl;
    protected speedInput: FormControl;
    protected consumptionInput: FormControl;


    constructor() {
    }


    ngOnInit() {
        this.registrationInput = new FormControl(this.currentAircraft.registration, [
            Validators.required
        ]);
        this.typeInput = new FormControl(this.currentAircraft.icaoType, [
            Validators.required
        ]);
        const speedValue = this.currentAircraft.cruiseSpeed
            ? this.currentAircraft.cruiseSpeed.getValue(this.speedUnit).toString()
            : '';
        this.speedInput = new FormControl(speedValue, [
            Validators.required,
            Validators.min(1),
            Validators.max(999)
        ]);
        const consumptionValue = this.currentAircraft.cruiseFuel
            ? this.currentAircraft.cruiseFuel.getValue(this.consumptionUnit).toString()
            : '';
        this.consumptionInput = new FormControl(consumptionValue, [
            Validators.required,
            Validators.min(1),
            Validators.max(999)
        ]);
    }
}
