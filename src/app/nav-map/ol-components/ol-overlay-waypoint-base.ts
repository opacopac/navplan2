import {OlOverlayBase} from '../../ol-map/components/ol-overlay-base';
import {Waypoint} from '../../flightroute/domain/waypoint';
import { Directive } from "@angular/core";


@Directive()
export abstract class OlOverlayWaypointBase extends OlOverlayBase {
    public waypoint: Waypoint;
}
