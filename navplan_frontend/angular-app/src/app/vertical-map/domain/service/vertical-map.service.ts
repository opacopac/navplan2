import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {VerticalMap} from '../model/vertical-map';
import {Flightroute} from '../../../flightroute/domain/model/flightroute';
import {tap} from 'rxjs/operators';
import {IVerticalMapService} from './i-vertical-map.service';
import {IVerticalMapRepoService} from './i-vertical-map-repo.service';
import {ForecastSelection} from '../../../meteo-forecast/domain/model/forecast-selection';
import {LegAltitudeMetadata} from '../model/leg-altitude-metadata';
import {VerticalMapTerrainStep} from '../model/vertical-map-terrain-step';
import {VerticalMapWaypointStep} from '../model/vertical-map-waypoint-step';
import {WaypointType} from '../../../flightroute/domain/model/waypoint-type';
import {AltitudeMetadata} from '../model/altitude-metadata';
import {Length} from '../../../geo-physics/domain/model/quantities/length';
import {AircraftClimbPerformanceService} from '../../../aircraft-performance/domain/service/aircraft-climb-performance.service';
import {MockAircraftBr23} from '../../../aircraft/domain/mock/mock-aircraft-br23';
import {Aircraft} from '../../../aircraft/domain/model/aircraft';
import {Speed} from '../../../geo-physics/domain/model/quantities/speed';
import {StepAltitudeMetadata} from '../model/step-altitude-metadata';


@Injectable()
export class VerticalMapService implements IVerticalMapService {
    public static MIN_TERRAIN_CLEARANCE = Length.ofFt(1000);
    public static MIN_TERRAIN_CLEARANCE_FOR_WARNING = Length.ofFt(500);
    public static DEFAULT_DESCENT_RATE = Speed.ofFpm(500);


    constructor(private restService: IVerticalMapRepoService) {
    }


    public readVerticalMap(flightroute: Flightroute, fcSelection: ForecastSelection): Observable<VerticalMap> {
        const aircraft = MockAircraftBr23.create(); // TODO pass aircraft as parameter
        return this.restService.readVerticalMap(
            flightroute.waypoints.map(wp => wp.position.toArray()),
            fcSelection
        ).pipe(
            // link to waypoints
            tap(vm => {
                for (let i = 0; i < flightroute.waypoints.length; i++) {
                    vm.waypointSteps[i].waypoint = flightroute.waypoints[i];
                    // TODO: height
                }
            }),
            tap(vm => {
                vm.legAltitudeMetadataList = this.calcLegAltitudeMetadata(vm.waypointSteps, vm.terrainSteps, aircraft);
                vm.stepAltitudeMetadataList = this.calcStepsAltitudeMetadata(vm.waypointSteps, vm.terrainSteps, aircraft);
            })
        );
    }


    // region legs metadata

    public calcLegAltitudeMetadata(
        waypointSteps: VerticalMapWaypointStep[],
        terrainSteps: VerticalMapTerrainStep[],
        aircraft: Aircraft
    ): LegAltitudeMetadata[] {
        const legs = this.initLegs(waypointSteps, terrainSteps, aircraft);
        this.getMinTerrainClearanceForLegs(legs);
        this.getUserAltitudesForLegs(legs);
        this.clampLegsToFromAirportToGround(legs, terrainSteps);
        this.calculateLegAltitudeEnvelopeFromEndToStart(legs, aircraft);
        this.calcDisplayAltitudesAndWarnings(legs, aircraft);

        return legs;
    }


    private initLegs(
        waypointSteps: VerticalMapWaypointStep[],
        terrainSteps: VerticalMapTerrainStep[],
        aircraft: Aircraft
    ): LegAltitudeMetadata[] {
        const legs: LegAltitudeMetadata[] = [];
        for (let i = 0; i < waypointSteps.length - 1; i++) {
            const wpStep = waypointSteps[i];
            const nextWpStep = waypointSteps[i + 1];
            const startLength = wpStep.horDist;
            const endLength = nextWpStep.horDist;
            const legDist = endLength.subtract(startLength);
            const flightTime = AircraftClimbPerformanceService.calcFlightTime(legDist, aircraft.cruiseSpeed,
                wpStep.waypoint.vacTime);
            const climbTime = AircraftClimbPerformanceService.calcFlightTime(legDist, aircraft.cruiseClimbSpeed,
                nextWpStep.waypoint.vacTime);
            const isFirstLegFromAirport = i === 0 && wpStep.waypoint.type === WaypointType.airport;
            const isLastLegToAirport = i === waypointSteps.length - 2 && nextWpStep.waypoint.type === WaypointType.airport;
            legs.push(new LegAltitudeMetadata(
                wpStep.waypoint,
                nextWpStep.waypoint,
                isFirstLegFromAirport,
                isLastLegToAirport,
                wpStep.horDist,
                nextWpStep.horDist,
                legDist,
                flightTime,
                climbTime,
                terrainSteps.filter(step => step.horDist.m >= startLength.m && step.horDist.m <= endLength.m)
            ));
        }
        return legs;
    }


