import {Position3d} from '../../common/geo-math/domain-model/geometry/position3d';
import {Flightroute} from '../../flightroute/domain-model/flightroute';
import {VerticalAirspace} from './vertical-airspace';


export interface VerticalMapState {
    isVisible: boolean;
    flightRoute: Flightroute;
    terrainPos: Position3d[];
    verticalAirspaces: VerticalAirspace[];
}
