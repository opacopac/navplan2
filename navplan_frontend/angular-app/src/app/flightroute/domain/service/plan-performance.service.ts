import {Pressure} from '../../../geo-physics/domain/model/quantities/pressure';
import {Temperature} from '../../../geo-physics/domain/model/quantities/temperature';
import {DistancePerformanceTable} from '../../../aircraft/domain/model/distance-performance-table';
import {Speed} from '../../../geo-physics/domain/model/quantities/speed';
import {Length} from '../../../geo-physics/domain/model/quantities/length';
import {AtmosphereService} from '../../../geo-physics/domain/service/meteo/atmosphere.service';
import { PerformanceTableTemperatureReference } from '../../../aircraft/domain/model/performance-table-temperature-reference';

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

        const altIdx = this.findFractionalIndex(pa, performanceTable.altitudeSteps, step => step.ft);
        const tempIdx = this.findFractionalIndex(temp, performanceTable.temperatureSteps, step => step.c);

        return Length.createZero();
    }


    private static findFractionalIndex<T>(
        value: T,
        valueList: T[],
        getValueFn: (length: T) => number
    ): number {
        const numValue = getValueFn(value);

        if (valueList.length === 0) {
            throw new Error("Value list cannot be empty.");
        }
    
        if (numValue <= getValueFn(valueList[0])) {
            return 0;
        }
    
        if (numValue >= getValueFn(valueList[valueList.length - 1])) {
            return valueList.length - 1;
        }
    
        // Find the two integers between which the value lies
        for (let i = 0; i < valueList.length - 1; i++) {
            const lowerNumValue = getValueFn(valueList[i]);
            const upperNumValue = getValueFn(valueList[i + 1]);
    
            if (numValue >= lowerNumValue && numValue <= upperNumValue) {
                // Perform linear interpolation
                const fraction = (numValue - lowerNumValue) / (upperNumValue - lowerNumValue);
                return i + fraction;
            }
        }
    
        throw new Error("Value is out of bounds or list is not sorted.");
    }
}
