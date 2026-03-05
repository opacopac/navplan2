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
import {Time} from '../../../geo-physics/domain/model/quantities/time';


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
        // this.calculateLegAltitudeEnvelopeFromEndToStart(legs, aircraft);
        // this.calcLegsDisplayAltitudesAndWarnings(legs, cruiseAltitude, aircraft);
        // this.calcStepsDisplayAltitudesAndWarnings(legs, aircraft);
        this.calculateLegAndStepAltitudeEnvelopeFromEndToStart(legs, aircraft);
        this.calcLegAndStepDisplayAltitudesAndWarnings(legs, cruiseAltitude, aircraft);

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
            const flightTime = aircraft.calcCruiseFlightTime(legDist, extraTime);
            const climbTime = aircraft.calcCruiseClimbFlightTime(legDist, extraTime);
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


    private calcMinTerrainClearanceForLegsAndSteps(legs: LegAltitudeMetadata[]): void {
        for (const leg of legs) {
            let maxLegElevation = Length.ofZero();

            for (const step of leg.steps) {
                step.minTerrainClearanceAlt = leg.isFirstLegFromAirport || leg.isLastLegToAirport
                    ? step.elevationAmsl
                    : step.elevationAmsl.add(VerticalMapService.MIN_TERRAIN_CLEARANCE);

                if (step.minTerrainClearanceAlt.isGreaterThan(maxLegElevation)) {
                    maxLegElevation = step.minTerrainClearanceAlt;
                }
            }

            leg.minTerrainClearanceAlt = maxLegElevation;
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


    private calculateLegAndStepAltitudeEnvelopeFromEndToStart(legs: LegAltitudeMetadata[], aircraft: Aircraft): void {
        for (let i = legs.length - 1; i >= 0; i--) {
            const leg = legs[i];
            const nextLeg = i < legs.length - 1 ? legs[i + 1] : null;

            // init values from previous leg (or terrain clearance for last leg)
            const legBackPropMinAlt = nextLeg ? nextLeg.startAlt.minEnvelopeAlt : leg.minTerrainClearanceAlt;
            const legBackPropMaxAlt = nextLeg ? nextLeg.startAlt.maxEnvelopeAlt : leg.minTerrainClearanceAlt;

            // determine leg end altitudes by prio
            this.determineEnvelopeAltByPrio(leg.endAlt, leg.minTerrainClearanceAlt, legBackPropMinAlt, legBackPropMaxAlt);

            for (let j = leg.steps.length - 1; j >= 0; j--) {
                const step = leg.steps[j];

                // inherit user altitudes for last step from leg
                if (j === leg.steps.length - 1) {
                    step.altMetaData.minUserAlt = leg.endAlt.minUserAlt;
                    step.altMetaData.maxUserAlt = leg.endAlt.maxUserAlt;
                }

                // get previous min/max alt
                const nextStep = j < leg.steps.length - 1 ? leg.steps[j + 1] : null;
                const nextStepMinAlt = nextStep ? nextStep.altMetaData.minEnvelopeAlt : legBackPropMinAlt;
                const nextStepMaxAlt = nextStep ? nextStep.altMetaData.maxEnvelopeAlt : legBackPropMaxAlt;

                // calculate climb/descent performance backwards from step end to start
                const stepStartMinClimbAltFt = aircraft.calcClimbStartingAlt(nextStepMinAlt, step.climbTime);
                const stepStartMaxDecentAltFt = aircraft.calcDescentStartingAlt(
                    nextStepMaxAlt,
                    step.flightTime,
                    VerticalMapService.DEFAULT_DESCENT_RATE
                );

                this.determineEnvelopeAltByPrio(
                    step.altMetaData,
                    step.minTerrainClearanceAlt,
                    stepStartMinClimbAltFt,
                    stepStartMaxDecentAltFt
                );

                if (j === 0) {
                    leg.startAlt.minEnvelopeAlt = step.altMetaData.minEnvelopeAlt;
                    leg.startAlt.maxEnvelopeAlt = step.altMetaData.maxEnvelopeAlt;
                }
            }

            // determine leg start altitudes by prio
            this.determineEnvelopeAltByPrio(
                leg.startAlt,
                leg.minTerrainClearanceAlt,
                leg.startAlt.minEnvelopeAlt,
                leg.startAlt.maxEnvelopeAlt
            );
        }
    }


    /*private calculateLegAltitudeEnvelopeFromEndToStart(legs: LegAltitudeMetadata[], aircraft: Aircraft): void {
        for (let i = legs.length - 1; i >= 0; i--) {
            const leg = legs[i];
            const nextLeg = i < legs.length - 1 ? legs[i + 1] : null;

            // init values from previous leg (or terrain clearance for last leg)
            const backPropMinAlt = nextLeg ? nextLeg.startAlt.minEnvelopeAlt : leg.minTerrainClearanceAlt;
            const backPropMaxAlt = nextLeg ? nextLeg.startAlt.maxEnvelopeAlt : leg.minTerrainClearanceAlt;

            // determine leg end altitudes by prio
            this.determineEnvelopeAltByPrio(leg.endAlt, leg.minTerrainClearanceAlt, backPropMinAlt, backPropMaxAlt);

            // calculate climb/descent performance backwards from leg end to start
            const legStartMinClimbAltFt = aircraft.calcClimbStartingAlt(leg.endAlt.minEnvelopeAlt, leg.climbTime);
            const legStartMaxDecentAltFt = AircraftClimbPerformanceService.calcDescentStartingAlt(
                leg.endAlt.maxEnvelopeAlt,
                leg.flightTime,
                VerticalMapService.DEFAULT_DESCENT_RATE
            );

            // determine leg start altitudes by prio
            this.determineEnvelopeAltByPrio(leg.startAlt, leg.minTerrainClearanceAlt, legStartMinClimbAltFt, legStartMaxDecentAltFt);
        }
    }*/


    private determineEnvelopeAltByPrio(
        alt: AltitudeMetadata,
        minTerrainAlt: Length,
        backPropMinAlt: Length,
        backPropMaxAlt: Length
    ) {
        // prio 3: back-propagate previous values
        alt.minEnvelopeAlt = backPropMinAlt;
        alt.maxEnvelopeAlt = backPropMaxAlt;

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


    /*private calcLegsDisplayAltitudesAndWarnings(legs: LegAltitudeMetadata[], cruiseAltitude: Length, aircraft: Aircraft): void {
        let hasCruiseAltitudeBeenReached = cruiseAltitude ? !cruiseAltitude : true;
        let currentAlt = legs[0].steps[0].elevationAmsl; // start at first terrain elevation
        let nextAlt = currentAlt;

        for (let i = 0; i < legs.length; i++) {
            const leg = legs[i];
            if (leg.endAlt.minEnvelopeAlt.isGreaterThan(currentAlt) || !hasCruiseAltitudeBeenReached) {
                // climb
                const maxClimbAlt = aircraft.calcClimbTargetAlt(currentAlt, leg.climbTime);
                const targetAlt = hasCruiseAltitudeBeenReached
                    ? leg.endAlt.minEnvelopeAlt
                    : leg.endAlt.minEnvelopeAlt.isLessThan(cruiseAltitude)
                        ? leg.endAlt.maxEnvelopeAlt.isGreaterThan(cruiseAltitude) ? cruiseAltitude : leg.endAlt.maxEnvelopeAlt
                        : leg.endAlt.minEnvelopeAlt;

                nextAlt = maxClimbAlt.isGreaterThan(targetAlt) ? targetAlt : maxClimbAlt;

                if (maxClimbAlt.isLessThan(leg.endAlt.minUserAlt) || maxClimbAlt.isLessThan(leg.minTerrainClearanceAlt)) {
                    leg.warning = 'Climb performance may be insufficient to reach the altitude before the end of the leg!';
                    nextAlt = leg.endAlt.minEnvelopeAlt;
                }
            } else if (leg.endAlt.maxEnvelopeAlt.isLessThan(currentAlt)) {
                // descent
                nextAlt = leg.endAlt.maxEnvelopeAlt;
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

            if (nextAlt.isGreaterThanOrEqual(cruiseAltitude)) {
                hasCruiseAltitudeBeenReached = true;
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
                    const maxClimbAlt = aircraft.calcClimbTargetAlt(currentAlt, step.climbTime);

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
    }*/


    private calcLegAndStepDisplayAltitudesAndWarnings(legs: LegAltitudeMetadata[], cruiseAltitude: Length, aircraft: Aircraft): void {
        let hasCruiseAltitudeBeenReached = cruiseAltitude ? !cruiseAltitude : true;
        let currentAlt = legs[0].startAlt.minEnvelopeAlt;
        let nextAlt: Length;

        for (let i = 0; i < legs.length; i++) {
            const leg = legs[i];
            leg.startAlt.displayAlt = currentAlt;

            for (let j = 0; j < leg.steps.length; j++) {
                const step = leg.steps[j];

                if (leg.endAlt.minEnvelopeAlt.isGreaterThan(currentAlt) || !hasCruiseAltitudeBeenReached) {
                    // climb
                    const maxClimbAlt = aircraft.calcClimbTargetAlt(currentAlt, step.climbTime);
                    const targetAlt = hasCruiseAltitudeBeenReached
                        ? leg.endAlt.minEnvelopeAlt
                        : leg.endAlt.minEnvelopeAlt.isLessThan(cruiseAltitude)
                            ? leg.endAlt.maxEnvelopeAlt.isGreaterThan(cruiseAltitude)
                                ? cruiseAltitude
                                : leg.endAlt.maxEnvelopeAlt
                            : leg.endAlt.minEnvelopeAlt;

                    nextAlt = maxClimbAlt.isGreaterThan(targetAlt) ? targetAlt : maxClimbAlt;

                    /*if (maxClimbAlt.isLessThan(leg.endAlt.minUserAlt) || maxClimbAlt.isLessThan(leg.minTerrainClearanceAlt)) {
                        leg.warning = 'Climb performance may be insufficient to reach the altitude before the end of the leg!';
                        nextAlt = leg.endAlt.minEnvelopeAlt;
                    }*/
                } else if (leg.endAlt.maxEnvelopeAlt.isLessThan(currentAlt)) {
                    // descent
                    nextAlt = step.altMetaData.maxEnvelopeAlt;
                } else {
                    nextAlt = currentAlt;
                }

                /*if (!leg.warning) {
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
                }*/

                if (nextAlt.isGreaterThanOrEqual(cruiseAltitude)) {
                    hasCruiseAltitudeBeenReached = true;
                }

                step.altMetaData.displayAlt = currentAlt;
                currentAlt = nextAlt;
            }

            leg.endAlt.displayAlt = currentAlt;
        }
    }
}
