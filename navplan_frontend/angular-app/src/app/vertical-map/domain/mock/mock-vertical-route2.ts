import {VerticalRoute} from "../model/vertical-route";
import {Length} from "../../../geo-physics/domain/model/quantities/length";
import {MockAircraftBr23} from "../../../aircraft/domain/mock/mock-aircraft-br23";
import {MockWaypointBuilder} from "../../../flightroute/domain/mock/mock-waypoint-builder";
import {MockWpStepBuilder} from "./mock-wp-step-builder";
import {MockTerrStepBuilder} from "./mock-terr-step-builder";


export class MockVerticalRoute2 {
    public static WP1 = MockWaypointBuilder.anAdWp('WP1').build();
    public static WP2 = MockWaypointBuilder.anAdWp('WP2').build();
    public static WPS1 = MockWpStepBuilder.aStepAltDistWp(0, 0, this.WP1).build();
    public static WPS2 = MockWpStepBuilder.aStepAltDistWp(0, 20, this.WP2).build();
    public static TS1 = MockTerrStepBuilder.aStepElevDist(0, 0).build();
    public static TS2 = MockTerrStepBuilder.aStepElevDist(5000, 5).build();
    public static TS3 = MockTerrStepBuilder.aStepElevDist(10000, 10).build();
    public static TS4 = MockTerrStepBuilder.aStepElevDist(5000, 15).build();
    public static TS5 = MockTerrStepBuilder.aStepElevDist(0, 20).build();
    public static CRUISE_ALT = Length.ofFt(4500);
    public static AIRCRAFT = MockAircraftBr23.create();


    public static create(): VerticalRoute {
        return new VerticalRoute(
            [this.WPS1, this.WPS2],
            [this.TS1, this.TS2, this.TS3, this.TS4, this.TS5],
            this.CRUISE_ALT,
            this.AIRCRAFT
        )
    }
}
