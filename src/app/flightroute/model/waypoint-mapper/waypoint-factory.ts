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
import {Airport} from '../../../map-features/model/airport';
import {Navaid} from '../../../map-features/model/navaid';
import {Reportingpoint} from '../../../map-features/model/reportingpoint';
import {Reportingsector} from '../../../map-features/model/reportingsector';
import {Userpoint} from '../../../map-features/model/userpoint';
import {Geoname} from '../../../map-features/model/geoname';
import {Waypoint} from '../waypoint';


export class WaypointFactory {
    public static createNewWaypointFromDataItem(dataItem: DataItem, clickPos: Position2d): Waypoint {
        if (dataItem instanceof Airport) {
            return this.createWaypoint(new WaypointAirport(dataItem));
        } else if (dataItem instanceof Navaid) {
            return this.createWaypoint(new WaypointNavaid(dataItem));
        } else if (dataItem instanceof Reportingpoint) {
            return this.createWaypoint(new WaypointReportingpoint(dataItem));
        } else if (dataItem instanceof Reportingsector) {
            return this.createWaypoint(new WaypointReportingsector(dataItem, clickPos));
        } else if (dataItem instanceof Userpoint) {
            return this.createWaypoint(new WaypointUserpoint(dataItem));
        } else if (dataItem instanceof Geoname) {
            return this.createWaypoint(new WaypointGeoname(dataItem));
        } else {
            return this.createWaypoint(new WaypointCoordinate(clickPos));
        }
    }


    public static createWaypoint(wpMapper: WaypointBase): Waypoint {
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