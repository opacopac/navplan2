import {Aircraft} from '../../domain/model/aircraft';
import {IRestAircraft} from '../model/i-rest-aircraft';
import {RestSpeedConverter} from '../../../geo-physics/rest/model/rest-speed-converter';
import {RestConsumptionConverter} from '../../../geo-physics/rest/model/rest-consumption-converter';
import {RestWeightConverter} from '../../../geo-physics/rest/model/rest-weight-converter';


export class RestAircraftConverter {
    public static fromRest(restAircraft: IRestAircraft): Aircraft {
        return new Aircraft(
            restAircraft.id,
            restAircraft.vehicleType,
            restAircraft.registration,
            restAircraft.icaoType,
            RestSpeedConverter.fromRest(restAircraft.cruiseSpeed),
            RestConsumptionConverter.fromRest(restAircraft.cruiseFuel),
            restAircraft.fuelType,
            RestWeightConverter.fromRest(restAircraft.mtow),
            RestWeightConverter.fromRest(restAircraft.bew)
        );
    }


    public static toRest(aircraft: Aircraft): IRestAircraft {
        return {
            id: aircraft.id,
            vehicleType: aircraft.vehicleType,
            registration: aircraft.registration,
            icaoType: aircraft.icaoType,
            cruiseSpeed: RestSpeedConverter.toRest(aircraft.cruiseSpeed),
            cruiseFuel: RestConsumptionConverter.toRest(aircraft.cruiseFuel),
            fuelType: aircraft.fuelType,
            mtow: RestWeightConverter.toRest(aircraft.mtow),
            bew: RestWeightConverter.toRest(aircraft.bew)
        };
    }
}
