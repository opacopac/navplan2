import {DataItem} from '../../common/model/data-item';
import {Position2d} from '../../geo-physics/domain-model/geometry/position2d';
import {MetarTaf} from '../../metar-taf/domain-model/metar-taf';
import {Notam} from '../../notam/domain-model/notam';
import {Waypoint} from '../../flightroute/domain-model/waypoint';


export interface OverlayState {
    dataItem: DataItem;
    waypoint: Waypoint;
    clickPos: Position2d;
    metarTaf: MetarTaf;
    notams: Notam[];
    tabIndex: number;
}
