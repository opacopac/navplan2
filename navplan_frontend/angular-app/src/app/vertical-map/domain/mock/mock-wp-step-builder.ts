import {VerticalMapWaypointStep} from "../model/vertical-map-waypoint-step";
import {Length} from "../../../geo-physics/domain/model/quantities/length";
import {MockWaypointBuilder} from "../../../flightroute/domain/mock/mock-waypoint-builder";
import {Waypoint} from "../../../flightroute/domain/model/waypoint";


export class MockWpStepBuilder {
    private altAmsl = Length.ofFt(0);
    private horDist = Length.ofNm(0);
    private Waypoint = MockWaypointBuilder.aWp().build();


    public static aStep(): MockWpStepBuilder {
        return new MockWpStepBuilder();
    }


    public static aStepAltDist(altAmslFt: number, horDistNm: number): MockWpStepBuilder {
        return this.aStep().withAltFtDistNm(altAmslFt, horDistNm);
    }


    public static aStepAltDistWp(altAmslFt: number, horDistNm: number, wp: Waypoint): MockWpStepBuilder {
        return this.aStepAltDist(altAmslFt, horDistNm).withWp(wp);
    }


    public withAltAmsl(altAmsl: Length): MockWpStepBuilder {
        this.altAmsl = altAmsl;
        return this;
    }


    public withHorDist(horDist: Length): MockWpStepBuilder {
        this.horDist = horDist;
        return this;
    }


    public withAltFtDistNm(altAmslFt: number, horDistNm: number): MockWpStepBuilder {
        this.withAltAmsl(Length.ofFt(altAmslFt));
        this.withHorDist(Length.ofNm(horDistNm));
        return this;
    }


    public withWp(wp: any): MockWpStepBuilder {
        this.Waypoint = wp;
        return this;
    }


    public build(): VerticalMapWaypointStep {
        const step = new VerticalMapWaypointStep(
            this.altAmsl,
            this.horDist,
        );
        step.waypoint = this.Waypoint;
        return step;
    }
}
