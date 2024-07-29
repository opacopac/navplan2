import {Component, Input, OnInit} from '@angular/core';
import {Aircraft} from '../../../domain/model/aircraft';
import {SpeedUnit} from '../../../../geo-physics/domain/model/quantities/speed-unit';
import {WeightUnit} from '../../../../geo-physics/domain/model/quantities/weight-unit';
import {TemperatureUnit} from '../../../../geo-physics/domain/model/quantities/temperature-unit';
import {LengthUnit} from '../../../../geo-physics/domain/model/quantities/length-unit';


@Component({
    selector: 'app-aircraft-performance',
    templateUrl: './aircraft-performance.component.html',
    styleUrls: ['./aircraft-performance.component.scss']
})
export class AircraftPerformanceComponent implements OnInit {
    @Input() currentAircraft: Aircraft;
    @Input() speedUnit: SpeedUnit;
    @Input() weightUnit: WeightUnit;
    @Input() temperatureUnit: TemperatureUnit;
    @Input() distanceUnit: LengthUnit;
    @Input() altitudeUnit: LengthUnit;


    constructor() {
    }


    ngOnInit() {
    }
}
