import {Component, Input, OnInit} from '@angular/core';
import {SpeedUnit} from '../../../../geo-physics/domain/model/quantities/speed-unit';
import {LengthUnit} from '../../../../geo-physics/domain/model/quantities/length-unit';
import {TemperatureUnit} from '../../../../geo-physics/domain/model/quantities/temperature-unit';
import {PressureUnit} from '../../../../geo-physics/domain/model/quantities/pressure-unit';
import {PlanPerfAirportState} from '../../../state/state-model/plan-perf-airport-state';

@Component({
    selector: 'app-plan-perf-airport',
    templateUrl: './plan-perf-airpport.component.html',
    styleUrls: ['./plan-perf-airpport.component.scss']
})
export class PlanPerfAirpportComponent implements OnInit {
    @Input() public airportPerfState: PlanPerfAirportState;
    @Input() public isDepartureAirport: boolean;
    @Input() public isAlternate: boolean;
    @Input() public pressureUnit: PressureUnit;
    @Input() public speedUnit: SpeedUnit;
    @Input() public performanceDistanceUnit: LengthUnit;
    @Input() public altitudeUnit: LengthUnit;
    @Input() public temperatureUnit: TemperatureUnit;


    constructor() {
    }


    ngOnInit() {
    }


    protected getTitleIconClass(): string {
        return this.isDepartureAirport ? 'fas fa-plane-departure' : 'fas fa-plane-arrival';
    }


    protected getTitleText(): string {
        let airportName = this.airportPerfState.airport.name;
        if (this.airportPerfState.airport.icao) {
            airportName += ' (' + this.airportPerfState.airport.icao + ')';
        }

        if (this.isDepartureAirport) {
            return 'Take Off Performance ' + airportName;
        } else if (!this.isAlternate) {
            return 'Landing Performance ' + airportName;
        } else {
            return 'Alternate Landing Performance ' + airportName;
        }
    }


    protected getElevationString() {
        return 'ELEV ' + this.airportPerfState.airport.elevation.getHeightAmsl().getValueAndUnit(this.altitudeUnit, 0);
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
