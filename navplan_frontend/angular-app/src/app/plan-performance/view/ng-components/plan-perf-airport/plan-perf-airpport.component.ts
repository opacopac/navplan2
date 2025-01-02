import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SpeedUnit} from '../../../../geo-physics/domain/model/quantities/speed-unit';
import {LengthUnit} from '../../../../geo-physics/domain/model/quantities/length-unit';
import {TemperatureUnit} from '../../../../geo-physics/domain/model/quantities/temperature-unit';
import {PressureUnit} from '../../../../geo-physics/domain/model/quantities/pressure-unit';
import {PlanPerfAirportState} from '../../../state/state-model/plan-perf-airport-state';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PlanPerfWeatherFactorsState} from '../../../state/state-model/plan-perf-weather-factors-state';
import {PlanPerfRwyFactorsState} from '../../../state/state-model/plan-perf-rwy-factors-state';

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
    @Output() public airportPerfStateChanged = new EventEmitter<PlanPerfAirportState>();

    protected airportPerformanceForm: FormGroup;


    constructor(private formBuilder: FormBuilder) {
    }


    ngOnInit() {
        this.initForm();
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



    protected onRunwayChanged() {
        if (this.airportPerformanceForm.controls['runway'].valid) {
            this.airportPerfStateChanged.emit({
                ...this.airportPerfState,
                runway: this.airportPerformanceForm.value.runway
            });
        }
    }


    protected onWeatherFactoresChanged($event: PlanPerfWeatherFactorsState) {
        this.airportPerfStateChanged.emit({
            ...this.airportPerfState,
            weatherFactors: $event
        });
    }



    protected onRunwayFactorsChanged($event: PlanPerfRwyFactorsState) {
        this.airportPerfStateChanged.emit({
            ...this.airportPerfState,
            runwayFactors: $event
        });
    }


    private initForm() {
        const firstRwy = this.airportPerfState && this.airportPerfState.airport
        && this.airportPerfState.airport.runways && this.airportPerfState.airport.runways.length > 0
            ? this.airportPerfState.airport.runways[0]
            : null;

        this.airportPerformanceForm = this.formBuilder.group({
            'runway': [firstRwy, [
                Validators.required,
            ]]
        });
    }
}
