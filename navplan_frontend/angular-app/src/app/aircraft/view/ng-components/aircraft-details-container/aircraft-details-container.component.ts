import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {getCurrentAircraft} from '../../../state/ngrx/aircraft.selectors';
import {Observable} from 'rxjs';
import {SpeedUnit} from '../../../../geo-physics/domain/model/quantities/speed-unit';
import {getConsumptionUnit, getSelectedSpeedUnit} from '../../../../geo-physics/state/ngrx/geo-physics.selectors';
import {VehicleType} from '../../../domain/model/vehicle-type';
import {Speed} from '../../../../geo-physics/domain/model/quantities/speed';
import {Consumption} from '../../../../geo-physics/domain/model/quantities/consumption';
import {AircraftActions} from '../../../state/ngrx/aircraft.actions';


@Component({
    selector: 'app-aircraft-details-container',
    templateUrl: './aircraft-details-container.component.html',
    styleUrls: ['./aircraft-details-container.component.scss'],
})
export class AircraftDetailsContainerComponent implements OnInit {
    protected readonly currentAircraft$ = this.appStore.pipe(select(getCurrentAircraft));
    protected readonly speedUnit$: Observable<SpeedUnit> = this.appStore.pipe(select(getSelectedSpeedUnit));
    protected readonly consumptionUnit$ = this.appStore.pipe(select(getConsumptionUnit));


    constructor(private appStore: Store<any>) {
    }


    ngOnInit() {
    }


    protected onSaveAircraftDetailsClicked($event: {
        vehicleType: VehicleType;
        regisration: string;
        icaoType: string;
        cruiseSpeed: Speed;
        cruiseFuel: Consumption
    }) {
        this.appStore.dispatch(AircraftActions.saveAircraftDetails($event));
    }
}
