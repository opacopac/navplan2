import {createAction, props} from '@ngrx/store';
import {VehicleType} from '../../domain/model/vehicle-type';
import {Speed} from '../../../geo-physics/domain/model/quantities/speed';
import {Consumption} from '../../../geo-physics/domain/model/quantities/consumption';
import {FuelType} from '../../domain/model/fuel-type';


export class AircraftDetailsActions {
    public static readonly changeVehicleType = createAction(
        '[Aircraft Details] Change vehicle type',
        props<{ vehicleType: VehicleType }>()
    );

    public static readonly changeRegistration = createAction(
        '[Aircraft Details] Change registration',
        props<{ registration: string }>()
    );

    public static readonly changeIcaoType = createAction(
        '[Aircraft Details] Change ICAO type',
        props<{ icaoType: string }>()
    );

    public static readonly changeCruiseSpeed = createAction(
        '[Aircraft Details] Change cruise speed',
        props<{ cruiseSpeed: Speed }>()
    );

    public static readonly changeCruiseConumption = createAction(
        '[Aircraft Details] Change cruise consumption',
        props<{ cruiseFuel: Consumption }>()
    );

    public static readonly changeFuelType = createAction(
        '[Aircraft Details] Change fuel type',
        props<{ fuelType: FuelType }>()
    );
}
