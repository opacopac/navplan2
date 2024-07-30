import {Weight} from '../../../geo-physics/domain/model/quantities/weight';
import {DistancePerformanceCorrectionFactors} from './distance-performance-correction-factors';
import {Length} from '../../../geo-physics/domain/model/quantities/length';
import {Temperature} from '../../../geo-physics/domain/model/quantities/temperature';
import {PerformanceTableAltitudeReference} from './performance-table-altitude-reference';
import {PerformanceTableTemperatureReference} from './performance-table-temperature-reference';

export class DistancePerformanceTable {
    constructor(
        public takeoffWeight: Weight,
        public altitudeReference: PerformanceTableAltitudeReference,
        public altitudeSteps: Length[],
        public temperatureReference: PerformanceTableTemperatureReference,
        public temperatureSteps: Temperature[],
        public distanceValues: Length[][],
        public correctionFactors: DistancePerformanceCorrectionFactors
    ) {
    }


    public clone(): DistancePerformanceTable {
        return new DistancePerformanceTable(
            this.takeoffWeight?.clone(),
            this.altitudeReference,
            this.altitudeSteps?.map(step => step.clone()),
            this.temperatureReference,
            this.temperatureSteps?.map(step => step.clone()),
            this.distanceValues?.map(row => row.map(value => value.clone())),
            this.correctionFactors?.clone()
        );
    }
}
