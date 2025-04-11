import {Speed} from '../../../geo-physics/domain/model/quantities/speed';
import {DistancePerformanceConditions} from '../model/distance-performance-conditions';


export class MockPerfDistConditionsZero {
    public static create(): DistancePerformanceConditions {
        return new DistancePerformanceConditions(
            false,
            false,
            Speed.ofZero(),
            0,
        );
    }
}
