import {Pressure} from '../../../geo-physics/domain/model/quantities/pressure';
import {Temperature} from '../../../geo-physics/domain/model/quantities/temperature';
import {DistancePerformanceTable} from '../model/distance-performance-table';
import {Length} from '../../../geo-physics/domain/model/quantities/length';
import {AtmosphereService} from '../../../geo-physics/domain/service/meteo/atmosphere.service';
import {PerformanceTableTemperatureReference} from '../model/performance-table-temperature-reference';
import {ArrayHelper} from '../../../system/domain/service/array/array-helper';
import {DistancePerformanceConditions} from '../model/distance-performance-conditions';
import {DistancePerformanceCorrectionFactors} from '../model/distance-performance-correction-factors';


export class AircraftPerformanceService {
    public static calcDistance(
        fieldElevation: Length,
        qnh: Pressure,
        oat: Temperature,
        distPerfConditions: DistancePerformanceConditions,
        perfTable: DistancePerformanceTable
    ): Length {
        const pa = AtmosphereService.calcPressureAltitude(fieldElevation, qnh);
        const isaTempDelta = AtmosphereService.calcIsaTemperatureDelta(pa, oat);
        const temp = perfTable.temperatureReference === PerformanceTableTemperatureReference.ISA_TEMPERATURE_DELTA
            ? isaTempDelta
            : oat;

        const uncorrectedDist = this.calcUncorrectedDistance(
            pa,
            temp,
            perfTable
        );

        const correctedDist = this.applyCorrectionFactors(
            uncorrectedDist,
            distPerfConditions,
            perfTable.correctionFactors
        );

        return correctedDist;
    }


    private static calcUncorrectedDistance(
        pa: Length,
        temp: Temperature,
        perfTable: DistancePerformanceTable
    ) {
        const altIdx = ArrayHelper.findFractionalIndex(pa, perfTable.altitudeSteps, alt => alt.ft);
        const altLowerIdx = Math.floor(altIdx);
        const altUpperIdx = altLowerIdx + 1;
        if (altUpperIdx >= perfTable.altitudeSteps.length) {
            throw new Error('AircraftPerformanceService.calcTakeOffGroundRoll: altitude out of bounds');
        }

        const tempIdx = ArrayHelper.findFractionalIndex(temp, perfTable.temperatureSteps, temp => temp.c);
        const tempLowerIdx = Math.floor(tempIdx);
        const tempUpperIdx = tempLowerIdx + 1;
        if (tempUpperIdx >= perfTable.temperatureSteps.length) {
            throw new Error('AircraftPerformanceService.calcTakeOffGroundRoll: temperature out of bounds');
        }

        const distLowerAltLowerTemp = perfTable.distanceValues[altLowerIdx][tempLowerIdx];
        const distLowerAltUpperTemp = perfTable.distanceValues[altLowerIdx][tempUpperIdx];
        const lowerDistDiffM = distLowerAltUpperTemp.m - distLowerAltLowerTemp.m;
        const lowerDistM = distLowerAltLowerTemp.m + lowerDistDiffM * (tempIdx - tempLowerIdx);

        const distUpperAltLowerTemp = perfTable.distanceValues[altUpperIdx][tempLowerIdx];
        const distUpperAltUpperTemp = perfTable.distanceValues[altUpperIdx][tempUpperIdx];
        const upperDistDiffM = distUpperAltUpperTemp.m - distUpperAltLowerTemp.m;
        const upperDistM = distUpperAltLowerTemp.m + upperDistDiffM * (tempIdx - tempLowerIdx);

        const distDiffM = upperDistM - lowerDistM;
        const distM = lowerDistM + distDiffM * (altIdx - altLowerIdx);

        return Length.ofM(distM);
    }


    private static applyCorrectionFactors(
        uncorrectedDist: Length,
        distPerfConditions: DistancePerformanceConditions,
        correctionFactors: DistancePerformanceCorrectionFactors
    ): Length {
        let distM = uncorrectedDist.m;

        if (distPerfConditions.isGrassRwy) {
            distM = distM + distM * correctionFactors.grassRwyIncPercent / 100;
        }

        if (distPerfConditions.isWetRwy) {
            distM = distM + distM * correctionFactors.wetRwyIncPercent / 100;
        }

        const windKt = distPerfConditions.headwind.kt;
        if (windKt > 0) {
            distM = distM - distM * windKt / correctionFactors.headwindDecPerSpeed.kt
            * correctionFactors.headwindDecPercent / 100;
        } else if (windKt < 0) {
            distM = distM + distM * Math.abs(windKt) / correctionFactors.tailwindIncPerSpeed.kt
            * correctionFactors.tailwindIncPercent / 100;
        }

        return Length.ofM(distM);
    }
}
