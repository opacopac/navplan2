import {Position2d} from '../../../common/geo-math/domain-model/geometry/position2d';
import {ReportingSector} from '../../../aerodrome/domain-model/reporting-sector';
import {WaypointType} from '../waypoint-type';
import {WaypointAltitude} from '../waypoint-altitude';
import {Waypoint} from '../waypoint';


export class ReportingsectorWaypointConverter {
    public static convert(reportingsector: ReportingSector, clickPosition: Position2d) {
        return new Waypoint(
            WaypointType.report,
            '',
            '',
            reportingsector.name,
            '',
            '',
            clickPosition,
            ReportingsectorWaypointConverter.getAltitude(reportingsector)
        );
    }


    private static getAltitude(reportingsector: ReportingSector): WaypointAltitude {
        if (reportingsector.alt_max) {
            return new WaypointAltitude(reportingsector.alt_max.ft, false, true, false);
        } else if (reportingsector.alt_min) {
            return new WaypointAltitude(reportingsector.alt_min.ft, true, false, false);
        } else {
            return new WaypointAltitude();
        }
    }
}
