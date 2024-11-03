import { Speed } from "../../../geo-physics/domain/model/quantities/speed";
import { DistancePerformanceConditions } from "../model/distance-performance-conditions";


export class MockZeroDistnacePerformanceConditions {
    public static create(): DistancePerformanceConditions {
        return new DistancePerformanceConditions(
            false,
            false,
            0,
            Speed.ofZero(),
        );
    }
}
