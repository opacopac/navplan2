import {Position2d} from '../../../../geo-physics/domain/model/geometry/position2d';
import {ReportingSector} from '../../../../aerodrome-reporting/domain/model/reporting-sector';
import {WaypointType} from '../waypoint-type';
import {WaypointAltitude} from '../waypoint-altitude';
import {Waypoint} from '../waypoint';
import {Altitude} from '../../../../geo-physics/domain/model/geometry/altitude';
import {AltitudeUnit} from '../../../../geo-physics/domain/model/geometry/altitude-unit';
import {AltitudeReference} from '../../../../geo-physics/domain/model/geometry/altitude-reference';


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
            return new WaypointAltitude(
                new Altitude(reportingsector.alt_max.ft, AltitudeUnit.FT, AltitudeReference.MSL),
                false, true, false
            );
        } else if (reportingsector.alt_min) {
            return new WaypointAltitude(
                new Altitude(reportingsector.alt_min.ft, AltitudeUnit.FT, AltitudeReference.MSL),
                true, false, false
            );
        } else {
            return new WaypointAltitude();
        }
    }
}
