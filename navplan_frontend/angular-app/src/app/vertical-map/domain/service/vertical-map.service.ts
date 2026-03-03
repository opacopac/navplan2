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
import {
    AircraftClimbPerformanceService
} from '../../../aircraft-performance/domain/service/aircraft-climb-performance.service';
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
                // TODO
                const cruiseAlt = flightroute.cruiseAltitude
                    ? flightroute.cruiseAltitude
                    : vm.terrainSteps.reduce((maxElev, step) =>
                        step.elevationAmsl.m > maxElev.m ? step.elevationAmsl : maxElev, vm.terrainSteps[0].elevationAmsl)
                        .add(VerticalMapService.MIN_TERRAIN_CLEARANCE);

                vm.legAltitudeMetadataList = this.calcLegAltitudeMetadata(
                    vm.waypointSteps,
                    vm.terrainSteps,
                    cruiseAlt,
                    aircraft
                );
            })
        );
    }


    public calcLegAltitudeMetadata(
        waypointSteps: VerticalMapWaypointStep[],
        terrainSteps: VerticalMapTerrainStep[],
        cruiseAltitude: Length,
        aircraft: Aircraft
    ): LegAltitudeMetadata[] {
        const legs = this.initLegsAndSteps(waypointSteps, terrainSteps, aircraft);
        this.calcLegStepFlightTimes(legs);
        this.calcMinTerrainClearanceForLegsAndSteps(legs);
        this.getUserAltitudesForLegs(legs);
        this.clampLegsToFromAirportToGround(legs, terrainSteps);
        this.calculateLegAltitudeEnvelopeFromEndToStart(legs, aircraft);
        this.calcLegsDisplayAltitudesAndWarnings(legs, cruiseAltitude, aircraft);
        this.calcStepsDisplayAltitudesAndWarnings(legs, aircraft);

        return legs;
    }


    private initLegsAndSteps(
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
            const extraTime = nextWpStep.waypoint.vacTime;
            const flightTime = AircraftClimbPerformanceService.calcFlightTime(legDist, aircraft.cruiseSpeed, extraTime);
            const climbTime = AircraftClimbPerformanceService.calcFlightTime(legDist, aircraft.cruiseClimbSpeed, extraTime);
            const isFirstLegFromAirport = i === 0 && wpStep.waypoint.type === WaypointType.airport;
            const isLastLegToAirport = i === waypointSteps.length - 2 && nextWpStep.waypoint.type === WaypointType.airport;
            const legSteps = terrainSteps
                .filter(step => step.horDist.m >= startLength.m && step.horDist.m <= endLength.m)
                .map(step => new StepAltitudeMetadata(step.horDist, step.elevationAmsl));
            const leg = new LegAltitudeMetadata(
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


    private calcLegStepFlightTimes(legs: LegAltitudeMetadata[]): void {
        for (const leg of legs) {
            const legLength = leg.endLength.subtract(leg.startLength);
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


    private calcMinTerrainClearanceForLegsAndSteps(legs: LegAltitudeMetadata[]): void {
        for (const leg of legs) {
            let maxLegElevationM = 0;

            for (const step of leg.steps) {
                step.minTerrainClearanceAlt = leg.isFirstLegFromAirport || leg.isLastLegToAirport
                    ? step.elevationAmsl
                    : step.elevationAmsl.add(VerticalMapService.MIN_TERRAIN_CLEARANCE);

                if (step.minTerrainClearanceAlt.m > maxLegElevationM) {
                    maxLegElevationM = step.minTerrainClearanceAlt.m;
                }
            }
            const maxLegElevation = Length.ofM(maxLegElevationM);

            leg.minTerrainClearanceAlt = maxLegElevation.add(VerticalMapService.MIN_TERRAIN_CLEARANCE);
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


    private calcLegsDisplayAltitudesAndWarnings(legs: LegAltitudeMetadata[], cruiseAltitude: Length, aircraft: Aircraft): void {
        let isCruiseAltitudeReached = cruiseAltitude ? !cruiseAltitude : true;
        let currentAlt = legs[0].steps[0].elevationAmsl; // start at first terrain elevation
        let nextAlt = currentAlt;

        for (let i = 0; i < legs.length; i++) {
            const leg = legs[i];
            if (leg.endAlt.minAlt.isGreaterThan(currentAlt) || !isCruiseAltitudeReached) {
                const maxClimbAlt = AircraftClimbPerformanceService.calcClimbTargetAlt(
                    currentAlt,
                    leg.climbTime,
                    aircraft.rocSealevel,
                    aircraft.serviceCeiling
                );

                if (isCruiseAltitudeReached) {
                    nextAlt = leg.endAlt.minAlt.isLessThan(maxClimbAlt) ? leg.endAlt.minAlt : maxClimbAlt;
                } else {
                    nextAlt = cruiseAltitude.isGreaterThan(maxClimbAlt) ? cruiseAltitude : maxClimbAlt;
                    if (nextAlt.isGreaterThan(leg.endAlt.maxAlt)) {
                        nextAlt = leg.endAlt.maxAlt;
                    } else {
                        isCruiseAltitudeReached = true;
                    }
                }

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


    private calcStepsDisplayAltitudesAndWarnings(legs: LegAltitudeMetadata[], aircraft: Aircraft): void {
        for (const leg of legs) {
            const legStartAlt = leg.startAlt.displayAlt;
            const legEndAlt = leg.endAlt.displayAlt;
            const legDescentRate = AircraftClimbPerformanceService.calcDescendRate(legStartAlt, legEndAlt, leg.flightTime);

            let currentAlt = legStartAlt;
            let nextAlt = currentAlt;
            leg.steps[0].displayAlt = currentAlt;

            for (let i = 1; i < leg.steps.length; i++) {
                const step = leg.steps[i];

                if (legEndAlt.isGreaterThan(currentAlt)) {
                    const maxClimbAlt = AircraftClimbPerformanceService.calcClimbTargetAlt(
                        currentAlt,
                        step.climbTime,
                        aircraft.rocSealevel,
                        aircraft.serviceCeiling
                    );

                    nextAlt = maxClimbAlt.isLessThan(legEndAlt) ? maxClimbAlt : legEndAlt;
                } else if (legEndAlt.isLessThan(currentAlt)) {
                    const descentAlt = AircraftClimbPerformanceService.calcDescentTargetAlt(
                        currentAlt,
                        step.flightTime,
                        legDescentRate
                    );

                    nextAlt = legEndAlt.isGreaterThan(descentAlt) ? legEndAlt : descentAlt;
                } else {
                    nextAlt = currentAlt;
                }

                step.displayAlt = nextAlt;
                currentAlt = nextAlt;
            }
        }
    }
}
