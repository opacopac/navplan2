import {Length} from '../../geo-physics/domain-model/quantities/length';
import {VerticalMapTerrainStep} from '../../vertical-map/domain-model/vertical-map-terrain-step';
import {LengthUnit} from '../../geo-physics/domain-model/quantities/length-unit';


export class RestVerticalMapTerrainStepConverter {
    public static fromRestList(
        terrainSteps: [number, number][],
        heightUnit: LengthUnit,
        widthUnit: LengthUnit
    ): VerticalMapTerrainStep[] {
        return terrainSteps.map(wpStep => this.fromRest(
            wpStep,
            heightUnit,
            widthUnit
        ));
    }


    public static fromRest(
        terrainStep: [number, number],
        heightUnit: LengthUnit,
        widthUnit: LengthUnit
    ): VerticalMapTerrainStep {
        return new VerticalMapTerrainStep(
            new Length(terrainStep[0], heightUnit),
            new Length(terrainStep[1], widthUnit),
        );
    }
}
