import {VerticalMapWaypointStep} from "./vertical-map-waypoint-step";
import {VerticalMapTerrainStep} from "./vertical-map-terrain-step";
import {Length} from "../../../geo-physics/domain/model/quantities/length";
import {Aircraft} from "../../../aircraft/domain/model/aircraft";
import {VerticalRouteLeg} from "./vertical-route-leg";
import {WaypointType} from "../../../flightroute/domain/model/waypoint-type";
import {VerticalRouteLegStep} from "./vertical-route-leg-step";

export class VerticalRoute {
    public legs: VerticalRouteLeg[] = [];


    constructor(
        private waypointSteps: VerticalMapWaypointStep[],
        private terrainSteps: VerticalMapTerrainStep[],
        private cruiseAltitude: Length,
        private aircraft: Aircraft
    ) {
        this.legs = this.initLegsAndSteps();
    }


    private initLegsAndSteps(): VerticalRouteLeg[] {
        const legs: VerticalRouteLeg[] = [];
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
            legs.push(leg);
        }

        return legs;
    }
}
