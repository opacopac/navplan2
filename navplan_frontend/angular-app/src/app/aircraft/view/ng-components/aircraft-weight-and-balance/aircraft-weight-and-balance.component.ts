import {Component, Input, OnInit} from '@angular/core';
import {Aircraft} from '../../../domain/model/aircraft';
import {SpeedUnit} from '../../../../geo-physics/domain/model/quantities/speed-unit';
import {WeightUnit} from '../../../../geo-physics/domain/model/quantities/weight-unit';
import {Speed} from '../../../../geo-physics/domain/model/quantities/speed';
import {Weight} from '../../../../geo-physics/domain/model/quantities/weight';
import {FormControl, Validators} from '@angular/forms';


export interface ListEntry {
    id: number;
    registration: string;
    type: string;
}


@Component({
    selector: 'app-aircraft-weight-and-balance',
    templateUrl: './aircraft-weight-and-balance.component.html',
    styleUrls: ['./aircraft-weight-and-balance.component.scss']
})
export class AircraftWeightAndBalanceComponent implements OnInit {
    @Input() currentAircraft: Aircraft;
    @Input() speedUnit: SpeedUnit;
    @Input() weightUnit: WeightUnit;

    protected mtowInput: FormControl;
    protected bewInput: FormControl;
    protected readonly Speed = Speed;
    protected readonly Weight = Weight;

    constructor() {
    }


    ngOnInit() {
        const mtowValue = this.currentAircraft.mtow
            ? this.currentAircraft.mtow.getValue(this.weightUnit).toString()
            : '';
        this.mtowInput = new FormControl(mtowValue, [
            Validators.required,
            Validators.min(1),
            Validators.max(99999)
        ]);
        const bewValue = this.currentAircraft.bew
            ? this.currentAircraft.bew.getValue(this.weightUnit).toString()
            : '';
        this.bewInput = new FormControl(bewValue, [
            Validators.required,
            Validators.min(1),
            Validators.max(99999)
        ]);
    }
}
