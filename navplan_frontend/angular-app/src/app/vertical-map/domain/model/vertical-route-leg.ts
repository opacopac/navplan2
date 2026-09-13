import {AltitudeMetadata} from './altitude-metadata';
import {Waypoint} from '../../../flightroute/domain/model/waypoint';
import {Length} from '../../../geo-physics/domain/model/quantities/length';
import {Time} from '../../../geo-physics/domain/model/quantities/time';
import {VerticalRouteLegStep} from './vertical-route-leg-step';
import {Aircraft} from "../../../aircraft/domain/model/aircraft";
import {EnvelopeAltTriage} from "./envelope-alt-triage";
import {VerticalRoute} from "./vertical-route";


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
            const clearance = this.getRequiredTerrainClearance(step);
            step.minTerrainClearanceAlt = step.elevationAmsl.add(clearance);

            if (step.minTerrainClearanceAlt.isGreaterThan(maxLegElevation)) {
                maxLegElevation = step.minTerrainClearanceAlt;
            }
        }

        this.minTerrainClearanceAlt = maxLegElevation;
    }


    private getRequiredTerrainClearance(step: VerticalRouteLegStep): Length {
        if (!this.isFirstLegFromAirport && !this.isLastLegToAirport) {
            return VerticalRoute.MIN_TERRAIN_CLEARANCE;
        }

        const distFromAirport = this.getDistFromNearestAirport(step);

        if (distFromAirport.isLessThanOrEqual(VerticalRoute.MIN_TERRAIN_CLEARANCE_NEAR_AIRPORT_DIST)) {
            return Length.ofFt(0);
        }

        if (distFromAirport.isLessThanOrEqual(VerticalRoute.MIN_TERRAIN_CLEARANCE_FAR_AIRPORT_DIST)) {
            return VerticalRoute.MIN_TERRAIN_CLEARANCE_NEAR_AIRPORT;
        }

        return VerticalRoute.MIN_TERRAIN_CLEARANCE;
    }


    private getDistFromNearestAirport(step: VerticalRouteLegStep): Length {
        const distFromStartAirport = step.stepDist.subtract(this.startLength);
        const distFromEndAirport = this.endLength.subtract(step.stepDist);

        if (this.isFirstLegFromAirport && this.isLastLegToAirport) {
            return distFromStartAirport.isLessThan(distFromEndAirport) ? distFromStartAirport : distFromEndAirport;
        }

        return this.isFirstLegFromAirport ? distFromStartAirport : distFromEndAirport;
    }


    public calcLegStepsEnvelopeBackwards(aircraft: Aircraft): void {
        for (let j = this.steps.length - 2; j >= 0; j--) {
            const step = this.steps[j];
            const nextStep = this.steps[j + 1];

            // calculate standard climb/descent performance backwards from next step
            const perfEnvAlt = nextStep.altMetaData.perfEnv;
            const stepMinClimbAlt = aircraft.calcClimbStartingAlt(perfEnvAlt.minAlt, nextStep.climbTime);
            const stepMaxDecentAlt = aircraft.calcDescentStartingAlt(perfEnvAlt.maxAlt, nextStep.flightTime);

            // calculate steep climb/descent performance backwards from next step
            const perfEnvAltSteep = nextStep.altMetaData.perfEnvSteep;
            const stepMinClimbAltSteep = aircraft.calcClimbStartingAlt(perfEnvAltSteep.minAlt, nextStep.climbTime);
            const stepMaxDecentAltSteep = aircraft.calcSteepDescentStartingAlt(perfEnvAltSteep.maxAlt, nextStep.flightTime);

            EnvelopeAltTriage.determineEnvelopeAltByPrio(
                step.altMetaData,
                step.minTerrainClearanceAlt,
                stepMinClimbAlt,
                stepMaxDecentAlt,
                stepMinClimbAltSteep,
                stepMaxDecentAltSteep
            );
        }
    }


    public calcLegStepsEnvelopeForwards(aircraft: Aircraft): void {
        for (let i = 1; i < this.steps.length; i++) {
            const step = this.steps[i];

            // calculate standard climb/descent performance from previous step
            const prevStep = this.steps[i - 1];
            const prevPerfEnvAlt = prevStep.altMetaData.perfEnv;
            const stepDecentAlt = aircraft.calcDescentTargetAlt(prevPerfEnvAlt.minAlt, step.flightTime);
            const stepClimbAlt = aircraft.calcClimbTargetAlt(prevPerfEnvAlt.maxAlt, step.climbTime);

            const perfEnvAlt = step.altMetaData.perfEnv;
            const stepMaxEnvAlt = stepClimbAlt.isLessThan(perfEnvAlt.maxAlt)
                ? stepClimbAlt
                : stepDecentAlt.isGreaterThan(perfEnvAlt.maxAlt) ? stepDecentAlt : perfEnvAlt.maxAlt;

            const stepMinEnvAlt = stepDecentAlt.isGreaterThan(perfEnvAlt.minAlt)
                ? stepDecentAlt
                : stepClimbAlt.isLessThan(perfEnvAlt.minAlt) ? stepClimbAlt : perfEnvAlt.minAlt;

            // calculate steep climb/descent performance from previous step
            const prevPerfEnvAltSteep = prevStep.altMetaData.perfEnvSteep;
            const stepDecentAltFtSteep = aircraft.calcSteepDescentTargetAlt(prevPerfEnvAltSteep.minAlt, step.flightTime);
            const stepClimbAltFtSteep = aircraft.calcClimbTargetAlt(prevPerfEnvAltSteep.maxAlt, step.climbTime);

            const perfEnvAltSteep = step.altMetaData.perfEnvSteep;
            const stepMaxEnvAltSteep = stepClimbAltFtSteep.isLessThan(perfEnvAltSteep.maxAlt)
                ? stepClimbAltFtSteep
                : stepDecentAltFtSteep.isGreaterThan(perfEnvAltSteep.maxAlt) ? stepDecentAltFtSteep : perfEnvAltSteep.maxAlt;

            const stepMinEnvAltSteep = stepDecentAltFtSteep.isGreaterThan(perfEnvAltSteep.minAlt)
                ? stepDecentAltFtSteep
                : stepClimbAltFtSteep.isLessThan(perfEnvAltSteep.minAlt) ? stepClimbAltFtSteep : perfEnvAltSteep.minAlt;

            EnvelopeAltTriage.determineEnvelopeAltByPrio(
                step.altMetaData,
                step.minTerrainClearanceAlt,
                stepMinEnvAlt,
                stepMaxEnvAlt,
                stepMinEnvAltSteep,
                stepMaxEnvAltSteep
            );
        }
    }
}
