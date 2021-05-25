import {WaypointType} from '../waypoint-type';
import {ReportingPoint} from '../../../aerodrome/domain-model/reporting-point';
import {WaypointAltitude} from '../waypoint-altitude';
import {Waypoint} from '../waypoint';


export class ReportingpointWaypointConverter {
    public static convert(reportingpoint: ReportingPoint): Waypoint {
        return new Waypoint(
            WaypointType.report,
            '',
            '',
            reportingpoint.name,
            '',
            '',
            reportingpoint.position,
            ReportingpointWaypointConverter.getAltitude(reportingpoint)
        );
    }


    private static getAltitude(reportingpoint: ReportingPoint): WaypointAltitude {
        if (reportingpoint.alt_max) {
            return new WaypointAltitude(reportingpoint.alt_max.ft, false, true, false);
        } else if (reportingpoint.alt_min) {
            return new WaypointAltitude(reportingpoint.alt_min.ft, true, false, false);
        } else {
            return new WaypointAltitude();
        }
    }
}
