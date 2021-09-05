import {Airspace} from '../../enroute/domain-model/airspace';
import {Length} from '../../common/geo-math/domain-model/quantities/length';


export class VerticalAirspace {
    constructor(
        public airspace: Airspace,
        public distBotTops: [Length, Length, Length][],
        public totalDistance: Length
    ) {
    }
}