    private getMinTerrainClearanceForLegs(legs: LegAltitudeMetadata[]): void {
        for (const leg of legs) {
            if (leg.terrainSteps.length === 0) {
                return;
            }

            const maxElevation = leg.terrainSteps.reduce(
                (maxElev, step) => step.elevationAmsl.m > maxElev.m
                    ? step.elevationAmsl
                    : maxElev,
                leg.terrainSteps[0].elevationAmsl
            );

            leg.minTerrainClearanceAlt = maxElevation.add(VerticalMapService.MIN_TERRAIN_CLEARANCE);
        }
    }


    private getUserAltitudesForLegs(legs: LegAltitudeMetadata[]): void {
        for (let i = legs.length - 1; i >= 0; i--) {
            const leg = legs[i];
            if (!leg.wpEnd.wpAlt || !leg.wpEnd.wpAlt.alt) {
                continue;
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


    private clampLegsToFromAirportToGround(legs: LegAltitudeMetadata[], terrainSteps: VerticalMapTerrainStep[]): void {
        const firstLeg = legs[0];
        if (firstLeg.isFirstLegFromAirport) {
            const firstElevation = terrainSteps[0].elevationAmsl;
            firstLeg.startAlt.maxUserAlt = firstElevation;
            firstLeg.startAlt.minUserAlt = firstElevation;
        }

        const lastLeg = legs[legs.length - 1];
        if (lastLeg.isLastLegToAirport) {
            const lastElevation = terrainSteps[terrainSteps.length - 1].elevationAmsl;
            lastLeg.endAlt.maxUserAlt = lastElevation;
            lastLeg.endAlt.minUserAlt = lastElevation;
        }
    }


    private calculateLegAltitudeEnvelopeFromEndToStart(legs: LegAltitudeMetadata[], aircraft: Aircraft): void {
        for (let i = legs.length - 1; i >= 0; i--) {
            const leg = legs[i];
            const nextLeg = i < legs.length - 1 ? legs[i + 1] : null;

            // init values from previous leg (or terrain clearance for last leg)
            const backPropMinAlt = nextLeg ? nextLeg.startAlt.minAlt : leg.minTerrainClearanceAlt;
            const backPropMaxAlt = nextLeg ? nextLeg.startAlt.maxAlt : leg.minTerrainClearanceAlt;

            // determine leg end altitudes by prio
            this.determineAltByPrio(leg.endAlt, leg.minTerrainClearanceAlt, backPropMinAlt, backPropMaxAlt);

            // calculate climb/descent performance backwards from leg end to start
            const legStartMinClimbAltFt = AircraftClimbPerformanceService.calcClimbStartingAlt(
                leg.endAlt.minAlt,
                leg.climbTime,
                aircraft.rocSealevel,
                aircraft.serviceCeiling
            );
            const legStartMaxDecentAltFt = AircraftClimbPerformanceService.calcDescentStartingAlt(
                leg.endAlt.maxAlt,
                leg.flightTime,
                VerticalMapService.DEFAULT_DESCENT_RATE
            );

            // determine leg start altitudes by prio
            this.determineAltByPrio(leg.startAlt, leg.minTerrainClearanceAlt, legStartMinClimbAltFt, legStartMaxDecentAltFt);
        }
    }


    private calcDisplayAltitudesAndWarnings(legs: LegAltitudeMetadata[], aircraft: Aircraft): void {
        let currentAlt = legs[0].terrainSteps[0].elevationAmsl; // start at first terrain elevation
        let nextAlt = currentAlt;

        for (let i = 0; i < legs.length; i++) {
            const leg = legs[i];
            if (leg.endAlt.minAlt.isGreaterThan(currentAlt)) {
                const maxClimbAlt = AircraftClimbPerformanceService.calcClimbTargetAlt(
                    currentAlt,
                    leg.climbTime,
                    aircraft.rocSealevel,
                    aircraft.serviceCeiling
                );
                nextAlt = leg.endAlt.minAlt.isLessThan(maxClimbAlt) ? leg.endAlt.minAlt : maxClimbAlt;
                if (maxClimbAlt.isLessThan(leg.endAlt.minUserAlt) || maxClimbAlt.isLessThan(leg.minTerrainClearanceAlt)) {
                    leg.warning = 'Climb performance may be insufficient to reach the altitude before the end of the leg! (update climb performance in ⚙️ Settings)';
                    nextAlt = leg.endAlt.minAlt;
                }
            } else if (leg.endAlt.maxAlt.isLessThan(currentAlt)) {
                nextAlt = leg.endAlt.maxAlt;
            }

            if (!leg.warning) {
                const terrainClearanceText = 'Flight path may be below min. terrain clearance of leg!';
                const minTerrainAltFtForWarning = leg.minTerrainClearanceAlt
                    .subtract(VerticalMapService.MIN_TERRAIN_CLEARANCE)
                    .add(VerticalMapService.MIN_TERRAIN_CLEARANCE_FOR_WARNING);

                if (!leg.isFirstLegFromAirport && leg.isLastLegToAirport && (currentAlt.isLessThan(minTerrainAltFtForWarning))) {
                    leg.warning = terrainClearanceText;
                } else if (leg.isFirstLegFromAirport && nextAlt.isLessThan(minTerrainAltFtForWarning)) {
                    leg.warning = terrainClearanceText;
                } else if (leg.isLastLegToAirport && currentAlt.isLessThan(minTerrainAltFtForWarning)) {
                    leg.warning = terrainClearanceText;
                }
            }

            leg.startAlt.displayAlt = currentAlt;
            leg.endAlt.displayAlt = nextAlt;

            currentAlt = nextAlt;
        }
    }


    /*private calcRouteAltitudesAndWarnings(legs: LegAltitudeMetadata[], cruiseAltitude: Length, aircraft: Aircraft): void {
    let currentDist = Length.ofZero();
    let currentAlt = legs[0].terrainSteps[0].elevationAmsl; // start at first terrain elevation
    let nextAlt = currentAlt;
    let isCruiseAltitudeReached = !cruiseAltitude;

    const routePoints: [Length, Length][] = [];
    routePoints.push([currentDist, currentAlt]);

    for (let i = 0; i < legs.length; i++) {
        const leg = legs[i];

        for (let j = 0; j < leg.terrainSteps.length; j++) {
            const nextDist = leg.terrainSteps[j].horDist;
            const stepDist = nextDist.subtract(currentDist);

            if (leg.endAlt.minAlt.isGreaterThan(currentAlt)) {
                // climb if target min alt is higher
                const stepClimbTime = AircraftClimbPerformanceService.calcFlightTime(stepDist, aircraft.cruiseClimbSpeed);
                const stepClimbAlt = AircraftClimbPerformanceService.calcClimbTargetAlt(
                    currentAlt,
                    stepClimbTime,
                    aircraft.rocSealevel,
                    aircraft.serviceCeiling
                );

                nextAlt = leg.endAlt.minAlt.isLessThan(stepClimbAlt) ? leg.endAlt.minAlt : stepClimbAlt;

            } else if (leg.endAlt.maxAlt.isLessThan(currentAlt)) {
                // descent if target max alt is lower
                const timeToEndOfLeg = AircraftClimbPerformanceService.calcFlightTime(
                    leg.endLength.subtract(nextDist),
                    aircraft.cruiseSpeed
                );
                const rod = AircraftClimbPerformanceService.calcDescendRate(currentAlt, leg.endAlt.maxAlt, timeToEndOfLeg);
                const stepDescentTime = AircraftClimbPerformanceService.calcFlightTime(stepDist, aircraft.cruiseSpeed);
                const stepDescendAlt = AircraftClimbPerformanceService.calcDescentTargetAlt(
                    currentAlt,
                    stepDescentTime,
                    rod
                );

                nextAlt = leg.endAlt.maxAlt.isGreaterThan(stepDescendAlt) ? leg.endAlt.maxAlt : stepDescendAlt;

            } else if (!isCruiseAltitudeReached && leg.endAlt.maxAlt.isLessThan(currentAlt)) {
                // climb to cruise altitude not yet reached
                const stepDescentTime = AircraftClimbPerformanceService.calcFlightTime(stepDist, aircraft.cruiseSpeed);
                const stepDescentTargetAlt = AircraftClimbPerformanceService.calcDescentStartingAlt(
                    cruiseAltitude,
                    stepDescentTime,
                    VerticalMapService.DEFAULT_DESCENT_RATE
                );

                nextAlt = cruiseAltitude.isGreaterThan(stepDescentTargetAlt) ? cruiseAltitude : stepDescentTargetAlt;

            } else {
                // maintain altitude
                nextAlt = currentAlt;
            }

            if (nextAlt.isGreaterThanOrEqual(cruiseAltitude)) {
                isCruiseAltitudeReached = true;
            }

            routePoints.push([nextDist, nextAlt]);
            currentDist = nextDist;
            currentAlt = nextAlt;
        }

        if (leg.endAlt.maxAlt.isLessThan(currentAlt)) {
            nextAlt = leg.endAlt.maxAlt;
        }

        // add end WP
        routePoints.push([leg.endLength, nextAlt]);
    }
}*/


    private determineAltByPrio(
        legAlt: AltitudeMetadata,
        legMinTerrainAlt: Length,
        backPropMinAlt: Length,
        backPropMaxAlt: Length
    ) {
        // prio 3: back-propagate from next leg
        legAlt.minAlt = backPropMinAlt;
        legAlt.maxAlt = backPropMaxAlt;

        // prio 2: terrain clearance: override back-propagation if below terrain clearance
        if (legMinTerrainAlt.isGreaterThan(legAlt.minAlt)) {
            legAlt.minAlt = legMinTerrainAlt;
        }
        if (legMinTerrainAlt.isGreaterThan(legAlt.maxAlt)) {
            legAlt.maxAlt = legMinTerrainAlt;
        }

        // prio 1: used defined altitudes: override values if above previous min / below previous max
        if (legAlt.minUserAlt && legAlt.minUserAlt.isGreaterThan(legAlt.minAlt)) {
            legAlt.minAlt = legAlt.minUserAlt;
        }
        if (legAlt.maxUserAlt && legAlt.maxUserAlt.isLessThan(legAlt.maxAlt)) {
            legAlt.maxAlt = legAlt.maxUserAlt;
        }

        // prevent min > max
        if (legAlt.minUserAlt && legAlt.minUserAlt.isGreaterThan(legAlt.maxAlt)) {
            legAlt.maxAlt = legAlt.minUserAlt;
        }

        // prevent max < min
        if (legAlt.maxUserAlt && legAlt.maxUserAlt.isLessThan(legAlt.minAlt)) {
            legAlt.minAlt = legAlt.maxUserAlt;
        }
    }

    // endregion


    // region steps metadata

    public calcStepsAltitudeMetadata(
        waypointSteps: VerticalMapWaypointStep[],
        terrainSteps: VerticalMapTerrainStep[],
        aircraft: Aircraft
    ): StepAltitudeMetadata[] {
        const steps = this.initStepAltitudeMetaData(terrainSteps);
        this.insertWaypointSteps(waypointSteps, steps);
        this.calcMinTerrainClearanceForSteps(steps);
        this.calcStepFlightTimes(steps, aircraft);
        this.calcStepAltitudeEnvelopeFromEndToStart(steps, aircraft);
        this.calcDisplayAltitudesAndWarningsForSteps(steps, aircraft);

        return steps;
    }


    private initStepAltitudeMetaData(
        terrainSteps: VerticalMapTerrainStep[],
    ): StepAltitudeMetadata[] {
        return terrainSteps.map(ts => new StepAltitudeMetadata(ts.horDist, ts.elevationAmsl));
    }


    private insertWaypointSteps(
        waypointSteps: VerticalMapWaypointStep[],
        steps: StepAltitudeMetadata[],
    ): void {
        // insert waypoints as steps & interpolate elevation
        let wpIndex = 0;
        for (let i = 0; i < steps.length - 1; i++) {
            const step = steps[i];
            const nextStep = steps[i + 1];
            const wp = waypointSteps[wpIndex];

            if (step.stepDist.isEqual(wp.horDist)) {
                step.wp = wp.waypoint;
                this.initUserAltforWpStep(step, waypointSteps);
                wpIndex++;
            } else if (nextStep.stepDist.isEqual(wp.horDist)) {
                nextStep.wp = wp.waypoint;
                this.initUserAltforWpStep(nextStep, waypointSteps);
                wpIndex++;
            } else if (step.stepDist.isLessThan(wp.horDist) && nextStep.stepDist.isGreaterThan(wp.horDist)) {
                const newStep = this.createStepFromWp(wp, step.elevationAmsl, nextStep.elevationAmsl);
                steps.splice(i + 1, 0, newStep);
                this.initUserAltforWpStep(newStep, waypointSteps);
                wpIndex++;
            }
        }

        // add remaining waypoints at the end
        if (wpIndex < waypointSteps.length) {
            for (; wpIndex < waypointSteps.length; wpIndex++) {
                const wp = waypointSteps[wpIndex];
                const elevation = steps[steps.length - 1].elevationAmsl;
                const newStep = this.createStepFromWp(wp, elevation, elevation);
                this.initUserAltforWpStep(newStep, waypointSteps);
                steps.push(newStep);
            }
        }
    }


    private createStepFromWp(wp: VerticalMapWaypointStep, elevation: Length, nextStepElevation: Length): StepAltitudeMetadata {
        const elevationFt = (elevation.ft + nextStepElevation.ft) / 2;
        const newStep = new StepAltitudeMetadata(wp.horDist, Length.ofFt(elevationFt));
        newStep.wp = wp.waypoint;

        return newStep;
    }


    private initUserAltforWpStep(step: StepAltitudeMetadata, allWaypointSteps: VerticalMapWaypointStep[]): void {
        if (!step.wp) {
            return;
        }

        step.maxUserAlt = step.wp.getMaxAlt()?.getHeightAmsl();
        step.minUserAlt = step.wp.getMinAlt()?.getHeightAmsl();

        // TODO: handle isAltAtLegStart

        // clamp WPs to/from airport to ground
        const wp = step.wp;
        const isFirstOrLastWp = wp === allWaypointSteps[0].waypoint || wp === allWaypointSteps[allWaypointSteps.length - 1].waypoint;
        if (wp.type === WaypointType.airport && isFirstOrLastWp) {
            step.maxUserAlt = step.elevationAmsl;
            step.minUserAlt = step.elevationAmsl;
        }
    }


    private calcMinTerrainClearanceForSteps(steps: StepAltitudeMetadata[]): void {
        for (const step of steps) {
            const maxElevation = step.elevationAmsl;
            step.minTerrainClearanceAlt = maxElevation.add(VerticalMapService.MIN_TERRAIN_CLEARANCE);
        }
    }


    private calcStepFlightTimes(steps: StepAltitudeMetadata[], aircraft: Aircraft): void {
        for (let i = 1; i < steps.length; i++) {
            const prevStep = steps[i - 1];
            const step = steps[i];
            const stepDist = step.stepDist.subtract(prevStep.stepDist);
            step.flightTime = AircraftClimbPerformanceService.calcFlightTime(stepDist, aircraft.cruiseSpeed);
            step.climbTime = AircraftClimbPerformanceService.calcFlightTime(stepDist, aircraft.cruiseClimbSpeed);
        }
    }


    private calcStepAltitudeEnvelopeFromEndToStart(steps: StepAltitudeMetadata[], aircraft: Aircraft): void {
        for (let i = steps.length - 1; i >= 0; i--) {
            const step = steps[i];
            const nextStep = steps[i + 1];

            if (i === 0) {
                this.determineStepEnvelopeAltByPrio(step, nextStep.minEnvelopeAlt, nextStep.maxEnvelopeAlt);
                continue;
            }

            // calculate climb/descent performance backwards from next step to current step
            const stepMinClimbAltFt = AircraftClimbPerformanceService.calcClimbStartingAlt(
                nextStep ? nextStep.minEnvelopeAlt : step.minTerrainClearanceAlt,
                step.climbTime,
                aircraft.rocSealevel,
                aircraft.serviceCeiling
            );
            const stepMaxDecentAltFt = AircraftClimbPerformanceService.calcDescentStartingAlt(
                nextStep ? nextStep.maxEnvelopeAlt : step.minTerrainClearanceAlt,
                step.flightTime,
                VerticalMapService.DEFAULT_DESCENT_RATE
            );

            this.determineStepEnvelopeAltByPrio(step, stepMinClimbAltFt, stepMaxDecentAltFt);
        }
    }


    private determineStepEnvelopeAltByPrio(
        step: StepAltitudeMetadata,
        backPropMinAlt: Length,
        backPropMaxAlt: Length
    ) {
        // prio 3: back-propagate from next leg
        step.minEnvelopeAlt = backPropMinAlt;
        step.maxEnvelopeAlt = backPropMaxAlt;

        // prio 2: terrain clearance: override back-propagation if below terrain clearance
        if (step.minTerrainClearanceAlt.isGreaterThan(step.minEnvelopeAlt)) {
            step.minEnvelopeAlt = step.minTerrainClearanceAlt;
        }
        if (step.minTerrainClearanceAlt.isGreaterThan(step.maxEnvelopeAlt)) {
            step.maxEnvelopeAlt = step.minTerrainClearanceAlt;
        }

        // prio 1: used defined altitudes: override values if above previous min / below previous max
        if (step.minUserAlt && step.minUserAlt.isGreaterThan(step.minEnvelopeAlt)) {
            step.minEnvelopeAlt = step.minUserAlt;
        }
        if (step.maxUserAlt && step.maxUserAlt.isLessThan(step.maxEnvelopeAlt)) {
            step.maxEnvelopeAlt = step.maxUserAlt;
        }

        // prevent min > max
        if (step.minUserAlt && step.minUserAlt.isGreaterThan(step.maxEnvelopeAlt)) {
            step.maxEnvelopeAlt = step.minUserAlt;
        }

        // prevent max < min
        if (step.maxUserAlt && step.maxUserAlt.isLessThan(step.minEnvelopeAlt)) {
            step.minEnvelopeAlt = step.maxUserAlt;
        }
    }


    private calcDisplayAltitudesAndWarningsForSteps(steps: StepAltitudeMetadata[], aircraft: Aircraft): void {
        steps[0].displayAlt = steps[0].minEnvelopeAlt; // start at first step min envelope altitude
        let prevAlt = steps[0].displayAlt;
        let nextAlt = prevAlt;

        for (let i = 1; i < steps.length; i++) {
            const step = steps[i];
            if (step.minEnvelopeAlt.isGreaterThan(prevAlt)) {
                const climbAlt = AircraftClimbPerformanceService.calcClimbTargetAlt(
                    prevAlt,
                    step.climbTime,
                    aircraft.rocSealevel,
                    aircraft.serviceCeiling
                );
                nextAlt = step.minEnvelopeAlt.isLessThan(climbAlt) ? step.minEnvelopeAlt : climbAlt;
                /*if (maxClimbAlt.isLessThan(step.minUserAlt) || maxClimbAlt.isLessThan(step.minTerrainClearanceAlt)) {
                    step.warning = 'Climb performance may be insufficient to reach the altitude before the end of the leg! (update climb performance in ⚙️ Settings)';
                    nextAlt = step.minEnvelopeAlt;
                }*/
            } else if (step.maxEnvelopeAlt.isLessThan(prevAlt)) {
                const descentAlt = AircraftClimbPerformanceService.calcDescentTargetAlt(
                    prevAlt,
                    step.flightTime,
                    VerticalMapService.DEFAULT_DESCENT_RATE
                );
                nextAlt = step.maxEnvelopeAlt.isGreaterThan(descentAlt) ? step.maxEnvelopeAlt : descentAlt;
            }

            /*if (!step.warning) {
                const terrainClearanceText = 'Flight path may be below min. terrain clearance of leg!';
                const minTerrainAltFtForWarning = step.minTerrainClearanceAlt
                    .subtract(VerticalMapService.MIN_TERRAIN_CLEARANCE)
                    .add(VerticalMapService.MIN_TERRAIN_CLEARANCE_FOR_WARNING);

                const isFirstLegFromAirport = i === 0 && step.wp && step.wp.type === WaypointType.airport;
                const isLastLegToAirport = i === steps.length - 1 && step.wp && step.wp.type === WaypointType.airport;

                if (!isFirstLegFromAirport && isLastLegToAirport && (currentAlt.isLessThan(minTerrainAltFtForWarning))) {
                    step.warning = terrainClearanceText;
                } else if (isFirstLegFromAirport && nextAlt.isLessThan(minTerrainAltFtForWarning)) {
                    step.warning = terrainClearanceText;
                } else if (isLastLegToAirport && currentAlt.isLessThan(minTerrainAltFtForWarning)) {
                    step.warning = terrainClearanceText;
                }
            }*/

            step.displayAlt = nextAlt;
            prevAlt = nextAlt;
        }
    }

    // endregion
}
