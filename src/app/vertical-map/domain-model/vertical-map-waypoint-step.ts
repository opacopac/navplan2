import {Length} from '../../common/geo-math/domain-model/quantities/length';
import {Waypoint} from '../../flightroute/domain-model/waypoint';


export class VerticalMapWaypointStep {
    public waypoint: Waypoint;


    constructor(
        public altAmsl: Length,
        public horDist: Length
    ) {
    }
}
