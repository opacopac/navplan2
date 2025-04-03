import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SpeedUnit} from '../../../../../geo-physics/domain/model/quantities/speed-unit';
import {LengthUnit} from '../../../../../geo-physics/domain/model/quantities/length-unit';
import {TemperatureUnit} from '../../../../../geo-physics/domain/model/quantities/temperature-unit';
import {PressureUnit} from '../../../../../geo-physics/domain/model/quantities/pressure-unit';
import {PlanPerfAirportState} from '../../../state/state-model/plan-perf-airport-state';
import {PlanPerfWeatherFactorsState} from '../../../state/state-model/plan-perf-weather-factors-state';
import {PlanPerfRwyFactorsState} from '../../../state/state-model/plan-perf-rwy-factors-state';
import {AirportRunway} from '../../../../../aerodrome/domain/model/airport-runway';
import {PlanPerfAirportType} from '../../../state/state-model/plan-perf-airport-type';
import {Length} from '../../../../../geo-physics/domain/model/quantities/length';

@Component({
    selector: 'app-plan-perf-airport',
    templateUrl: './plan-perf-airpport.component.html',
    styleUrls: ['./plan-perf-airpport.component.scss']
})
export class PlanPerfAirpportComponent implements OnInit {
    @Input() public airportPerfState: PlanPerfAirportState;
    @Input() public isAlternate: boolean;
    @Input() public pressureUnit: PressureUnit;
    @Input() public speedUnit: SpeedUnit;
    @Input() public performanceDistanceUnit: LengthUnit;
    @Input() public altitudeUnit: LengthUnit;
    @Input() public temperatureUnit: TemperatureUnit;
    @Output() public runwayChanged = new EventEmitter<AirportRunway>();
    @Output() public weatherFactorsChanged = new EventEmitter<PlanPerfWeatherFactorsState>();
    @Output() public runwayFactorsChanged = new EventEmitter<PlanPerfRwyFactorsState>();

    protected readonly Length = Length;


    ngOnInit() {
    }


    protected isDepartureAd(): boolean {
        return this.airportPerfState.type === PlanPerfAirportType.DEPARTURE;
    }


    protected getTitleIconClass(): string {
        return this.isDepartureAd() ? 'fas fa-plane-departure' : 'fas fa-plane-arrival';
    }


    protected getTitleText(): string {
        let airportName = this.airportPerfState.airport.name;
        if (this.airportPerfState.airport.icao) {
            airportName += ' (' + this.airportPerfState.airport.icao + ')';
        }

        if (this.airportPerfState.type === PlanPerfAirportType.DEPARTURE) {
            return 'Take Off Performance ' + airportName;
        } else if (this.airportPerfState.type === PlanPerfAirportType.DESTINATION) {
            return 'Landing Performance ' + airportName;
        } else {
            return 'Alternate Landing Performance ' + airportName;
        }
    }


    protected onWeatherFactoresChanged($event: PlanPerfWeatherFactorsState) {
        this.weatherFactorsChanged.emit($event);
    }


    protected onRunwayFactorsChanged($event: PlanPerfRwyFactorsState) {
        this.runwayFactorsChanged.emit($event);
    }
}
