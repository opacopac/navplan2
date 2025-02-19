import {IRestDistancePerformanceTable} from '../model/i-rest-distance-performance-table';
import {DistancePerformanceTable} from '../../domain/model/distance-performance-table';
import {PerformanceTableAltitudeReference} from '../../domain/model/performance-table-altitude-reference';
import {RestLengthConverter} from '../../../geo-physics/rest/model/rest-length-converter';
import {PerformanceTableTemperatureReference} from '../../domain/model/performance-table-temperature-reference';
import {RestTemperatureConverter} from '../../../geo-physics/rest/model/rest-temperature-converter';
import {
    RestDistancePerformanceTableCorrectionFactorsConverter
} from './rest-distance-performance-table-correction-factors-converter';


export class RestDistancePerformanceTableConverter {
    public static fromRest(restTable: IRestDistancePerformanceTable): DistancePerformanceTable {
        if (!restTable) {
            return undefined;
        }

        return new DistancePerformanceTable(
            restTable.profileName,
            PerformanceTableAltitudeReference[restTable.altitudeReference],
            RestLengthConverter.fromRestList(restTable.altitudeSteps),
            PerformanceTableTemperatureReference[restTable.temperatureReference],
            RestTemperatureConverter.fromRestList(restTable.temperatureSteps),
            restTable.distanceValues.map(row => RestLengthConverter.fromRestList(row)),
            RestDistancePerformanceTableCorrectionFactorsConverter.fromRest(restTable.correctionFactors)
        );
    }


    public static toRest(table: DistancePerformanceTable): IRestDistancePerformanceTable {
        if (!table) {
            return undefined;
        }

        return {
            profileName: table.profileName,
            altitudeReference: PerformanceTableAltitudeReference[table.altitudeReference],
            altitudeSteps: RestLengthConverter.toRestList(table.altitudeSteps),
            temperatureReference: PerformanceTableTemperatureReference[table.temperatureReference],
            temperatureSteps: RestTemperatureConverter.toRestList(table.temperatureSteps),
            distanceValues: table.distanceValues.map(row => RestLengthConverter.toRestList(row)),
            correctionFactors: RestDistancePerformanceTableCorrectionFactorsConverter.toRest(table.correctionFactors)
        };
    }
}
