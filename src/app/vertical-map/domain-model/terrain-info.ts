import {Length} from '../../common/geo-math/domain-model/quantities/length';
import {Pair} from '../../common/model/pair';


export class TerrainInfo {
    constructor(
        public distanceElevations: Pair<Length, Length>[],
        public totalDistance: Length
    ) {
    }
}
