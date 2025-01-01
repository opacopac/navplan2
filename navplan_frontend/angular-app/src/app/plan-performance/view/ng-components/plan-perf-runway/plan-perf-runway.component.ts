import {Component, Input, OnInit} from '@angular/core';
import {Airport} from '../../../../aerodrome/domain/model/airport';
import {SpeedUnit} from '../../../../geo-physics/domain/model/quantities/speed-unit';
import {LengthUnit} from '../../../../geo-physics/domain/model/quantities/length-unit';
import {TemperatureUnit} from '../../../../geo-physics/domain/model/quantities/temperature-unit';

@Component({
    selector: 'app-plan-perf-runway',
    templateUrl: './plan-perf-runway.component.html',
    styleUrls: ['./plan-perf-runway.component.scss']
})
export class PlanPerfRunwayComponent implements OnInit {
    @Input() public airport: Airport;
    @Input() public isDeparture: boolean;
    @Input() public speedUnit: SpeedUnit;
    @Input() public performanceDistanceUnit: LengthUnit;
    @Input() public altitudeUnit: LengthUnit;
    @Input() public temperatureUnit: TemperatureUnit;


    constructor() {
    }


    ngOnInit() {
    }


    protected getTitleIconClass(): string {
        return this.isDeparture ? 'fas fa-plane-departure' : 'fas fa-plane-arrival';
    }


    protected getTitleText(): string {
        const airportName = 'BERN-BELP (LSZB)'; // TODO

        return this.isDeparture
            ? 'Take Off Performance ' + airportName
            : 'Landing Performance ' + airportName;
    }


    protected onWetRwyChanged() {
        // TODO
    }


    protected onGrassRwyChanged() {
        // TODO
    }


    protected onRwySlopeChanged() {
        // TODO
    }


    protected onRwyWindChanged() {
        // TODO
    }


    protected onReserveChanged() {
        // TODO
    }
}
