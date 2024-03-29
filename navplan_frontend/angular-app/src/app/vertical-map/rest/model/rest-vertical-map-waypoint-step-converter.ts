import {VerticalMapWaypointStep} from '../../domain/model/vertical-map-waypoint-step';
import {Length} from '../../../geo-physics/domain/model/quantities/length';
import {LengthUnit} from '../../../geo-physics/domain/model/quantities/length-unit';


export class RestVerticalMapWaypointStepConverter {
    public static fromRestList(
        waypointSteps: [number, number][],
        heightUnit: LengthUnit,
        widthUnit: LengthUnit
    ): VerticalMapWaypointStep[] {
        return waypointSteps.map(wpStep => this.fromRest(
            wpStep,
            heightUnit,
            widthUnit
        ));
    }


    public static fromRest(
        waypointStep: [number, number],
        heightUnit: LengthUnit,
        widthUnit: LengthUnit
    ): VerticalMapWaypointStep {
        return new VerticalMapWaypointStep(
            new Length(waypointStep[0], heightUnit),
            new Length(waypointStep[1], widthUnit),
        );
    }
}
