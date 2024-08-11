import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {getFlightroute} from '../../../state/ngrx/flightroute.selectors';
import {
    getWeightUnit,
    getWnbLengthUnit
} from '../../../../geo-physics/state/ngrx/geo-physics.selectors';
import {Consumption} from '../../../../geo-physics/domain/model/quantities/consumption';
import {getCurrentAircraft} from '../../../../aircraft/state/ngrx/aircraft.selectors';

@Component({
    selector: 'app-plan-perf-container',
    templateUrl: './plan-perf-container.component.html',
    styleUrls: ['./plan-perf-container.component.scss']
})
export class PlanPerfContainerComponent implements OnInit {
    protected readonly Consumption = Consumption;
    protected readonly currentAircraft$ = this.appStore.pipe(select(getCurrentAircraft));
    protected readonly flightroute$ = this.appStore.pipe(select(getFlightroute));
    protected readonly lengthUnit$ = this.appStore.pipe(select(getWnbLengthUnit));
    protected readonly weightUnit$ = this.appStore.pipe(select(getWeightUnit));


    constructor(
        private appStore: Store<any>
    ) {
    }


    ngOnInit() {
    }
}
