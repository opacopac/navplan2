import {OlOverlayBase} from '../../base-map/ng-components/ol-overlay-base';
import {Waypoint} from '../../flightroute/domain-model/waypoint';
import {Directive} from '@angular/core';


@Directive()
export abstract class OlOverlayWaypointBase extends OlOverlayBase {
    public waypoint: Waypoint;
}
