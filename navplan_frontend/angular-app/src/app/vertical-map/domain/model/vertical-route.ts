import {VerticalMapWaypointStep} from "./vertical-map-waypoint-step";
import {VerticalMapTerrainStep} from "./vertical-map-terrain-step";
import {Length} from "../../../geo-physics/domain/model/quantities/length";
import {Aircraft} from "../../../aircraft/domain/model/aircraft";
import {VerticalRouteLeg} from "./vertical-route-leg";
import {WaypointType} from "../../../flightroute/domain/model/waypoint-type";
import {VerticalRouteLegStep} from "./vertical-route-leg-step";
import {AltitudeMetadata} from "./altitude-metadata";

export class VerticalRoute {
    public legs: VerticalRouteLeg[] = [];


    constructor(
        private waypointSteps: VerticalMapWaypointStep[],
        private terrainSteps: VerticalMapTerrainStep[],
        private cruiseAltitude: Length,
        private aircraft: Aircraft
    ) {
        this.initLegsAndSteps();
        this.getUserAltitudesForLegs();
        this.clampLegsToFromAirportToGround();
        this.initStepsWithUserAltitudes();
        this.calcLegsEnvelopeBackwards();
        this.calcLegsEnvelopeForwards();
    }


    private initLegsAndSteps(): void {
        for (let i = 0; i < this.waypointSteps.length - 1; i++) {
            const wpStep = this.waypointSteps[i];
            const nextWpStep = this.waypointSteps[i + 1];
            const startLength = wpStep.horDist;
            const endLength = nextWpStep.horDist;
            const legDist = endLength.subtract(startLength);
            const extraTime = nextWpStep.waypoint.vacTime;
            const flightTime = this.aircraft.calcCruiseFlightTime(legDist, extraTime);
            const climbTime = this.aircraft.calcCruiseClimbFlightTime(legDist, extraTime);
            const isFirstLegFromAirport = i === 0 && wpStep.waypoint.type === WaypointType.airport;
            const isLastLegToAirport = i === this.waypointSteps.length - 2 && nextWpStep.waypoint.type === WaypointType.airport;
            const legSteps = this.terrainSteps
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
            this.legs.push(leg);
        }
    }


    private getUserAltitudesForLegs(): void {
        for (let i = this.legs.length - 1; i >= 0; i--) {
            const leg = this.legs[i];
            if (!leg.wpEnd.wpAlt || !leg.wpEnd.wpAlt.alt) {
                continue; // TODO: why only wpEnd?
            }

            const maxAlt = leg.wpEnd.getMaxAlt()?.getHeightAmsl();
            const minAlt = leg.wpEnd.getMinAlt()?.getHeightAmsl();

            if (leg.wpEnd.wpAlt.isaltatlegstart) {
                leg.startAlt.maxUserAlt = maxAlt;
                leg.startAlt.minUserAlt = minAlt;
            } else {
                leg.endAlt.maxUserAlt = maxAlt;
                leg.endAlt.minUserAlt = minAlt;
            }
        }
    }


    private clampLegsToFromAirportToGround(): void {
        const firstLeg = this.legs[0];
        if (firstLeg.isFirstLegFromAirport) {
            const firstElevation = this.terrainSteps[0].elevationAmsl;
            firstLeg.startAlt.maxUserAlt = firstElevation;
            firstLeg.startAlt.minUserAlt = firstElevation;
        }

        const lastLeg = this.legs[this.legs.length - 1];
        if (lastLeg.isLastLegToAirport) {
            const lastElevation = this.terrainSteps[this.terrainSteps.length - 1].elevationAmsl;
            lastLeg.endAlt.maxUserAlt = lastElevation;
            lastLeg.endAlt.minUserAlt = lastElevation;
        }
    }


    private initStepsWithUserAltitudes(): void {
        for (const leg of this.legs) {
            const firstStep = leg.steps[0];
            const lastStep = leg.steps[leg.steps.length - 1];

            firstStep.altMetaData.minUserAlt = leg.startAlt.minUserAlt;
            firstStep.altMetaData.maxUserAlt = leg.startAlt.maxUserAlt;
            lastStep.altMetaData.minUserAlt = leg.endAlt.minUserAlt;
            lastStep.altMetaData.maxUserAlt = leg.endAlt.maxUserAlt;
        }
    }


    private calcLegsEnvelopeBackwards(): void {
        for (let i = this.legs.length - 1; i >= 0; i--) {
            const leg = this.legs[i];
            const lastStep = leg.steps[leg.steps.length - 1];

            // init leg end envelope altitudes
            if (i === this.legs.length - 1) {
                this.determineEnvelopeAltByPrio(
                    leg.endAlt,
                    lastStep.minTerrainClearanceAlt,
                    lastStep.minTerrainClearanceAlt,
                    this.aircraft.serviceCeiling
                );
            } else {
                const nextLeg = this.legs[i + 1];
                this.determineEnvelopeAltByPrio(
                    leg.endAlt,
                    lastStep.minTerrainClearanceAlt,
                    nextLeg.startAlt.minEnvelopeAlt,
                    nextLeg.startAlt.maxEnvelopeAlt
                );
            }

            // copy leg end altitudes to last step
            lastStep.altMetaData.minEnvelopeAlt = leg.endAlt.minEnvelopeAlt;
            lastStep.altMetaData.maxEnvelopeAlt = leg.endAlt.maxEnvelopeAlt;

            // calc envelope altitudes
            this.calcLegStepsEnvelopeBackwards(leg, this.aircraft);

            // set leg start altitudes from first step
            const firstStep = leg.steps[0];
            leg.startAlt.minEnvelopeAlt = firstStep.altMetaData.minEnvelopeAlt;
            leg.startAlt.maxEnvelopeAlt = firstStep.altMetaData.maxEnvelopeAlt;
        }
    }


