import {Component, Input, OnInit} from '@angular/core';
import {Aircraft} from '../../../domain/model/aircraft';
import {SpeedUnit} from '../../../../geo-physics/domain/model/quantities/speed-unit';
import {WeightUnit} from '../../../../geo-physics/domain/model/quantities/weight-unit';


@Component({
    selector: 'app-aircraft-performance',
    templateUrl: './aircraft-performance.component.html',
    styleUrls: ['./aircraft-performance.component.scss']
})
export class AircraftPerformanceComponent implements OnInit {
    @Input() currentAircraft: Aircraft;
    @Input() speedUnit: SpeedUnit;
    @Input() weightUnit: WeightUnit;


    constructor() {
    }


    ngOnInit() {
    }
}
