import {Altitude} from '../../../geo-physics/domain/model/geometry/altitude';


export class VerticalCloudLevel {
    public constructor(
        public alt: Altitude,
        public cloudPercent: number
    ) {
    }
}
