import {IRestLength} from '../../../geo-physics/rest/model/i-rest-length';
import {IRestTemperature} from '../../../geo-physics/rest/model/i-rest-temperature';
import {IRestDistancePerformanceCorrectionFactors} from './i-rest-distance-performance-correction-factors';

export interface IRestDistancePerformanceTable {
    profileName: string;
    altitudeReference: string;
    altitudeSteps: IRestLength[];
    temperatureReference: string;
    temperatureSteps: IRestTemperature[];
    distanceValues: IRestLength[][];
    correctionFactors: IRestDistancePerformanceCorrectionFactors;
}
