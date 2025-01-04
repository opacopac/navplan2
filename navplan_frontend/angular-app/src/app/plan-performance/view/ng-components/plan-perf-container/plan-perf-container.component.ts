import {Component, OnInit, TrackByFunction} from '@angular/core';
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
import {getAirportPerfStates} from '../../../state/ngrx/plan-perf.selectors';
import {PlanPerfActions} from '../../../state/ngrx/plan-perf.actions';
import {AirportRunway} from '../../../../aerodrome/domain/model/airport-runway';
import {PlanPerfWeatherFactorsState} from '../../../state/state-model/plan-perf-weather-factors-state';
import {PlanPerfRwyFactorsState} from '../../../state/state-model/plan-perf-rwy-factors-state';
import {PlanPerfAirportType} from '../../../state/state-model/plan-perf-airport-type';
import {PlanPerfAirportState} from '../../../state/state-model/plan-perf-airport-state';

@Component({
    selector: 'app-plan-perf-container',
    templateUrl: './plan-perf-container.component.html',
    styleUrls: ['./plan-perf-container.component.scss']
})
export class PlanPerfContainerComponent implements OnInit {
    protected readonly getAirportPerfStates$ = this.appStore.pipe(select(getAirportPerfStates));
    protected readonly aircraft$ = this.appStore.pipe(select(getCurrentAircraft));
    protected readonly flightroute$ = this.appStore.pipe(select(getFlightroute));
    protected readonly altitudeUnit$ = this.appStore.pipe(select(getAltitudeUnit));
    protected readonly performanceDistanceUnit$ = this.appStore.pipe(select(getPerformanceDistanceUnit));
    protected readonly speedUnit$ = this.appStore.pipe(select(getSpeedUnit));
    protected readonly temperatureUnit$ = this.appStore.pipe(select(getTemperatureUnit));
    protected readonly pressureUnit$ = this.appStore.pipe(select(getPressureUnit));
    protected readonly weightUnit$ = this.appStore.pipe(select(getWeightUnit));

    protected readonly PlanPerfAirportType = PlanPerfAirportType;

    constructor(private appStore: Store<any>) {
    }


    ngOnInit() {
    }


    protected trackByAirport(index: number, item: PlanPerfAirportState): TrackByFunction<PlanPerfAirportState> {
        return (index, item) => item?.airport?.id;
    }


    protected onRunwayChanged(idx: number, $event: AirportRunway) {
        this.appStore.dispatch(PlanPerfActions.changeAirportRunway({adIndex: idx, runway: $event}));
    }


    protected onWeatherFactorsChanged(idx: number, $event: PlanPerfWeatherFactorsState) {
        this.appStore.dispatch(PlanPerfActions.changeAirportWeatherFactors({adIndex: idx, weatherFactors: $event}));
    }


    protected onRunwayFactorsChanged(idx: number, $event: PlanPerfRwyFactorsState) {
        this.appStore.dispatch(PlanPerfActions.changeAirportRunwayFactors({adIndex: idx, runwayFactors: $event}));
    }
}
