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
import {MockAircraftBr23} from '../../../aircraft/domain/mock/mock-aircraft-br23';
import {Aircraft} from '../../../aircraft/domain/model/aircraft';
import {StepAltitudeMetadata} from '../model/step-altitude-metadata';
import {Time} from '../../../geo-physics/domain/model/quantities/time';


@Injectable()
export class VerticalMapService implements IVerticalMapService {
    public static MIN_TERRAIN_CLEARANCE = Length.ofFt(1000);
    public static MIN_TERRAIN_CLEARANCE_FOR_WARNING = Length.ofFt(500);


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
                vm.mapHeight = Length.ofFt(15000);
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


    private initStepsWithUserAltitudes(legs: LegAltitudeMetadata[]): void {
        for (const leg of legs) {
            const firstStep = leg.steps[0];
            const lastStep = leg.steps[leg.steps.length - 1];

            firstStep.altMetaData.minUserAlt = leg.startAlt.minUserAlt;
            firstStep.altMetaData.maxUserAlt = leg.startAlt.maxUserAlt;
            lastStep.altMetaData.minUserAlt = leg.endAlt.minUserAlt;
            lastStep.altMetaData.maxUserAlt = leg.endAlt.maxUserAlt;
        }
    }


    private calcLegsEnvelopeForwards(legs: LegAltitudeMetadata[], aircraft: Aircraft): void {
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
                    prevLeg.endAlt.minEnvelopeAlt,
                    prevLeg.endAlt.maxEnvelopeAlt
                );
            }

            // copy leg start altitudes to first step
            firstStep.altMetaData.minEnvelopeAlt = leg.startAlt.minEnvelopeAlt;
            firstStep.altMetaData.maxEnvelopeAlt = leg.startAlt.maxEnvelopeAlt;

            // calc envelope altitudes
            this.calcLegStepsEnvelopeForwards(leg, aircraft);

            // copy leg end altitudes from last step
            const lastStep = leg.steps[leg.steps.length - 1];
            leg.endAlt.minEnvelopeAlt = lastStep.altMetaData.minEnvelopeAlt;
            leg.endAlt.maxEnvelopeAlt = lastStep.altMetaData.maxEnvelopeAlt;
        }
    }


    private calcLegStepsEnvelopeForwards(leg: LegAltitudeMetadata, aircraft: Aircraft): void {
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


    private calcLegsEnvelopeBackwards(legs: LegAltitudeMetadata[], aircraft: Aircraft): void {
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
                    nextLeg.startAlt.minEnvelopeAlt,
                    nextLeg.startAlt.maxEnvelopeAlt
                );
            }

            // copy leg end altitudes to last step
            lastStep.altMetaData.minEnvelopeAlt = leg.endAlt.minEnvelopeAlt;
            lastStep.altMetaData.maxEnvelopeAlt = leg.endAlt.maxEnvelopeAlt;

            // calc envelope altitudes
            this.calcLegStepsEnvelopeBackwards(leg, aircraft);

            // set leg start altitudes from first step
            const firstStep = leg.steps[0];
            leg.startAlt.minEnvelopeAlt = firstStep.altMetaData.minEnvelopeAlt;
            leg.startAlt.maxEnvelopeAlt = firstStep.altMetaData.maxEnvelopeAlt;
        }
    }


    private calcLegStepsEnvelopeBackwards(leg: LegAltitudeMetadata, aircraft: Aircraft): void {
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

    private calcStepDisplayAlts(legs: LegAltitudeMetadata[], cruiseAltitude: Length, aircraft: Aircraft): void {
        let hasCruiseAltitudeBeenReached = cruiseAltitude ? !cruiseAltitude : true;
        let currentAlt = legs[0].startAlt.minEnvelopeAlt;
        let nextAlt: Length;

        for (let i = 0; i < legs.length; i++) {
            const leg = legs[i];

            for (let j = 0; j < leg.steps.length; j++) {
                const step = leg.steps[j];

                nextAlt = currentAlt;

                if (currentAlt.isGreaterThan(step.altMetaData.maxEnvelopeAlt) || !hasCruiseAltitudeBeenReached) {
                    nextAlt = step.altMetaData.maxEnvelopeAlt;
                }

                if (currentAlt.isLessThan(step.altMetaData.minEnvelopeAlt)) {
                    nextAlt = step.altMetaData.minEnvelopeAlt;
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


    private calcStepDisplayAlts2(legs: LegAltitudeMetadata[], cruiseAltitude: Length, aircraft: Aircraft): void {
        debugger;
        const midLegStep = this.findCruiseAltReachedLegAndStep(legs, cruiseAltitude);
        let currentAlt = legs[midLegStep.legIdx].steps[midLegStep.stepIdx].altMetaData.maxEnvelopeAlt;
        let nextAlt: Length;

        // backwards from cruise altitude
        for (let i = midLegStep.legIdx; i >= 0; i--) {
            const leg = legs[i];
            const startStepIdx = i === midLegStep.legIdx ? midLegStep.stepIdx : leg.steps.length - 1;

            for (let j = startStepIdx; j >= 0; j--) {
                const step = leg.steps[j];

                nextAlt = currentAlt;

                if (currentAlt.isGreaterThan(step.altMetaData.maxEnvelopeAlt)) {
                    nextAlt = step.altMetaData.maxEnvelopeAlt;
                }

                if (currentAlt.isLessThan(step.altMetaData.minEnvelopeAlt)) {
                    nextAlt = step.altMetaData.minEnvelopeAlt;
                }

                step.altMetaData.displayAlt = nextAlt;

                if (j === 0) {
                    leg.startAlt.displayAlt = nextAlt;
                }

                currentAlt = nextAlt;
            }
        }

        // forwards from cruise altitude
        currentAlt = legs[midLegStep.legIdx].steps[midLegStep.stepIdx].altMetaData.maxEnvelopeAlt;
        for (let i = midLegStep.legIdx; i < legs.length; i++) {
            const leg = legs[i];
            const startStepIdx = i === midLegStep.legIdx ? midLegStep.stepIdx : 0;

            for (let j = startStepIdx; j < leg.steps.length; j++) {
                const step = leg.steps[j];

                nextAlt = currentAlt;

                if (currentAlt.isGreaterThan(step.altMetaData.maxEnvelopeAlt)) {
                    nextAlt = step.altMetaData.maxEnvelopeAlt;
                }

                if (currentAlt.isLessThan(step.altMetaData.minEnvelopeAlt)) {
                    nextAlt = step.altMetaData.minEnvelopeAlt;
                }

                step.altMetaData.displayAlt = nextAlt;

                if (j === leg.steps.length - 1) {
                    leg.endAlt.displayAlt = nextAlt;
                }

                currentAlt = nextAlt;
            }
        }
    }


    private findCruiseAltReachedLegAndStep(legs: LegAltitudeMetadata[], cruiseAltitude: Length): {
        legIdx: number,
        stepIdx: number
    } {
        for (let i = 0; i < legs.length; i++) {
            const leg = legs[i];
            for (let j = 0; j < leg.steps.length; j++) {
                const step = leg.steps[j];
                if (step.altMetaData.maxEnvelopeAlt.isGreaterThanOrEqual(cruiseAltitude)) {
                    return {
                        legIdx: i,
                        stepIdx: j
                    };
                }
            }
        }
    }
}
