import {Length} from '../../common/geo-math/domain-model/quantities/length';
import {LengthUnit} from '../../common/geo-math/domain-model/quantities/units';
import {VerticalMapTerrainStep} from '../domain-model/vertical-map-terrain-step';


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
