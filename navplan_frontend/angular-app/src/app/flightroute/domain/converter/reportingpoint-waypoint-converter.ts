import {WaypointType} from '../model/waypoint-type';
import {ReportingPoint} from '../../../aerodrome-reporting/domain/model/reporting-point';
import {WaypointAltitude} from '../model/waypoint-altitude';
import {Waypoint} from '../model/waypoint';
import {AltitudeUnit} from '../../../geo-physics/domain/model/geometry/altitude-unit';
import {AltitudeReference} from '../../../geo-physics/domain/model/geometry/altitude-reference';
import {Altitude} from '../../../geo-physics/domain/model/geometry/altitude';


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
            return new WaypointAltitude(
                new Altitude(reportingpoint.alt_max.ft, AltitudeUnit.FT, AltitudeReference.MSL),
                false, true, false
            );
        } else if (reportingpoint.alt_min) {
            return new WaypointAltitude(
                new Altitude(reportingpoint.alt_min.ft, AltitudeUnit.FT, AltitudeReference.MSL),
                true, false, false
            );
        } else {
            return new WaypointAltitude();
        }
    }
}
