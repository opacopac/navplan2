import {IRestSpeed} from '../../../geo-physics/rest/model/i-rest-speed';

export interface IRestDistancePerformanceCorrectionFactors {
    grassRwyIncPercent: number;
    wetRwyIncPercent: number;
    headwindDecPercent: number;
    headwindDecPerSpeed: IRestSpeed;
    tailwindIncPercent: number;
    tailwindIncPerSpeed: IRestSpeed;
}
