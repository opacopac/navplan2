import {Component, Input, OnInit} from '@angular/core';
import {Aircraft} from '../../../domain/model/aircraft';
import {WeightUnit} from '../../../../geo-physics/domain/model/quantities/weight-unit';
import {Speed} from '../../../../geo-physics/domain/model/quantities/speed';
import {Weight} from '../../../../geo-physics/domain/model/quantities/weight';
import {FormControl, Validators} from '@angular/forms';
import {LengthUnit} from '../../../../geo-physics/domain/model/quantities/length-unit';
import {StringnumberHelper} from '../../../../system/domain/service/stringnumber/stringnumber-helper';


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
    @Input() weightUnit: WeightUnit;
    @Input() lengthUnit: LengthUnit;

    protected mtowInput: FormControl;
    protected bewInput: FormControl;
    protected readonly Speed = Speed;
    protected readonly Weight = Weight;

    constructor() {
    }


    ngOnInit() {
        const mtowValue = this.currentAircraft.mtow
            ? StringnumberHelper.roundToDigits(this.currentAircraft.mtow.getValue(this.weightUnit), 0).toString()
            : '';
        this.mtowInput = new FormControl(mtowValue, [
            Validators.required,
            Validators.min(1),
            Validators.max(99999)
        ]);
        const bewValue = this.currentAircraft.bew
            ? StringnumberHelper.roundToDigits(this.currentAircraft.bew.getValue(this.weightUnit), 0).toString()
            : '';
        this.bewInput = new FormControl(bewValue, [
            Validators.required,
            Validators.min(1),
            Validators.max(99999)
        ]);
    }
}
