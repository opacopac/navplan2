import {Pressure} from '../../../geo-physics/domain/model/quantities/pressure';
import {Temperature} from '../../../geo-physics/domain/model/quantities/temperature';
import {DistancePerformanceTable} from '../../../aircraft/domain/model/distance-performance-table';
import {Speed} from '../../../geo-physics/domain/model/quantities/speed';
import {Length} from '../../../geo-physics/domain/model/quantities/length';
import {AtmosphereService} from '../../../geo-physics/domain/service/meteo/atmosphere.service';
import { PerformanceTableTemperatureReference } from '../../../aircraft/domain/model/performance-table-temperature-reference';
import { ArrayHelper } from '../../../system/domain/service/array/array-helper';

export class PlanPerformanceService {
    public static calcTakeOffGroundRoll(
        elevation: Length,
        qnh: Pressure,
        oat: Temperature,
        isGrassRwy: boolean,
        isWetRwy: boolean,
        rwyDownhillSlopePercent: number,
        headwind: Speed,
        tailwind: Speed,
        performanceTable: DistancePerformanceTable
    ): Length {
        const pa = AtmosphereService.calcPressureAltitude(elevation, qnh);
        const isaTemp = AtmosphereService.calcIsaTemperature(pa, oat);
        const temp = performanceTable.temperatureReference === PerformanceTableTemperatureReference.ISA_TEMPERATURE
        ? isaTemp
        : oat;

        const altIdx = ArrayHelper.findFractionalIndex(pa, performanceTable.altitudeSteps, alt => alt.ft);
        const tempIdx = ArrayHelper.findFractionalIndex(temp, performanceTable.temperatureSteps, temp => temp.c);

        const rollLowerAltLowerTemp = performanceTable.distanceValues[Math.floor(altIdx)][Math.floor(tempIdx)];
        const rollLowerAltUpperTemp = performanceTable.distanceValues[Math.floor(altIdx)][Math.ceil(tempIdx)];
        //const rollLower = rollLowerAltLowerTemp + (rollLowerAltUpperTemp - rollLowerAltLowerTemp) * (temp.c - performanceTable.temperatureSteps[Math.floor(tempIdx)].c);

        const rollUpperAltLowerTemp = performanceTable.distanceValues[Math.ceil(altIdx)][Math.floor(tempIdx)];
        const rollUpperAltUpperTemp = performanceTable.distanceValues[Math.ceil(altIdx)][Math.ceil(tempIdx)];

        return Length.createZero();
    }
}
