import { DataItem } from 'app/model/data-item';
import { Waypoint } from '../waypoint';
import { Airport } from '../airport';
import { WaypointBase } from './waypoint-base';
import { WaypointAirport } from './waypoint-airport';
import { Navaid } from '../navaid';
import { WaypointNavaid } from './waypoint-navaid';
import { Reportingpoint } from '../reportingpoint';
import { WaypointReportingpoint } from './waypoint-reportingpoint';
import { Reportingsector } from '../reportingsector';
import { WaypointReportingsector } from './waypoint-reportingsector';
import { Userpoint } from '../userpoint';
import { WaypointUserpoint } from './waypoint-userpoint';
import { Geoname } from '../geoname';
import { WaypointGeoname } from './waypoint-geoname';
import { Position2d } from '../geometry/position2d';
import {WaypointCoordinate} from './waypoint-coordinate';
import {Waypoint2} from '../flightroute/waypoint2';


export class WaypointFactory {
    private constructor() {
    }


    public static createNewWaypointFromItem2(dataItem: DataItem, clickPos: Position2d): Waypoint2 {
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


    public static mapWaypoint2(wpMapper: WaypointBase): Waypoint2 {
        const wp = new Waypoint2(
            wpMapper.getType(),
            wpMapper.getFrequency(),
            wpMapper.getCallsign(),
            wpMapper.getCheckpoint(),
            wpMapper.getRemarks(),
            wpMapper.getSuppInfo(),
            wpMapper.getPosition(),
            wpMapper.getAltitude2());
        return wp;
    }
}
