import { DistancePerformanceCorrectionFactors } from '../../../aircraft/domain/model/distance-performance-correction-factors';
import { DistancePerformanceTable } from '../../../aircraft/domain/model/distance-performance-table';
import { PerformanceTableAltitudeReference } from '../../../aircraft/domain/model/performance-table-altitude-reference';
import { PerformanceTableTemperatureReference } from '../../../aircraft/domain/model/performance-table-temperature-reference';
import {Length} from '../../../geo-physics/domain/model/quantities/length';
import { Speed } from '../../../geo-physics/domain/model/quantities/speed';
import { Weight } from '../../../geo-physics/domain/model/quantities/weight';
import { WeightUnit } from '../../../geo-physics/domain/model/quantities/weight-unit';
import {AtmosphereService} from '../../../geo-physics/domain/service/meteo/atmosphere.service';
import { PlanPerformanceService } from './plan-performance.service';

describe('PlanPerformanceService', () => {
    var mockTkoffWeight: Weight = new Weight(1000, WeightUnit.KG);
    var mockCorrecionFactors = new DistancePerformanceCorrectionFactors(
        0,
        0,
        0,
        Speed.ofKt(0),
        0,
        Speed.ofKt(0),
    );
    var mockDistPerfTable1: DistancePerformanceTable = new DistancePerformanceTable(
        mockTkoffWeight,
        PerformanceTableAltitudeReference.PRESSURE_ALTITUDE,
        [],
        PerformanceTableTemperatureReference.OUTSIDE_TEMPERATURE,
        [],
        [],
        null
    );


    beforeEach(() => {
    });


    it('calculates the correct altitude for standard pressure at sea level', () => {
        // given
        const elevation = Length.createZero();
        const qnh = AtmosphereService.getStandardPressure();
        cons distperfTbl = new DistancePerformanceTable(

        );

        // when
        const tkoffRoll = PlanPerformanceService.calcTakeOffGroundRoll(elevation, qnh, null, null, null);

        // then
        expect(pa.value).toBe(0);
    });
});
