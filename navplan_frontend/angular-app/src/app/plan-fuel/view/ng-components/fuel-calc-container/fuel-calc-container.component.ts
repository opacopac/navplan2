import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {map} from 'rxjs/operators';
import {getFlightroute, getUseAircraftConsumptionValue} from '../../../../flightroute/state/ngrx/flightroute.selectors';
import {FlightrouteActions} from '../../../../flightroute/state/ngrx/flightroute.actions';
import {getConsumptionUnit, getVolumeUnit} from '../../../../geo-physics/state/ngrx/geo-physics.selectors';
import {Consumption} from '../../../../geo-physics/domain/model/quantities/consumption';
import {Time} from '../../../../geo-physics/domain/model/quantities/time';
import {getCurrentAircraft} from '../../../../aircraft/state/ngrx/aircraft.selectors';
import {getCurrentUser} from '../../../../user/state/ngrx/user.selectors';
import {FlightrouteCrudActions} from '../../../../flightroute/state/ngrx/flightroute-crud.actions';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {AircraftViewModule} from '../../../../aircraft/view/aircraft-view.module';
import {SaveButtonComponent} from '../../../../common/view/ng-components/save-button/save-button.component';
import {CommonModule} from '@angular/common';
import {FuelCalcTableComponent} from '../fuel-calc-table/fuel-calc-table.component';
import {FuelCalcInputFieldsComponent} from '../fuel-calc-input-fields/fuel-calc-input-fields.component';
import {
    RoutePickerContainerComponent
} from '../../../../plan-route-list/view/ng-components/route-picker-container/route-picker-container.component';

@Component({
    selector: 'app-fuel-calc-container',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AircraftViewModule,
        SaveButtonComponent,
        FuelCalcTableComponent,
        FuelCalcInputFieldsComponent,
        RoutePickerContainerComponent
    ],
    templateUrl: './fuel-calc-container.component.html',
    styleUrls: ['./fuel-calc-container.component.scss']
})
export class FuelCalcContainerComponent implements OnInit {
    protected fuelForm: FormGroup;

    protected readonly currentUser$ = this.appStore.pipe(select(getCurrentUser));
    protected readonly isUserLoggedIn$ = this.currentUser$.pipe(map(user => user != null));
    protected readonly flightroute$ = this.appStore.pipe(select(getFlightroute));
    protected readonly routeFuel$ = this.flightroute$.pipe(map(flightroute => flightroute.fuel));
    protected readonly aircraftConsumption$ = this.flightroute$.pipe(map(flightroute => flightroute.aircraftParams.consumption));
    protected readonly useAircraftValue$ = this.appStore.pipe(select(getUseAircraftConsumptionValue));
    protected readonly selectedAircaft$ = this.appStore.pipe(select(getCurrentAircraft));
    protected readonly fuelUnit$ = this.appStore.pipe(select(getVolumeUnit));
    protected readonly consumptionUnit$ = this.appStore.pipe(select(getConsumptionUnit));
    protected readonly Consumption = Consumption;


    constructor(
        private appStore: Store<any>,
        private formBuilder: FormBuilder
    ) {
    }


    ngOnInit() {
        this.fuelForm = this.formBuilder.group({});
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


    protected onSaveClick() {
        this.appStore.dispatch(FlightrouteCrudActions.save());
    }
}
