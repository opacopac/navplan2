import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {getFlightroute} from '../../../../flightroute/state/ngrx/flightroute.selectors';
import {
    getAltitudeUnit,
    getPerformanceDistanceUnit,
    getPressureUnit,
    getSpeedUnit,
    getTemperatureUnit,
    getWeightUnit
} from '../../../../geo-physics/state/ngrx/geo-physics.selectors';
import {getCurrentAircraft} from '../../../../aircraft/state/ngrx/aircraft.selectors';
import {
    getAlternateAirportPerfState,
    getDepartureAirportPerfState,
    getDestinationAirportPerfState
} from '../../../state/ngrx/plan-perf.selectors';
import {PlanPerfActions} from '../../../state/ngrx/plan-perf.actions';
import {AirportRunway} from '../../../../aerodrome/domain/model/airport-runway';
import {PlanPerfWeatherFactorsState} from '../../../state/state-model/plan-perf-weather-factors-state';
import {PlanPerfRwyFactorsState} from '../../../state/state-model/plan-perf-rwy-factors-state';

@Component({
    selector: 'app-plan-perf-container',
    templateUrl: './plan-perf-container.component.html',
    styleUrls: ['./plan-perf-container.component.scss']
})
export class PlanPerfContainerComponent implements OnInit {
    protected readonly getDepartureAdPerfState$ = this.appStore.pipe(select(getDepartureAirportPerfState));
    protected readonly getDestinationAdPerfState$ = this.appStore.pipe(select(getDestinationAirportPerfState));
    protected readonly getAlternateAdPerfState$ = this.appStore.pipe(select(getAlternateAirportPerfState));
    protected readonly aircraft$ = this.appStore.pipe(select(getCurrentAircraft));
    protected readonly flightroute$ = this.appStore.pipe(select(getFlightroute));
    protected readonly altitudeUnit$ = this.appStore.pipe(select(getAltitudeUnit));
    protected readonly performanceDistanceUnit$ = this.appStore.pipe(select(getPerformanceDistanceUnit));
    protected readonly speedUnit$ = this.appStore.pipe(select(getSpeedUnit));
    protected readonly weightUnit$ = this.appStore.pipe(select(getWeightUnit));
    protected readonly temperatureUnit$ = this.appStore.pipe(select(getTemperatureUnit));
    protected readonly pressureUnit$ = this.appStore.pipe(select(getPressureUnit));


    constructor(private appStore: Store<any>) {
    }


    ngOnInit() {
    }


    protected onDepartureRunwayChanged($event: AirportRunway) {
        this.appStore.dispatch(PlanPerfActions.changeDepartureAirportRunway({runway: $event}));
    }


    protected onDepartureWeatherFactorsChanged($event: PlanPerfWeatherFactorsState) {
        this.appStore.dispatch(PlanPerfActions.changeDepartureAirportWeatherFactors({weatherFactors: $event}));
    }


    protected onDepartureRunwayFactorsChanged($event: PlanPerfRwyFactorsState) {
        this.appStore.dispatch(PlanPerfActions.changeDepartureAirportRunwayFactors({runwayFactors: $event}));
    }


    protected onDestinationRunwayChanged($event: AirportRunway) {
        this.appStore.dispatch(PlanPerfActions.changeDestinationAirportRunway({runway: $event}));
    }


    protected onDestinationWeatherFactorsChanged($event: PlanPerfWeatherFactorsState) {
        this.appStore.dispatch(PlanPerfActions.changeDestinationAirportWeatherFactors({weatherFactors: $event}));
    }


    protected onDestinationRunwayFactorsChanged($event: PlanPerfRwyFactorsState) {
        this.appStore.dispatch(PlanPerfActions.changeDestinationAirportRunwayFactors({runwayFactors: $event}));
    }


    protected onAlternateRunwayChanged($event: AirportRunway) {
        this.appStore.dispatch(PlanPerfActions.changeAlternateAirportRunway({runway: $event}));
    }


    protected onAlternateWeatherFactorsChanged($event: PlanPerfWeatherFactorsState) {
        this.appStore.dispatch(PlanPerfActions.changeAlternateAirportWeatherFactors({weatherFactors: $event}));
    }


    protected onAlternateRunwayFactorsChanged($event: PlanPerfRwyFactorsState) {
        this.appStore.dispatch(PlanPerfActions.changeAlternateAirportRunwayFactors({runwayFactors: $event}));
    }
}
