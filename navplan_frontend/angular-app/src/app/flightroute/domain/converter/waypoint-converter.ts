import {DataItem} from '../../../common/domain/model/data-item';
import {Position2d} from '../../../geo-physics/domain/model/geometry/position2d';
import {Airport} from '../../../aerodrome/domain/model/airport';
import {Navaid} from '../../../navaid/domain/model/navaid';
import {ReportingPoint} from '../../../aerodrome-reporting/domain/model/reporting-point';
import {ReportingSector} from '../../../aerodrome-reporting/domain/model/reporting-sector';
import {UserPoint} from '../../../user-point/domain/model/user-point';
import {Geoname} from '../../../geoname/domain/model/geoname';
import {Waypoint} from '../model/waypoint';
import {AirportWaypointConverter} from './airport-waypoint-converter';
import {NavaidWaypointConverter} from './navaid-waypoint-converter';
import {ReportingpointWaypointConverter} from './reportingpoint-waypoint-converter';
import {ReportingsectorWaypointConverter} from './reportingsector-waypoint-converter';
import {UserpointWaypointConverter} from './userpoint-waypoint-converter';
import {GeonameWaypointConverter} from './geoname-waypoint-converter';


export class WaypointConverter {
    public static createWaypointFromDataItem(dataItem: DataItem, clickPos: Position2d): Waypoint {
        if (dataItem instanceof Waypoint) {
            return dataItem;
        } else if (dataItem instanceof Airport) {
            return AirportWaypointConverter.convert(dataItem);
        } else if (dataItem instanceof Navaid) {
            return NavaidWaypointConverter.convert(dataItem);
        } else if (dataItem instanceof ReportingPoint) {
            return ReportingpointWaypointConverter.convert(dataItem);
        } else if (dataItem instanceof ReportingSector) {
            return ReportingsectorWaypointConverter.convert(dataItem, clickPos);
        } else if (dataItem instanceof UserPoint) {
            return UserpointWaypointConverter.convert(dataItem);
        } else if (dataItem instanceof Geoname) {
            return GeonameWaypointConverter.convert(dataItem);
        } else {
            throw new Error('unknown type of dataItem: ' + dataItem.dataItemType);
        }
    }
}
