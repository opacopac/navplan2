import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {getFlightroute} from '../../../../flightroute/state/ngrx/flightroute.selectors';
import {
    getPressureUnit,
    getTemperatureUnit,
    getWeightUnit,
    getWnbLengthUnit
} from '../../../../geo-physics/state/ngrx/geo-physics.selectors';
import {getCurrentAircraft} from '../../../../aircraft/state/ngrx/aircraft.selectors';

@Component({
    selector: 'app-plan-perf-container',
    templateUrl: './plan-perf-container.component.html',
    styleUrls: ['./plan-perf-container.component.scss']
})
export class PlanPerfContainerComponent implements OnInit {
    protected readonly aircraft$ = this.appStore.pipe(select(getCurrentAircraft));
    protected readonly flightroute$ = this.appStore.pipe(select(getFlightroute));
    protected readonly lengthUnit$ = this.appStore.pipe(select(getWnbLengthUnit));
    protected readonly weightUnit$ = this.appStore.pipe(select(getWeightUnit));
    protected readonly tempUnit$ = this.appStore.pipe(select(getTemperatureUnit));
    protected readonly pressureUnit$ = this.appStore.pipe(select(getPressureUnit));


    constructor(
        private appStore: Store<any>
    ) {
    }


    ngOnInit() {
    }


    protected onGrassRwyChanged() {
        // TODO
    }


    protected onWetRwyChanged() {
        // TODO
    }


    protected onRwySlopeChanged() {
        // TODO
    }
}
