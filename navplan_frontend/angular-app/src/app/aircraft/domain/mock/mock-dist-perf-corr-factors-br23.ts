import { Speed } from "../../../geo-physics/domain/model/quantities/speed";
import { DistancePerformanceCorrectionFactors } from "../model/distance-performance-correction-factors";


export class MockDistPerfCorrFactorsBr23 {
    public static createTkoffDistCorrFactors(): DistancePerformanceCorrectionFactors {
        return new DistancePerformanceCorrectionFactors(
            14,
            0,
            15,
            Speed.ofKt(5),
            20,
            Speed.ofKt(5)
        );
    }


    public static createLandDistCorrFactors(): DistancePerformanceCorrectionFactors {
        return new DistancePerformanceCorrectionFactors(
            18,
            15,
            5,
            Speed.ofKt(5),
            10,
            Speed.ofKt(5)
        );
    }
}
