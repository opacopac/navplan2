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

            // calculate climb/descent performance backwards from next step
            const stepMinClimbAlt = aircraft.calcClimbStartingAlt(nextStep.altMetaData.perfEnv.minAlt, nextStep.climbTime);
            const stepMaxDecentAlt = aircraft.calcDescentStartingAlt(nextStep.altMetaData.perfEnv.maxAlt, nextStep.flightTime);

            const stepMinClimbAltSteep = aircraft.calcClimbStartingAlt(nextStep.altMetaData.perfEnvSteep.minAlt, nextStep.climbTime);
            const stepMaxDecentAltSteep = aircraft.calcDescentStartingAlt(
                nextStep.altMetaData.perfEnvSteep.maxAlt,
                nextStep.flightTime,
                Aircraft.MAX_DESCENT_RATE_WITHOUT_WARNING
            );

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

            // calculate climb/descent performance from previous step
            const prevStep = this.steps[i - 1];
            const stepDecentAltFt = aircraft.calcDescentTargetAlt(prevStep.altMetaData.perfEnv.minAlt, step.flightTime);
            const stepClimbAltFt = aircraft.calcClimbTargetAlt(prevStep.altMetaData.perfEnv.maxAlt, step.climbTime);

            const stepMaxEnvAlt = stepClimbAltFt.isLessThan(step.altMetaData.perfEnv.maxAlt)
                ? stepClimbAltFt
                : stepDecentAltFt.isGreaterThan(step.altMetaData.perfEnv.maxAlt)
                    ? stepDecentAltFt
                    : step.altMetaData.perfEnv.maxAlt;

            const stepMinEnvAlt = stepDecentAltFt.isGreaterThan(step.altMetaData.perfEnv.minAlt)
                ? stepDecentAltFt
                : stepClimbAltFt.isLessThan(step.altMetaData.perfEnv.minAlt)
                    ? stepClimbAltFt
                    : step.altMetaData.perfEnv.minAlt;

            const stepDecentAltFtSteep = aircraft.calcDescentTargetAlt(
                prevStep.altMetaData.perfEnvSteep.minAlt,
                step.flightTime,
                Aircraft.MAX_DESCENT_RATE_WITHOUT_WARNING
            );
            const stepClimbAltFtSteep = aircraft.calcClimbTargetAlt(prevStep.altMetaData.perfEnvSteep.maxAlt, step.climbTime);

            const stepMaxEnvAltSteep = stepClimbAltFtSteep.isLessThan(step.altMetaData.perfEnvSteep.maxAlt)
                ? stepClimbAltFtSteep
                : stepDecentAltFtSteep.isGreaterThan(step.altMetaData.perfEnvSteep.maxAlt)
                    ? stepDecentAltFtSteep
                    : step.altMetaData.perfEnvSteep.maxAlt;

            const stepMinEnvAltSteep = stepDecentAltFtSteep.isGreaterThan(step.altMetaData.perfEnvSteep.minAlt)
                ? stepDecentAltFtSteep
                : stepClimbAltFtSteep.isLessThan(step.altMetaData.perfEnvSteep.minAlt)
                    ? stepClimbAltFtSteep
                    : step.altMetaData.perfEnvSteep.minAlt;

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
