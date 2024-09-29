import { Pressure } from '../../../geo-physics/domain/model/quantities/pressure';
import { Temperature } from '../../../geo-physics/domain/model/quantities/temperature';
import { DistancePerformanceTable } from '../model/distance-performance-table';
import { Length } from '../../../geo-physics/domain/model/quantities/length';
import { AtmosphereService } from '../../../geo-physics/domain/service/meteo/atmosphere.service';
import { PerformanceTableTemperatureReference } from '../model/performance-table-temperature-reference';
import { ArrayHelper } from '../../../system/domain/service/array/array-helper';
import { RwyCorrectionFactors } from '../model/rwy-correction-factors';


export class AircraftPerformanceService {
    public static calcTakeOffGroundRoll(
        fieldElevation: Length,
        qnh: Pressure,
        oat: Temperature,
        rwyCorrectionFactors: RwyCorrectionFactors,
        performanceTable: DistancePerformanceTable
    ): Length {
        const pa = AtmosphereService.calcPressureAltitude(fieldElevation, qnh);
        const isaTemp = AtmosphereService.calcIsaTemperatureDelta(pa, oat);
        const temp = performanceTable.temperatureReference === PerformanceTableTemperatureReference.ISA_TEMPERATURE
            ? isaTemp
            : oat;

        const altIdx = ArrayHelper.findFractionalIndex(pa, performanceTable.altitudeSteps, alt => alt.ft);
        const altLowerIdx = Math.floor(altIdx);
        const altUpperIdx = altLowerIdx + 1;
        if (altUpperIdx >= performanceTable.altitudeSteps.length) {
            throw new Error('AircraftPerformanceService.calcTakeOffGroundRoll: altitude out of bounds');
        }

        const tempIdx = ArrayHelper.findFractionalIndex(temp, performanceTable.temperatureSteps, temp => temp.c);
        const tempLowerIdx = Math.floor(tempIdx);
        const tempUpperIdx = tempLowerIdx + 1;
        if (tempUpperIdx >= performanceTable.temperatureSteps.length) {
            throw new Error('AircraftPerformanceService.calcTakeOffGroundRoll: temperature out of bounds');
        }

        const distLowerAltLowerTemp = performanceTable.distanceValues[altLowerIdx][tempLowerIdx];
        const distLowerAltUpperTemp = performanceTable.distanceValues[altLowerIdx][tempUpperIdx];
        const lowerDistDiffM = distLowerAltUpperTemp.m - distLowerAltLowerTemp.m;
        const lowerDistM = distLowerAltLowerTemp.m + lowerDistDiffM * (tempIdx - tempLowerIdx);

        const distUpperAltLowerTemp = performanceTable.distanceValues[altUpperIdx][tempLowerIdx];
        const distUpperAltUpperTemp = performanceTable.distanceValues[altUpperIdx][tempUpperIdx];
        const upperDistDiffM = distUpperAltUpperTemp.m - distUpperAltLowerTemp.m;
        const upperDistM = distUpperAltLowerTemp.m + upperDistDiffM * (tempIdx - tempLowerIdx);

        const distDiffM = upperDistM - lowerDistM;
        const distM = lowerDistM + distDiffM * (altIdx - altLowerIdx);

        // TODO correction factors

        return Length.ofM(distM);
    }
}
