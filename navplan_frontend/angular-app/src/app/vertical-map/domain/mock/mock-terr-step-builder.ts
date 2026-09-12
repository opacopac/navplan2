import {Length} from "../../../geo-physics/domain/model/quantities/length";
import {VerticalMapTerrainStep} from "../model/vertical-map-terrain-step";


export class MockTerrStepBuilder {
    private elevation = Length.ofFt(0);
    private horDist = Length.ofNm(0);


    public static aStep(): MockTerrStepBuilder {
        return new MockTerrStepBuilder();
    }


    public static aStepElevDist(elevationFt: number, horDistNm: number): MockTerrStepBuilder {
        return this.aStep().withElevFtDistNm(elevationFt, horDistNm);
    }


    public withElevation(elevation: Length): MockTerrStepBuilder {
        this.elevation = elevation;
        return this;
    }


    public withHorDist(horDist: Length): MockTerrStepBuilder {
        this.horDist = horDist;
        return this;
    }


    public withElevFtDistNm(elevationFt: number, horDistNm: number): MockTerrStepBuilder {
        this.withElevation(Length.ofFt(elevationFt));
        this.withHorDist(Length.ofNm(horDistNm));
        return this;
    }


    public build(): VerticalMapTerrainStep {
        return new VerticalMapTerrainStep(
            this.elevation,
            this.horDist,
        );
    }
}
