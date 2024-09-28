import { Pressure } from '../../../geo-physics/domain/model/quantities/pressure';
import { Temperature } from '../../../geo-physics/domain/model/quantities/temperature';
import { DistancePerformanceTable } from '../../../aircraft/domain/model/distance-performance-table';
import { Length } from '../../../geo-physics/domain/model/quantities/length';
import { AtmosphereService } from '../../../geo-physics/domain/service/meteo/atmosphere.service';
import { PerformanceTableTemperatureReference } from '../../../aircraft/domain/model/performance-table-temperature-reference';
import { ArrayHelper } from '../../../system/domain/service/array/array-helper';
import { RwyCorrectionFactors } from '../model/rwy-correction-factors';


export class PlanPerformanceService {
    public static calcTakeOffGroundRoll(
        fieldElevation: Length,
        qnh: Pressure,
        oat: Temperature,
        rwyCorrectionFactors: RwyCorrectionFactors,
        performanceTable: DistancePerformanceTable
    ): Length {
        const pa = AtmosphereService.calcPressureAltitude(fieldElevation, qnh);
        const isaTemp = AtmosphereService.calcIsaTemperature(pa, oat);
        const temp = performanceTable.temperatureReference === PerformanceTableTemperatureReference.ISA_TEMPERATURE
            ? isaTemp
            : oat;

        const altIdx = ArrayHelper.findFractionalIndex(pa, performanceTable.altitudeSteps, alt => alt.ft);
        const altLower = performanceTable.altitudeSteps[Math.floor(altIdx)];
        const altUpper = performanceTable.altitudeSteps[Math.ceil(altIdx)];
        const altDiffFt = altUpper.ft - altLower.ft;

        const tempIdx = ArrayHelper.findFractionalIndex(temp, performanceTable.temperatureSteps, temp => temp.c);
        const tempLower = performanceTable.temperatureSteps[Math.floor(tempIdx)];
        const tempUpper = performanceTable.temperatureSteps[Math.ceil(tempIdx)];
        const tempDiffC = tempUpper.c - tempLower.c;

        const rollLowerAltLowerTemp = performanceTable.distanceValues[Math.floor(altIdx)][Math.floor(tempIdx)];
        const rollLowerAltUpperTemp = performanceTable.distanceValues[Math.floor(altIdx)][Math.ceil(tempIdx)];
        const lowerRollDiffM = rollLowerAltUpperTemp.m - rollLowerAltLowerTemp.m;
        const lowerRollM = rollLowerAltLowerTemp.m + lowerRollDiffM * (isaTemp.c - tempLower.c) / tempDiffC;

        const rollUpperAltLowerTemp = performanceTable.distanceValues[Math.ceil(altIdx)][Math.floor(tempIdx)];
        const rollUpperAltUpperTemp = performanceTable.distanceValues[Math.ceil(altIdx)][Math.ceil(tempIdx)];
        const upperRollDiffM = rollUpperAltUpperTemp.m - rollUpperAltLowerTemp.m;
        const upperRollM = rollUpperAltLowerTemp.m + upperRollDiffM * (isaTemp.c - tempLower.c) / tempDiffC;

        const rollDiffM = upperRollM - lowerRollM;
        const rollM = lowerRollM + rollDiffM * (pa.ft - altLower.ft) / altDiffFt; // TODO: div by zero

        // TODO correction factors

        return Length.ofM(rollM);
    }
}
