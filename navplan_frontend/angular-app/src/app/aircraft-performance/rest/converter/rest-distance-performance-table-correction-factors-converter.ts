import {DistancePerformanceCorrectionFactors} from '../../domain/model/distance-performance-correction-factors';
import {IRestDistancePerformanceCorrectionFactors} from '../model/i-rest-distance-performance-correction-factors';
import {RestSpeedConverter} from '../../../geo-physics/rest/model/rest-speed-converter';


export class RestDistancePerformanceTableCorrectionFactorsConverter {
    public static fromRest(restFactors: IRestDistancePerformanceCorrectionFactors): DistancePerformanceCorrectionFactors {
        if (!restFactors) {
            return undefined;
        }

        return new DistancePerformanceCorrectionFactors(
            restFactors.grassRwyIncPercent,
            restFactors.wetRwyIncPercent,
            restFactors.headwindDecPercent,
            RestSpeedConverter.fromRest(restFactors.headwindDecPerSpeed),
            restFactors.tailwindIncPercent,
            RestSpeedConverter.fromRest(restFactors.tailwindIncPerSpeed),
        );
    }


    public static toRest(factors: DistancePerformanceCorrectionFactors): IRestDistancePerformanceCorrectionFactors {
        if (!factors) {
            return undefined;
        }

        return {
            grassRwyIncPercent: factors.grassRwyIncPercent,
            wetRwyIncPercent: factors.wetRwyIncPercent,
            headwindDecPercent: factors.headwindDecPercent,
            headwindDecPerSpeed: RestSpeedConverter.toRest(factors.headwindDecPerSpeed),
            tailwindIncPercent: factors.tailwindIncPercent,
            tailwindIncPerSpeed: RestSpeedConverter.toRest(factors.tailwindIncPerSpeed)
        };
    }
}
