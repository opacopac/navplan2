import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {map} from 'rxjs/operators';
import {getFlightroute, getUseAircraftConsumptionValue} from '../../../../state/ngrx/flightroute.selectors';
import {FlightrouteActions} from '../../../../state/ngrx/flightroute.actions';
import {getConsumptionUnit, getVolumeUnit} from '../../../../../geo-physics/state/ngrx/geo-physics.selectors';
import {Consumption} from '../../../../../geo-physics/domain/model/quantities/consumption';
import {Time} from '../../../../../geo-physics/domain/model/quantities/time';
import {getCurrentAircraft} from '../../../../../aircraft/state/ngrx/aircraft.selectors';

@Component({
    selector: 'app-fuel-calc-container',
    templateUrl: './fuel-calc-container.component.html',
    styleUrls: ['./fuel-calc-container.component.scss']
})
export class FuelCalcContainerComponent implements OnInit {
    protected readonly Consumption = Consumption;
    protected readonly flightroute$ = this.appStore.pipe(select(getFlightroute));
    protected readonly routeFuel$ = this.flightroute$.pipe(map(flightroute => flightroute.fuel));
    protected readonly aircraftConsumption$ = this.flightroute$.pipe(map(flightroute => flightroute.aircraftParams.consumption));
    protected readonly useAircraftValue$ = this.appStore.pipe(select(getUseAircraftConsumptionValue));
    protected readonly selectedAircaft$ = this.appStore.pipe(select(getCurrentAircraft));
    protected readonly fuelUnit$ = this.appStore.pipe(select(getVolumeUnit));
    protected readonly consumptionUnit$ = this.appStore.pipe(select(getConsumptionUnit));


    constructor(
        private appStore: Store<any>
    ) {
    }


    ngOnInit() {
    }


    protected onAircraftConsumptionChange(consumption: Consumption) {
        this.appStore.dispatch(FlightrouteActions.updateCruiseConsumption({cruiseConsumption: consumption}));
    }


    protected onUseAircraftConsumptionChanged(useAircraftConsumption: boolean) {
        this.appStore.dispatch(FlightrouteActions.updateUseAircraftConsumptionValue({useAircraftConsumption: useAircraftConsumption}));
    }


    protected onExtraTimeChange(extraTime: Time) {
        this.appStore.dispatch(FlightrouteActions.updateExtraTime({extraTime: extraTime}));
    }
}
