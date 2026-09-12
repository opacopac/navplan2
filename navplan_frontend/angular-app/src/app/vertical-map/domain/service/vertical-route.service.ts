import {Injectable} from '@angular/core';
import {VerticalRouteLeg} from '../model/vertical-route-leg';
import {VerticalMapTerrainStep} from '../model/vertical-map-terrain-step';
import {VerticalMapWaypointStep} from '../model/vertical-map-waypoint-step';
import {WaypointType} from '../../../flightroute/domain/model/waypoint-type';
import {AltitudeMetadata} from '../model/altitude-metadata';
import {Length} from '../../../geo-physics/domain/model/quantities/length';
import {Aircraft} from '../../../aircraft/domain/model/aircraft';
import {VerticalRouteLegStep} from '../model/vertical-route-leg-step';
import {Time} from '../../../geo-physics/domain/model/quantities/time';
import {IVerticalRouteService} from "./i-vertical-route.service";


@Injectable()
export class VerticalRouteService implements IVerticalRouteService {
    public static MIN_TERRAIN_CLEARANCE = Length.ofFt(1000);
    public static MIN_TERRAIN_CLEARANCE_FOR_WARNING = Length.ofFt(500);


    constructor() {
    }


    public calcLegAltitudeMetadata(
        waypointSteps: VerticalMapWaypointStep[],
        terrainSteps: VerticalMapTerrainStep[],
        cruiseAltitude: Length,
        aircraft: Aircraft
    ): VerticalRouteLeg[] {
        const legs = this.initLegsAndSteps(waypointSteps, terrainSteps, aircraft);
        this.calcLegStepFlightTimes(legs);
        this.calcMinTerrainClearanceForLegsAndSteps(legs);
        this.getUserAltitudesForLegs(legs);
        this.clampLegsToFromAirportToGround(legs, terrainSteps);
        this.initStepsWithUserAltitudes(legs);
        this.calcLegsEnvelopeBackwards(legs, aircraft);
        this.calcLegsEnvelopeForwards(legs, aircraft);
        this.calcStepDisplayAlts2(legs, cruiseAltitude, aircraft);

        return legs;
    }


    private initLegsAndSteps(
        waypointSteps: VerticalMapWaypointStep[],
        terrainSteps: VerticalMapTerrainStep[],
        aircraft: Aircraft
    ): VerticalRouteLeg[] {
        const legs: VerticalRouteLeg[] = [];
        for (let i = 0; i < waypointSteps.length - 1; i++) {
            const wpStep = waypointSteps[i];
            const nextWpStep = waypointSteps[i + 1];
            const startLength = wpStep.horDist;
            const endLength = nextWpStep.horDist;
            const legDist = endLength.subtract(startLength);
            const extraTime = nextWpStep.waypoint.vacTime;
            const flightTime = aircraft.calcCruiseFlightTime(legDist, extraTime);
            const climbTime = aircraft.calcCruiseClimbFlightTime(legDist, extraTime);
            const isFirstLegFromAirport = i === 0 && wpStep.waypoint.type === WaypointType.airport;
            const isLastLegToAirport = i === waypointSteps.length - 2 && nextWpStep.waypoint.type === WaypointType.airport;
            const legSteps = terrainSteps
                .filter(step => step.horDist.m >= startLength.m && step.horDist.m <= endLength.m)
                .map(step => new VerticalRouteLegStep(step.horDist, step.elevationAmsl));
            const leg = new VerticalRouteLeg(
                wpStep.waypoint,
                nextWpStep.waypoint,
                isFirstLegFromAirport,
                isLastLegToAirport,
                wpStep.horDist,
                nextWpStep.horDist,
                legDist,
                flightTime,
                climbTime,
                legSteps
            );
            legs.push(leg);
        }

        return legs;
    }


    private calcLegStepFlightTimes(legs: VerticalRouteLeg[]): void {
        for (const leg of legs) {
            const legLength = leg.endLength.subtract(leg.startLength);
            leg.steps[0].flightTime = Time.ofZero();
            leg.steps[0].climbTime = Time.ofZero();
            for (let i = 1; i < leg.steps.length; i++) {
                const step = leg.steps[i];
                const prevStep = leg.steps[i - 1];
                const stepLength = step.stepDist.subtract(prevStep.stepDist);
                const lengthFactor = stepLength.m / legLength.m;
                step.flightTime = leg.flightTime.multiplyBy(lengthFactor);
                step.climbTime = leg.climbTime.multiplyBy(lengthFactor);
            }
        }
    }


