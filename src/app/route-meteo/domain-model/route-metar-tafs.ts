import {MetarTaf} from '../../metar-taf/domain-model/metar-taf';


export class RouteMetarTafs {
    public constructor(
        public startMetarTafs: MetarTaf[],
        public endMetarTafs: MetarTaf[],
        public enRouteMetarTafs: MetarTaf[],
    ) {
    }
}
