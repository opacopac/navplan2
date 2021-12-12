import {Length} from '../../geo-physics/domain-model/quantities/length';
import {RouteMetarTafs} from '../../route-meteo/domain-model/route-metar-tafs';


export interface RouteMeteoState {
    maxMeteoRadius: Length;
    routeMetarTafs: RouteMetarTafs;
}
