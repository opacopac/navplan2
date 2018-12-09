import {OlOverlayBase} from '../../base-map/components/ol-overlay-base';
import {Waypoint} from '../../flightroute/model/waypoint';


export abstract class OlOverlayWaypointBase extends OlOverlayBase {
    public waypoint: Waypoint;
}
