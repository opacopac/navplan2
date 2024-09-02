import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {getCurrentAircraft} from '../../../../state/ngrx/aircraft.selectors';
import {Observable} from 'rxjs';
import {SpeedUnit} from '../../../../../geo-physics/domain/model/quantities/speed-unit';
import {getConsumptionUnit, getSpeedUnit} from '../../../../../geo-physics/state/ngrx/geo-physics.selectors';
import {VehicleType} from '../../../../domain/model/vehicle-type';
import {Speed} from '../../../../../geo-physics/domain/model/quantities/speed';
import {Consumption} from '../../../../../geo-physics/domain/model/quantities/consumption';
import {AircraftDetailsActions} from '../../../../state/ngrx/aircraft-details-actions';
import {FuelType} from '../../../../domain/model/fuel-type';
import {AircraftCrudActions} from '../../../../state/ngrx/aircraft-crud-actions';


@Component({
    selector: 'app-aircraft-details-page',
    templateUrl: './aircraft-details-page.component.html',
    styleUrls: ['./aircraft-details-page.component.scss'],
})
export class AircraftDetailsPageComponent implements OnInit {
    protected readonly currentAircraft$ = this.appStore.pipe(select(getCurrentAircraft));
    protected readonly speedUnit$: Observable<SpeedUnit> = this.appStore.pipe(select(getSpeedUnit));
    protected readonly consumptionUnit$ = this.appStore.pipe(select(getConsumptionUnit));


    constructor(private appStore: Store<any>) {
    }


    ngOnInit() {
    }


    protected onVehicleTypeChange(vehicleType: VehicleType) {
        this.appStore.dispatch(AircraftDetailsActions.changeVehicleType({vehicleType: vehicleType}));
    }


    protected onRegistrationChange(registration: string) {
        this.appStore.dispatch(AircraftDetailsActions.changeRegistration({registration: registration}));
    }


    protected onIcaoTypeChange(icaoType: string) {
        this.appStore.dispatch(AircraftDetailsActions.changeIcaoType({icaoType: icaoType}));
    }


    protected onCruiseSpeedChange(cruiseSpeed: Speed) {
        this.appStore.dispatch(AircraftDetailsActions.changeCruiseSpeed({cruiseSpeed: cruiseSpeed}));
    }


    protected onCruiseFuelChange(cruiseFuel: Consumption) {
        this.appStore.dispatch(AircraftDetailsActions.changeCruiseConumption({cruiseFuel: cruiseFuel}));
    }


    protected onFuelTypeChange(fuelType: FuelType) {
        this.appStore.dispatch(AircraftDetailsActions.changeFuelType({fuelType: fuelType}));
    }


    protected onSaveAircraftDetailsClicked() {
        this.appStore.dispatch(AircraftCrudActions.saveAircraft());
    }
}
