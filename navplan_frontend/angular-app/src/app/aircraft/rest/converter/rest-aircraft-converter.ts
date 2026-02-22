import {Aircraft} from '../../domain/model/aircraft';
import {IRestAircraft} from '../model/i-rest-aircraft';
import {RestSpeedConverter} from '../../../geo-physics/rest/model/rest-speed-converter';
import {RestConsumptionConverter} from '../../../geo-physics/rest/model/rest-consumption-converter';
import {RestWeightConverter} from '../../../geo-physics/rest/model/rest-weight-converter';
import {FuelType} from '../../domain/model/fuel-type';
import {
    RestDistancePerformanceTableConverter
} from '../../../aircraft-performance/rest/converter/rest-distance-performance-table-converter';
import {RestWeightItemConverter} from '../../../aircraft-wnb/rest/converter/rest-weight-item-converter';
import {RestWnbEnvelopeConverter} from '../../../aircraft-wnb/rest/converter/rest-wnb-envelope-converter';
import {VehicleType} from '../../domain/model/vehicle-type';
import {RestLengthConverter} from '../../../geo-physics/rest/model/rest-length-converter';


export class RestAircraftConverter {
    public static fromRest(restAircraft: IRestAircraft): Aircraft {
        return new Aircraft(
            restAircraft.id,
            VehicleType[restAircraft.vehicleType],
            restAircraft.registration,
            restAircraft.icaoType,
            RestSpeedConverter.fromRest(restAircraft.cruiseSpeed),
            RestConsumptionConverter.fromRest(restAircraft.cruiseFuel),
            restAircraft.fuelType !== null ? FuelType[restAircraft.fuelType] : null,
            RestWeightConverter.fromRest(restAircraft.mtow),
            RestWeightConverter.fromRest(restAircraft.bew),
            RestSpeedConverter.fromRest(restAircraft.rocSealevel),
            RestLengthConverter.fromRest(restAircraft.serviceCeiling),
            RestSpeedConverter.fromRest(restAircraft.cruiseClimbSpeed),
            RestDistancePerformanceTableConverter.fromRest(restAircraft.perfTakeoffGroundRoll),
            RestDistancePerformanceTableConverter.fromRest(restAircraft.perfTakeoffDist50ft),
            RestDistancePerformanceTableConverter.fromRest(restAircraft.perfLandingGroundRoll),
            RestDistancePerformanceTableConverter.fromRest(restAircraft.perfLandingDist50ft),
            RestWeightItemConverter.fromRestList(restAircraft.wnbWeightItems),
            RestWnbEnvelopeConverter.fromRestList(restAircraft.wnbEnvelopes),
        );
    }


    public static toRest(aircraft: Aircraft): IRestAircraft {
        return {
            id: aircraft.id,
            vehicleType: VehicleType[aircraft.vehicleType],
            registration: aircraft.registration,
            icaoType: aircraft.icaoType,
            cruiseSpeed: RestSpeedConverter.toRest(aircraft.cruiseSpeed),
            cruiseFuel: RestConsumptionConverter.toRest(aircraft.cruiseFuel),
            fuelType: aircraft.fuelType !== null ? FuelType[aircraft.fuelType] : null,
            mtow: RestWeightConverter.toRest(aircraft.mtow),
            bew: RestWeightConverter.toRest(aircraft.bew),
            rocSealevel: RestSpeedConverter.toRest(aircraft.rocSealevel),
            serviceCeiling: RestLengthConverter.toRest(aircraft.serviceCeiling),
            cruiseClimbSpeed: RestSpeedConverter.toRest(aircraft.cruiseClimbSpeed),
            perfTakeoffGroundRoll: RestDistancePerformanceTableConverter.toRest(aircraft.perfTakeoffGroundRoll),
            perfTakeoffDist50ft: RestDistancePerformanceTableConverter.toRest(aircraft.perfTakeoffDist50ft),
            perfLandingGroundRoll: RestDistancePerformanceTableConverter.toRest(aircraft.perfLandingGroundRoll),
            perfLandingDist50ft: RestDistancePerformanceTableConverter.toRest(aircraft.perfLandingDist50ft),
            wnbWeightItems: RestWeightItemConverter.toRestList(aircraft.wnbWeightItems),
            wnbEnvelopes: RestWnbEnvelopeConverter.toRestList(aircraft.wnbEnvelopes),
        };
    }
}
