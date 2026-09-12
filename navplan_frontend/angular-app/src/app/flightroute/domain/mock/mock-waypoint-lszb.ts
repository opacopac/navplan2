import {Waypoint} from "../model/waypoint";
import {Position2d} from "../../../geo-physics/domain/model/geometry/position2d";
import {MockWaypointBuilder} from "./mock-waypoint-builder";


export class MockWaypointLszb {
    public static create(): Waypoint {
        return MockWaypointBuilder.anAdWp()
            .withFreq('121.030')
            .withCallsign('TWR')
            .withCheckpoint('LSZB')
            .withPosition(new Position2d(46.912222222222, 7.4994444444444))
            .build();
    }
}