    private calcMinTerrainClearanceForLegsAndSteps(legs: VerticalRouteLeg[]): void {
        for (const leg of legs) {
            let maxLegElevation = Length.ofZero();

            for (const step of leg.steps) {
                step.minTerrainClearanceAlt = leg.isFirstLegFromAirport || leg.isLastLegToAirport
                    ? step.elevationAmsl
                    : step.elevationAmsl.add(VerticalRouteService.MIN_TERRAIN_CLEARANCE);

                if (step.minTerrainClearanceAlt.isGreaterThan(maxLegElevation)) {
                    maxLegElevation = step.minTerrainClearanceAlt;
                }
            }

            leg.minTerrainClearanceAlt = maxLegElevation;
        }
    }


    private getUserAltitudesForLegs(legs: VerticalRouteLeg[]): void {
        for (let i = legs.length - 1; i >= 0; i--) {
            const leg = legs[i];
            if (!leg.wpEnd.wpAlt || !leg.wpEnd.wpAlt.alt) {
                continue;
            }

            const maxAlt = leg.wpEnd.getMaxAlt()?.getHeightAmsl();
            const minAlt = leg.wpEnd.getMinAlt()?.getHeightAmsl();

            if (leg.wpEnd.wpAlt.isaltatlegstart) {
                leg.startAlt.user.maxAlt = maxAlt;
                leg.startAlt.user.minAlt = minAlt;
            } else {
                leg.endAlt.user.maxAlt = maxAlt;
                leg.endAlt.user.minAlt = minAlt;
            }
        }
    }


    private clampLegsToFromAirportToGround(legs: VerticalRouteLeg[], terrainSteps: VerticalMapTerrainStep[]): void {
        const firstLeg = legs[0];
        if (firstLeg.isFirstLegFromAirport) {
            const firstElevation = terrainSteps[0].elevationAmsl;
            firstLeg.startAlt.user.maxAlt = firstElevation;
            firstLeg.startAlt.user.minAlt = firstElevation;
        }

        const lastLeg = legs[legs.length - 1];
        if (lastLeg.isLastLegToAirport) {
            const lastElevation = terrainSteps[terrainSteps.length - 1].elevationAmsl;
            lastLeg.endAlt.user.maxAlt = lastElevation;
            lastLeg.endAlt.user.minAlt = lastElevation;
        }
    }


    private initStepsWithUserAltitudes(legs: VerticalRouteLeg[]): void {
        for (const leg of legs) {
            const firstStep = leg.steps[0];
            const lastStep = leg.steps[leg.steps.length - 1];

            firstStep.altMetaData.user.minAlt = leg.startAlt.user.minAlt;
            firstStep.altMetaData.user.maxAlt = leg.startAlt.user.maxAlt;
            lastStep.altMetaData.user.minAlt = leg.endAlt.user.minAlt;
            lastStep.altMetaData.user.maxAlt = leg.endAlt.user.maxAlt;
        }
    }


    private calcLegsEnvelopeForwards(legs: VerticalRouteLeg[], aircraft: Aircraft): void {
        for (let i = 0; i < legs.length; i++) {
            const leg = legs[i];
            const firstStep = leg.steps[0];

            // init leg start envelope altitudes
            if (i === 0) {
                this.determineEnvelopeAltByPrio(
                    leg.startAlt,
                    firstStep.minTerrainClearanceAlt,
                    firstStep.minTerrainClearanceAlt,
                    aircraft.serviceCeiling
                );
            } else {
                const prevLeg = legs[i - 1];
                this.determineEnvelopeAltByPrio(
                    leg.startAlt,
                    firstStep.minTerrainClearanceAlt,
                    prevLeg.endAlt.perfEnv.minAlt,
                    prevLeg.endAlt.perfEnv.maxAlt
                );
            }

            // copy leg start altitudes to first step
            firstStep.altMetaData.perfEnv.minAlt = leg.startAlt.perfEnv.minAlt;
            firstStep.altMetaData.perfEnv.maxAlt = leg.startAlt.perfEnv.maxAlt;

            // calc envelope altitudes
            this.calcLegStepsEnvelopeForwards(leg, aircraft);

            // copy leg end altitudes from last step
            const lastStep = leg.steps[leg.steps.length - 1];
            leg.endAlt.perfEnv.minAlt = lastStep.altMetaData.perfEnv.minAlt;
            leg.endAlt.perfEnv.maxAlt = lastStep.altMetaData.perfEnv.maxAlt;
        }
    }


