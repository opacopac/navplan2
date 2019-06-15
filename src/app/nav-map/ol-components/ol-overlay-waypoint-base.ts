import {OlOverlayBase} from '../../base-map/components/ol-overlay-base';
import {Waypoint} from '../../flightroute/domain/waypoint';


export abstract class OlOverlayWaypointBase extends OlOverlayBase {
    public waypoint: Waypoint;
}
