import {RouteMetarTaf} from './route-metar-taf';


export class RouteMetarTafSet {
    public constructor(
        public startMetarTafs: RouteMetarTaf[],
        public endMetarTafs: RouteMetarTaf[],
        public altMetarTafs: RouteMetarTaf[],
        public enRouteMetarTafs: RouteMetarTaf[],
    ) {
    }
}