    private calcLegStepsEnvelopeForwards(leg: VerticalRouteLeg, aircraft: Aircraft): void {
        for (let i = 1; i < leg.steps.length; i++) {
            const step = leg.steps[i];

            // calculate climb/descent performance from previous step
            const prevStep = leg.steps[i - 1];
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

            this.determineEnvelopeAltByPrio(
                step.altMetaData,
                step.minTerrainClearanceAlt,
                stepMinEnvAlt,
                stepMaxEnvAlt
            );
        }
    }


    private calcLegsEnvelopeBackwards(legs: VerticalRouteLeg[], aircraft: Aircraft): void {
        for (let i = legs.length - 1; i >= 0; i--) {
            const leg = legs[i];
            const lastStep = leg.steps[leg.steps.length - 1];

            // init leg end envelope altitudes
            if (i === legs.length - 1) {
                this.determineEnvelopeAltByPrio(
                    leg.endAlt,
                    lastStep.minTerrainClearanceAlt,
                    lastStep.minTerrainClearanceAlt,
                    aircraft.serviceCeiling
                );
            } else {
                const nextLeg = legs[i + 1];
                this.determineEnvelopeAltByPrio(
                    leg.endAlt,
                    lastStep.minTerrainClearanceAlt,
                    nextLeg.startAlt.perfEnv.minAlt,
                    nextLeg.startAlt.perfEnv.maxAlt
                );
            }

            // copy leg end altitudes to last step
            lastStep.altMetaData.perfEnv.minAlt = leg.endAlt.perfEnv.minAlt;
            lastStep.altMetaData.perfEnv.maxAlt = leg.endAlt.perfEnv.maxAlt;

            // calc envelope altitudes
            this.calcLegStepsEnvelopeBackwards(leg, aircraft);

            // set leg start altitudes from first step
            const firstStep = leg.steps[0];
            leg.startAlt.perfEnv.minAlt = firstStep.altMetaData.perfEnv.minAlt;
            leg.startAlt.perfEnv.maxAlt = firstStep.altMetaData.perfEnv.maxAlt;
        }
    }


    private calcLegStepsEnvelopeBackwards(leg: VerticalRouteLeg, aircraft: Aircraft): void {
        for (let j = leg.steps.length - 2; j >= 0; j--) {
            const step = leg.steps[j];
            const nextStep = leg.steps[j + 1];

            // calculate climb/descent performance backwards from next step
            const stepMinClimbAlt = aircraft.calcClimbStartingAlt(nextStep.altMetaData.perfEnv.minAlt, nextStep.climbTime);
            const stepMaxDecentAlt = aircraft.calcDescentStartingAlt(nextStep.altMetaData.perfEnv.maxAlt, nextStep.flightTime);

            this.determineEnvelopeAltByPrio(
                step.altMetaData,
                step.minTerrainClearanceAlt,
                stepMinClimbAlt,
                stepMaxDecentAlt
            );
        }
    }


    private determineEnvelopeAltByPrio(
        alt: AltitudeMetadata,
        minTerrainAlt: Length,
        propagatedMinAlt: Length,
        propagatedMaxAlt: Length
    ) {
        // prio 3: propagate previous values
        if (propagatedMaxAlt.isLessThan(propagatedMinAlt)) {
            propagatedMinAlt = propagatedMaxAlt;
        }
        alt.perfEnv.minAlt = propagatedMinAlt;
        alt.perfEnv.maxAlt = propagatedMaxAlt;

        // prio 2: terrain clearance: override back-propagation if below terrain clearance
        if (minTerrainAlt.isGreaterThan(alt.perfEnv.minAlt)) {
            alt.perfEnv.minAlt = minTerrainAlt;
        }
        if (minTerrainAlt.isGreaterThan(alt.perfEnv.maxAlt)) {
            alt.perfEnv.maxAlt = minTerrainAlt;
        }

        // prio 1: used defined altitudes: override values if above previous min / below previous max
        if (alt.user.minAlt && alt.user.minAlt.isGreaterThan(alt.perfEnv.minAlt)) {
            alt.perfEnv.minAlt = alt.user.minAlt;
        }
        if (alt.user.maxAlt && alt.user.maxAlt.isLessThan(alt.perfEnv.maxAlt)) {
            alt.perfEnv.maxAlt = alt.user.maxAlt;
        }

        // prevent min > max
        if (alt.user.minAlt && alt.user.minAlt.isGreaterThan(alt.perfEnv.maxAlt)) {
            alt.perfEnv.maxAlt = alt.user.minAlt;
        }

        // prevent max < min
        if (alt.user.maxAlt && alt.user.maxAlt.isLessThan(alt.perfEnv.minAlt)) {
            alt.perfEnv.minAlt = alt.user.maxAlt;
        }
    }

