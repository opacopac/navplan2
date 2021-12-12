import {Length} from '../../geo-physics/domain-model/quantities/length';
import {RouteMetarTafSet} from '../../route-meteo/domain-model/route-metar-taf-set';


export interface RouteMeteoState {
    maxMeteoRadius: Length;
    routeMetarTafs: RouteMetarTafSet;
}