    private calcLegStepsEnvelopeBackwards(leg: VerticalRouteLeg, aircraft: Aircraft = this.aircraft): void {
        for (let j = leg.steps.length - 2; j >= 0; j--) {
            const step = leg.steps[j];
            const nextStep = leg.steps[j + 1];

            // calculate climb/descent performance backwards from next step
            const stepMinClimbAlt = aircraft.calcClimbStartingAlt(nextStep.altMetaData.minEnvelopeAlt, nextStep.climbTime);
            const stepMaxDecentAlt = aircraft.calcDescentStartingAlt(nextStep.altMetaData.maxEnvelopeAlt, nextStep.flightTime);

            this.determineEnvelopeAltByPrio(
                step.altMetaData,
                step.minTerrainClearanceAlt,
                stepMinClimbAlt,
                stepMaxDecentAlt
            );
        }
    }


    private calcLegsEnvelopeForwards(): void {
        for (let i = 0; i < this.legs.length; i++) {
            const leg = this.legs[i];
            const firstStep = leg.steps[0];

            // init leg start envelope altitudes
            if (i === 0) {
                this.determineEnvelopeAltByPrio(
                    leg.startAlt,
                    firstStep.minTerrainClearanceAlt,
                    firstStep.minTerrainClearanceAlt,
                    this.aircraft.serviceCeiling
                );
            } else {
                const prevLeg = this.legs[i - 1];
                this.determineEnvelopeAltByPrio(
                    leg.startAlt,
                    firstStep.minTerrainClearanceAlt,
                    prevLeg.endAlt.minEnvelopeAlt,
                    prevLeg.endAlt.maxEnvelopeAlt
                );
            }

            // copy leg start altitudes to first step
            firstStep.altMetaData.minEnvelopeAlt = leg.startAlt.minEnvelopeAlt;
            firstStep.altMetaData.maxEnvelopeAlt = leg.startAlt.maxEnvelopeAlt;

            // calc envelope altitudes
            this.calcLegStepsEnvelopeForwards(leg, this.aircraft);

            // copy leg end altitudes from last step
            const lastStep = leg.steps[leg.steps.length - 1];
            leg.endAlt.minEnvelopeAlt = lastStep.altMetaData.minEnvelopeAlt;
            leg.endAlt.maxEnvelopeAlt = lastStep.altMetaData.maxEnvelopeAlt;
        }
    }


    private calcLegStepsEnvelopeForwards(leg: VerticalRouteLeg, aircraft: Aircraft): void {
        for (let i = 1; i < leg.steps.length; i++) {
            const step = leg.steps[i];

            // calculate climb/descent performance from previous step
            const prevStep = leg.steps[i - 1];
            const stepDecentAltFt = aircraft.calcDescentTargetAlt(prevStep.altMetaData.minEnvelopeAlt, step.flightTime);
            const stepClimbAltFt = aircraft.calcClimbTargetAlt(prevStep.altMetaData.maxEnvelopeAlt, step.climbTime);

            const stepMaxEnvAlt = stepClimbAltFt.isLessThan(step.altMetaData.maxEnvelopeAlt)
                ? stepClimbAltFt
                : stepDecentAltFt.isGreaterThan(step.altMetaData.maxEnvelopeAlt)
                    ? stepDecentAltFt
                    : step.altMetaData.maxEnvelopeAlt;

            const stepMinEnvAlt = stepDecentAltFt.isGreaterThan(step.altMetaData.minEnvelopeAlt)
                ? stepDecentAltFt
                : stepClimbAltFt.isLessThan(step.altMetaData.minEnvelopeAlt)
                    ? stepClimbAltFt
                    : step.altMetaData.minEnvelopeAlt;

            this.determineEnvelopeAltByPrio(
                step.altMetaData,
                step.minTerrainClearanceAlt,
                stepMinEnvAlt,
                stepMaxEnvAlt
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
        alt.minEnvelopeAlt = propagatedMinAlt;
        alt.maxEnvelopeAlt = propagatedMaxAlt;

        // prio 2: terrain clearance: override back-propagation if below terrain clearance
        if (minTerrainAlt.isGreaterThan(alt.minEnvelopeAlt)) {
            alt.minEnvelopeAlt = minTerrainAlt;
        }
        if (minTerrainAlt.isGreaterThan(alt.maxEnvelopeAlt)) {
            alt.maxEnvelopeAlt = minTerrainAlt;
        }

        // prio 1: used defined altitudes: override values if above previous min / below previous max
        if (alt.minUserAlt && alt.minUserAlt.isGreaterThan(alt.minEnvelopeAlt)) {
            alt.minEnvelopeAlt = alt.minUserAlt;
        }
        if (alt.maxUserAlt && alt.maxUserAlt.isLessThan(alt.maxEnvelopeAlt)) {
            alt.maxEnvelopeAlt = alt.maxUserAlt;
        }

        // prevent min > max
        if (alt.minUserAlt && alt.minUserAlt.isGreaterThan(alt.maxEnvelopeAlt)) {
            alt.maxEnvelopeAlt = alt.minUserAlt;
        }

        // prevent max < min
        if (alt.maxUserAlt && alt.maxUserAlt.isLessThan(alt.minEnvelopeAlt)) {
            alt.minEnvelopeAlt = alt.maxUserAlt;
        }
    }
}
