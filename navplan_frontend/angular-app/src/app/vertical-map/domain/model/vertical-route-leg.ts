import {AltitudeMetadata} from './altitude-metadata';
import {Waypoint} from '../../../flightroute/domain/model/waypoint';
import {Length} from '../../../geo-physics/domain/model/quantities/length';
import {Time} from '../../../geo-physics/domain/model/quantities/time';
import {VerticalRouteLegStep} from './vertical-route-leg-step';
import {VerticalRouteService} from "../service/vertical-route.service";


export class VerticalRouteLeg {
    public readonly startAlt = new AltitudeMetadata();
    public readonly endAlt = new AltitudeMetadata();
    public minTerrainClearanceAlt: Length; // TODO: get rid of this?
    public warning: string = null;


    constructor(
        public readonly wpStart: Waypoint,
        public readonly wpEnd: Waypoint,
        public readonly isFirstLegFromAirport: boolean,
        public readonly isLastLegToAirport: boolean,
        public readonly startLength: Length,
        public readonly endLength: Length,
        public readonly distance: Length,
        public readonly flightTime: Time,
        public readonly climbTime: Time,
        public readonly steps: VerticalRouteLegStep[]
    ) {
        this.calcLegStepFlightTimes();
        this.calcMinTerrainClearanceForLegsAndSteps();
    }


    private calcLegStepFlightTimes(): void {
        const legLength = this.endLength.subtract(this.startLength);
        this.steps[0].flightTime = Time.ofZero();
        this.steps[0].climbTime = Time.ofZero();
        for (let i = 1; i < this.steps.length; i++) {
            const step = this.steps[i];
            const prevStep = this.steps[i - 1];
            const stepLength = step.stepDist.subtract(prevStep.stepDist);
            const lengthFactor = stepLength.m / legLength.m;
            step.flightTime = this.flightTime.multiplyBy(lengthFactor);
            step.climbTime = this.climbTime.multiplyBy(lengthFactor);
        }
    }


    private calcMinTerrainClearanceForLegsAndSteps(): void {
        let maxLegElevation = Length.ofZero();

        for (const step of this.steps) {
            step.minTerrainClearanceAlt = this.isFirstLegFromAirport || this.isLastLegToAirport
                ? step.elevationAmsl
                : step.elevationAmsl.add(VerticalRouteService.MIN_TERRAIN_CLEARANCE); // TODO

            if (step.minTerrainClearanceAlt.isGreaterThan(maxLegElevation)) {
                maxLegElevation = step.minTerrainClearanceAlt;
            }
        }

        this.minTerrainClearanceAlt = maxLegElevation;
    }
}
