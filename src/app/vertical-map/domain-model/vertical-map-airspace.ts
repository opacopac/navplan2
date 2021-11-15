import {VerticalMapAirspaceStep} from './vertical-map-airspace-step';
import {Altitude} from '../../common/geo-math/domain-model/geometry/altitude';


export class VerticalMapAirspace {
    constructor(
        public airspaceId: number,
        public airspaceCategory: string,
        public airspaceName: string,
        public altBottom: Altitude,
        public altTop: Altitude,
        public airspaceSteps: VerticalMapAirspaceStep[],
    ) {
    }
}
