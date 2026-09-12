import {VerticalMapWaypointStep} from "./vertical-map-waypoint-step";
import {VerticalMapTerrainStep} from "./vertical-map-terrain-step";
import {Length} from "../../../geo-physics/domain/model/quantities/length";
import {Aircraft} from "../../../aircraft/domain/model/aircraft";
import {VerticalRouteLeg} from "./vertical-route-leg";
import {WaypointType} from "../../../flightroute/domain/model/waypoint-type";
import {VerticalRouteLegStep} from "./vertical-route-leg-step";
import {EnvelopeAltTriage} from "./envelope-alt-triage";

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
                leg.startAlt.user.maxAlt = maxAlt;
                leg.startAlt.user.minAlt = minAlt;
            } else {
                leg.endAlt.user.maxAlt = maxAlt;
                leg.endAlt.user.minAlt = minAlt;
            }
        }
    }


    private clampLegsToFromAirportToGround(): void {
        const firstLeg = this.legs[0];
        if (firstLeg.isFirstLegFromAirport) {
            const firstElevation = this.terrainSteps[0].elevationAmsl;
            firstLeg.startAlt.user.maxAlt = firstElevation;
            firstLeg.startAlt.user.minAlt = firstElevation;
        }

        const lastLeg = this.legs[this.legs.length - 1];
        if (lastLeg.isLastLegToAirport) {
            const lastElevation = this.terrainSteps[this.terrainSteps.length - 1].elevationAmsl;
            lastLeg.endAlt.user.maxAlt = lastElevation;
            lastLeg.endAlt.user.minAlt = lastElevation;
        }
    }


    private initStepsWithUserAltitudes(): void {
        for (const leg of this.legs) {
            const firstStep = leg.steps[0];
            const lastStep = leg.steps[leg.steps.length - 1];

            firstStep.altMetaData.user.minAlt = leg.startAlt.user.minAlt;
            firstStep.altMetaData.user.maxAlt = leg.startAlt.user.maxAlt;
            lastStep.altMetaData.user.minAlt = leg.endAlt.user.minAlt;
            lastStep.altMetaData.user.maxAlt = leg.endAlt.user.maxAlt;
        }
    }


    private calcLegsEnvelopeBackwards(): void {
        for (let i = this.legs.length - 1; i >= 0; i--) {
            const leg = this.legs[i];
            const lastStep = leg.steps[leg.steps.length - 1];

            // init leg end envelope altitudes
            if (i === this.legs.length - 1) {
                EnvelopeAltTriage.determineEnvelopeAltByPrio(
                    leg.endAlt,
                    lastStep.minTerrainClearanceAlt,
                    lastStep.minTerrainClearanceAlt,
                    this.aircraft.serviceCeiling
                );
            } else {
                const nextLeg = this.legs[i + 1];
                EnvelopeAltTriage.determineEnvelopeAltByPrio(
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
            leg.calcLegStepsEnvelopeBackwards(this.aircraft);

            // set leg start altitudes from first step
            const firstStep = leg.steps[0];
            leg.startAlt.perfEnv.minAlt = firstStep.altMetaData.perfEnv.minAlt;
            leg.startAlt.perfEnv.maxAlt = firstStep.altMetaData.perfEnv.maxAlt;
        }
    }


    private calcLegsEnvelopeForwards(): void {
        for (let i = 0; i < this.legs.length; i++) {
            const leg = this.legs[i];
            const firstStep = leg.steps[0];

            // init leg start envelope altitudes
            if (i === 0) {
                EnvelopeAltTriage.determineEnvelopeAltByPrio(
                    leg.startAlt,
                    firstStep.minTerrainClearanceAlt,
                    firstStep.minTerrainClearanceAlt,
                    this.aircraft.serviceCeiling
                );
            } else {
                const prevLeg = this.legs[i - 1];
                EnvelopeAltTriage.determineEnvelopeAltByPrio(
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
            leg.calcLegStepsEnvelopeForwards(this.aircraft);

            // copy leg end altitudes from last step
            const lastStep = leg.steps[leg.steps.length - 1];
            leg.endAlt.perfEnv.minAlt = lastStep.altMetaData.perfEnv.minAlt;
            leg.endAlt.perfEnv.maxAlt = lastStep.altMetaData.perfEnv.maxAlt;
        }
    }
}
