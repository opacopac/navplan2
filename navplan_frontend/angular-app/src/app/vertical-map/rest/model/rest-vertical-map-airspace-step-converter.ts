import {Length} from '../../../geo-physics/domain/model/quantities/length';
import {VerticalMapAirspaceStep} from '../../domain/model/vertical-map-airspace-step';
import {LengthUnit} from '../../../geo-physics/domain/model/quantities/length-unit';


export class RestVerticalMapAirspaceStepConverter {
    public static fromRestList(
        airspaceSteps: [number, number, number][],
        heightUnit: LengthUnit,
        widthUnit: LengthUnit
    ): VerticalMapAirspaceStep[] {
        return airspaceSteps.map(asStep => this.fromRest(
            asStep,
            heightUnit,
            widthUnit
        ));
    }


    public static fromRest(
        airspaceStep: [number, number, number],
        heightUnit: LengthUnit,
        widthUnit: LengthUnit
    ): VerticalMapAirspaceStep {
        return new VerticalMapAirspaceStep(
            new Length(airspaceStep[0], heightUnit),
            new Length(airspaceStep[1], heightUnit),
            new Length(airspaceStep[2], widthUnit),
        );
    }
}
