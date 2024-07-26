import {Component, Input, OnInit} from '@angular/core';
import {Aircraft} from '../../../domain/model/aircraft';
import {SpeedUnit} from '../../../../geo-physics/domain/model/quantities/speed-unit';
import {WeightUnit} from '../../../../geo-physics/domain/model/quantities/weight-unit';


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


    constructor() {
    }


    ngOnInit() {
    }
}
