import {VerticalRoute} from "../model/vertical-route";
import {Length} from "../../../geo-physics/domain/model/quantities/length";
import {MockAircraftBr23} from "../../../aircraft/domain/mock/mock-aircraft-br23";
import {MockWaypointBuilder} from "../../../flightroute/domain/mock/mock-waypoint-builder";
import {MockWpStepBuilder} from "./mock-wp-step-builder";
import {MockTerrStepBuilder} from "./mock-terr-step-builder";


export class MockVerticalRoute1 {
    public static WP1 = MockWaypointBuilder.anAdWp('WP1').build();
    public static WP2 = MockWaypointBuilder.aWp('WP2').withVacMin(5).withAlt(5000, true).build();
    public static WP3 = MockWaypointBuilder.aWp('WP3').withAlt(5000, true).build();
    public static WP4 = MockWaypointBuilder.anAdWp('WP4').withVacMin(5).build();
    public static WPS1 = MockWpStepBuilder.aStepAltDistWp(0, 0, this.WP1).build();
    public static WPS2 = MockWpStepBuilder.aStepAltDistWp(0, 10, this.WP2).build();
    public static WPS3 = MockWpStepBuilder.aStepAltDistWp(0, 20, this.WP3).build();
    public static WPS4 = MockWpStepBuilder.aStepAltDistWp(0, 30, this.WP4).build();
    public static TS1 = MockTerrStepBuilder.aStepElevDist(1000, 0).build();
    public static TS2 = MockTerrStepBuilder.aStepElevDist(1100, 5).build();
    public static TS3 = MockTerrStepBuilder.aStepElevDist(1200, 10).build();
    public static TS4 = MockTerrStepBuilder.aStepElevDist(1300, 15).build();
    public static TS5 = MockTerrStepBuilder.aStepElevDist(1400, 20).build();
    public static TS6 = MockTerrStepBuilder.aStepElevDist(1200, 25).build();
    public static TS7 = MockTerrStepBuilder.aStepElevDist(1100, 30).build();
    public static CRUISE_ALT = Length.ofFt(5500);
    public static AIRCRAFT = MockAircraftBr23.create();


    public static create(): VerticalRoute {
        return new VerticalRoute(
            [this.WPS1, this.WPS2, this.WPS3, this.WPS4],
            [this.TS1, this.TS2, this.TS3, this.TS4, this.TS5, this.TS6, this.TS7],
            this.CRUISE_ALT,
            this.AIRCRAFT
        )
    }
}
