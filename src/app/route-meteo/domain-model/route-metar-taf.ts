import {Length} from '../../geo-physics/domain-model/quantities/length';
import {MetarTaf} from '../../metar-taf/domain-model/metar-taf';


export class RouteMetarTaf {
    public constructor(
        public metarTaf: MetarTaf,
        public distance: Length
    ) {
    }
}
