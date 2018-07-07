import { DataItem } from 'app/shared/model/data-item';
import { WaypointBase } from './waypoint-base';
import { WaypointAirport } from './waypoint-airport';
import { WaypointNavaid } from './waypoint-navaid';
import { WaypointReportingpoint } from './waypoint-reportingpoint';
import { WaypointReportingsector } from './waypoint-reportingsector';
import { WaypointUserpoint } from './waypoint-userpoint';
import { WaypointGeoname } from './waypoint-geoname';
import { Position2d } from '../../../shared/model/geometry/position2d';
import {WaypointCoordinate} from './waypoint-coordinate';
import {Airport} from '../airport';
import {Navaid} from '../navaid';
import {Reportingpoint} from '../reportingpoint';
import {Reportingsector} from '../reportingsector';
import {Userpoint} from '../userpoint';
import {Geoname} from '../geoname';
import {Waypoint} from '../../../flightroute/model/waypoint';


export class WaypointFactory {
    public static createNewWaypointFromItem2(dataItem: DataItem, clickPos: Position2d): Waypoint {
        if (dataItem instanceof Airport) {
            return this.mapWaypoint2(new WaypointAirport(dataItem));
        } else if (dataItem instanceof Navaid) {
            return this.mapWaypoint2(new WaypointNavaid(dataItem));
        } else if (dataItem instanceof Reportingpoint) {
            return this.mapWaypoint2(new WaypointReportingpoint(dataItem));
        } else if (dataItem instanceof Reportingsector) {
            return this.mapWaypoint2(new WaypointReportingsector(dataItem, clickPos));
        } else if (dataItem instanceof Userpoint) {
            return this.mapWaypoint2(new WaypointUserpoint(dataItem));
        } else if (dataItem instanceof Geoname) {
            return this.mapWaypoint2(new WaypointGeoname(dataItem));
        } else {
            return this.mapWaypoint2(new WaypointCoordinate(clickPos));
        }
    }


    public static mapWaypoint2(wpMapper: WaypointBase): Waypoint {
        const wp = new Waypoint(
            wpMapper.getType(),
            wpMapper.getFrequency(),
            wpMapper.getCallsign(),
            wpMapper.getCheckpoint(),
            wpMapper.getRemarks(),
            wpMapper.getSuppInfo(),
            wpMapper.getPosition(),
            wpMapper.getAltitude());
        return wp;
    }
}
