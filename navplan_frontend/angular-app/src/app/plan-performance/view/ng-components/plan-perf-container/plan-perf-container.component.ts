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
import {PlanPerfAirportState} from '../../../state/state-model/plan-perf-airport-state';

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


    protected onDepartureAirportPerformanceChanged($event: PlanPerfAirportState) {
        this.appStore.dispatch(PlanPerfActions.changeDepartureAirportPerformance({airportPerformance: $event}));
    }


    protected onDestinationAirportPerformanceChanged($event: PlanPerfAirportState) {
        this.appStore.dispatch(PlanPerfActions.changeDestinationAirportPerformance({airportPerformance: $event}));
    }


    protected onAlternateAirportPerformanceChanged($event: PlanPerfAirportState) {
        this.appStore.dispatch(PlanPerfActions.changeAlternateAirportPerformance({airportPerformance: $event}));
    }
}