    private calcStepDisplayAlts(legs: VerticalRouteLeg[], cruiseAltitude: Length, aircraft: Aircraft): void {
        let hasCruiseAltitudeBeenReached = cruiseAltitude ? !cruiseAltitude : true;
        let currentAlt = legs[0].startAlt.perfEnv.minAlt;
        let nextAlt: Length;

        for (let i = 0; i < legs.length; i++) {
            const leg = legs[i];

            for (let j = 0; j < leg.steps.length; j++) {
                const step = leg.steps[j];

                nextAlt = currentAlt;

                if (currentAlt.isGreaterThan(step.altMetaData.perfEnv.maxAlt) || !hasCruiseAltitudeBeenReached) {
                    nextAlt = step.altMetaData.perfEnv.maxAlt;
                }

                if (currentAlt.isLessThan(step.altMetaData.perfEnv.minAlt)) {
                    nextAlt = step.altMetaData.perfEnv.minAlt;
                }

                if (nextAlt.isGreaterThanOrEqual(cruiseAltitude)) {
                    hasCruiseAltitudeBeenReached = true;
                }

                step.altMetaData.displayAlt = nextAlt;

                if (j === 0) {
                    leg.startAlt.displayAlt = nextAlt;
                } else if (j === leg.steps.length - 1) {
                    leg.endAlt.displayAlt = nextAlt;
                }

                currentAlt = nextAlt;
            }
        }
    }


    private calcStepDisplayAlts2(legs: VerticalRouteLeg[], cruiseAltitude: Length, aircraft: Aircraft): void {
        const midLegStep = this.findCruiseAltReachedLegAndStep(legs, cruiseAltitude);
        let currentAlt = legs[midLegStep.legIdx].steps[midLegStep.stepIdx].altMetaData.perfEnv.maxAlt;
        let nextAlt: Length;

        // backwards from cruise altitude
        for (let i = midLegStep.legIdx; i >= 0; i--) {
            const leg = legs[i];
            const startStepIdx = i === midLegStep.legIdx ? midLegStep.stepIdx : leg.steps.length - 1;

            if (i < midLegStep.legIdx) {
                leg.endAlt.displayAlt = currentAlt;
            }

            for (let j = startStepIdx; j >= 0; j--) {
                const step = leg.steps[j];

                nextAlt = currentAlt;

                if (currentAlt.isGreaterThan(step.altMetaData.perfEnv.maxAlt)) {
                    nextAlt = step.altMetaData.perfEnv.maxAlt;
                }

                if (currentAlt.isLessThan(step.altMetaData.perfEnv.minAlt)) {
                    nextAlt = step.altMetaData.perfEnv.minAlt;
                }

                step.altMetaData.displayAlt = nextAlt;

                currentAlt = nextAlt;
            }

            leg.startAlt.displayAlt = currentAlt;
        }

        // forwards from cruise altitude
        currentAlt = legs[midLegStep.legIdx].steps[midLegStep.stepIdx].altMetaData.perfEnv.maxAlt;
        for (let i = midLegStep.legIdx; i < legs.length; i++) {
            const leg = legs[i];
            const startStepIdx = i === midLegStep.legIdx ? midLegStep.stepIdx : 0;

            if (i > midLegStep.legIdx) {
                leg.startAlt.displayAlt = currentAlt;
            }

            for (let j = startStepIdx; j < leg.steps.length; j++) {
                const step = leg.steps[j];

                nextAlt = currentAlt;

                if (currentAlt.isGreaterThan(step.altMetaData.perfEnv.maxAlt)) {
                    nextAlt = step.altMetaData.perfEnv.maxAlt;
                }

                if (currentAlt.isLessThan(step.altMetaData.perfEnv.minAlt)) {
                    nextAlt = step.altMetaData.perfEnv.minAlt;
                }

                step.altMetaData.displayAlt = nextAlt;

                currentAlt = nextAlt;
            }

            leg.endAlt.displayAlt = currentAlt;
        }
    }


    private findCruiseAltReachedLegAndStep(legs: VerticalRouteLeg[], cruiseAltitude: Length): {
        legIdx: number,
        stepIdx: number
    } {
        for (let i = 0; i < legs.length; i++) {
            const leg = legs[i];
            for (let j = 0; j < leg.steps.length; j++) {
                const step = leg.steps[j];
                if (step.altMetaData.perfEnv.maxAlt.isGreaterThanOrEqual(cruiseAltitude)) {
                    return {
                        legIdx: i,
                        stepIdx: j
                    };
                }
            }
        }
    }
}
