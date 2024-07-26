import {Aircraft} from '../../domain/model/aircraft';
import {IRestAircraft} from '../model/i-rest-aircraft';
import {RestSpeedConverter} from '../../../geo-physics/rest/model/rest-speed-converter';
import {RestConsumptionConverter} from '../../../geo-physics/rest/model/rest-consumption-converter';
import {RestWeightConverter} from '../../../geo-physics/rest/model/rest-weight-converter';
import {DistancePerformanceTable} from '../../domain/model/distance-performance-table';
import {Weight} from '../../../geo-physics/domain/model/quantities/weight';
import {WeightUnit} from '../../../geo-physics/domain/model/quantities/weight-unit';
import {PerformanceTableAltitudeReference} from '../../domain/model/performance-table-altitude-reference';
import {Length} from '../../../geo-physics/domain/model/quantities/length';
import {LengthUnit} from '../../../geo-physics/domain/model/quantities/length-unit';
import {PerformanceTableTemperatureReference} from '../../domain/model/performance-table-temperature-reference';
import {Temperature} from '../../../geo-physics/domain/model/quantities/temperature';
import {TemperatureUnit} from '../../../geo-physics/domain/model/quantities/temperature-unit';


export class RestAircraftConverter {
    private static mockDistTable = new DistancePerformanceTable(
        new Weight(750, WeightUnit.KG),
        PerformanceTableAltitudeReference.FIELD_ALTITUDE,
        [new Length(0, LengthUnit.FT), new Length(2000, LengthUnit.FT), new Length(4000, LengthUnit.FT), new Length(6000, LengthUnit.FT)],
        PerformanceTableTemperatureReference.ISA_TEMPERATURE,
        [new Temperature(-20, TemperatureUnit.C), new Temperature(-10, TemperatureUnit.C), new Temperature(0, TemperatureUnit.C), new Temperature(10, TemperatureUnit.C), new Temperature(20, TemperatureUnit.C)],
        [
            [new Length(511, LengthUnit.FT), new Length(559, LengthUnit.FT), new Length(612, LengthUnit.FT), new Length(688, LengthUnit.FT), new Length(728, LengthUnit.FT)],
            [new Length(511, LengthUnit.FT), new Length(559, LengthUnit.FT), new Length(612, LengthUnit.FT), new Length(688, LengthUnit.FT), new Length(728, LengthUnit.FT)],
            [new Length(511, LengthUnit.FT), new Length(559, LengthUnit.FT), new Length(612, LengthUnit.FT), new Length(688, LengthUnit.FT), new Length(728, LengthUnit.FT)],
            [new Length(847, LengthUnit.FT), new Length(559, LengthUnit.FT), new Length(612, LengthUnit.FT), new Length(688, LengthUnit.FT), new Length(1315, LengthUnit.FT)]
        ],
        null
    );

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
            RestWeightConverter.fromRest(restAircraft.bew),
            this.mockDistTable, // TODO
            this.mockDistTable,
            this.mockDistTable,
            this.mockDistTable,
            [],
            []
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
