import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {map} from 'rxjs/operators';
import {getFlightroute} from '../../../../state/ngrx/flightroute.selectors';
import {FlightrouteActions} from '../../../../state/ngrx/flightroute.actions';
import {getConsumptionUnit, getFuelUnit} from '../../../../../geo-physics/state/ngrx/geo-physics.selectors';
import {Consumption} from '../../../../../geo-physics/domain/model/quantities/consumption';
import {Time} from '../../../../../geo-physics/domain/model/quantities/time';

@Component({
    selector: 'app-fuel-calc-container',
    templateUrl: './fuel-calc-container.component.html',
    styleUrls: ['./fuel-calc-container.component.scss']
})
export class FuelCalcContainerComponent implements OnInit {
    protected readonly Consumption = Consumption;
    protected readonly flightroute$ = this.appStore.pipe(select(getFlightroute));
    protected readonly routeFuel$ = this.flightroute$.pipe(map(flightroute => flightroute.fuel));
    protected readonly aircraftConsumption$ = this.flightroute$.pipe(map(flightroute => flightroute.aircraft.consumption));
    protected readonly extraTime$ = this.flightroute$.pipe(map(flightroute => flightroute.extraTime));
    protected readonly fuelUnit$ = this.appStore.pipe(select(getFuelUnit));
    protected readonly consumptionUnit$ = this.appStore.pipe(select(getConsumptionUnit));


    constructor(
        private appStore: Store<any>
    ) {
    }


    ngOnInit() {
    }


    protected onAircraftConsumptionChange(consumption: Consumption) {
        this.appStore.dispatch(FlightrouteActions.updateAircraftConsumption({aircraftConsumption: consumption}));
    }


    protected onExtraTimeChange(extraTime: Time) {
        this.appStore.dispatch(FlightrouteActions.updateExtraTime({extraTime: extraTime}));
    }
}
