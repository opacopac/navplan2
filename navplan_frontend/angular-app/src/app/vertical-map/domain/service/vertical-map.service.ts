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
import {Speed} from '../../../geo-physics/domain/model/quantities/speed';
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
        this.calcStepsEnvelopeForwards(legs, aircraft);
        this.calcStepsEnvelopeBackwards(legs, aircraft);
        this.calcStepDisplayAlts(legs, cruiseAltitude, aircraft);
        // this.calculateLegAndStepAltitudeEnvelopeFromEndToStart(legs, aircraft);
        // this.calcLegAndStepDisplayAltitudesAndWarnings(legs, cruiseAltitude, aircraft);

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


    private calcStepsEnvelopeForwards(legs: LegAltitudeMetadata[], aircraft: Aircraft): void {
        for (let i = 0; i < legs.length; i++) {
            const leg = legs[i];
            const step0 = leg.steps[0];

            // init leg start envelope altitudes
            if (i === 0) {
                this.determineEnvelopeAltByPrio(
                    leg.startAlt,
                    step0.minTerrainClearanceAlt,
                    step0.minTerrainClearanceAlt,
                    aircraft.serviceCeiling
                );
            } else {
                const prevLeg = legs[i - 1];
                this.determineEnvelopeAltByPrio(
                    leg.startAlt,
                    step0.minTerrainClearanceAlt,
                    prevLeg.endAlt.minEnvelopeAlt,
                    prevLeg.endAlt.maxEnvelopeAlt
                );
            }

            for (let j = 0; j < leg.steps.length; j++) {
                const step = leg.steps[j];

                if (j === 0) {
                    // use altitudes from leg start
                    this.determineEnvelopeAltByPrio(
                        step.altMetaData,
                        step.minTerrainClearanceAlt,
                        leg.startAlt.minEnvelopeAlt,
                        leg.startAlt.maxEnvelopeAlt
                    );
                } else {
                    // calculate climb/descent performance from previous step
                    const prevStep = leg.steps[j - 1];
                    const stepMinClimbAltFt = aircraft.calcClimbTargetAlt(prevStep.altMetaData.minEnvelopeAlt, step.climbTime);
                    const stepMaxDecentAltFt = aircraft.calcDescentTargetAlt(
                        prevStep.altMetaData.maxEnvelopeAlt,
                        step.flightTime,
                        Aircraft.DEFAULT_DESCENT_RATE
                    );

                    this.determineEnvelopeAltByPrio(
                        step.altMetaData,
                        step.minTerrainClearanceAlt,
                        stepMinClimbAltFt,
                        stepMaxDecentAltFt
                    );
                }

                if (j === leg.steps.length - 1) {
                    // set leg end altitudes from last step
                    leg.endAlt.minEnvelopeAlt = step.altMetaData.minEnvelopeAlt;
                    leg.endAlt.maxEnvelopeAlt = step.altMetaData.maxEnvelopeAlt;
                }
            }
        }
    }


    private calcStepsEnvelopeBackwards(legs: LegAltitudeMetadata[], aircraft: Aircraft): void {
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


            for (let j = leg.steps.length - 1; j >= 0; j--) {
                const step = leg.steps[j];

                if (j === leg.steps.length - 1) {
                    // use altitudes from leg end
                    this.determineEnvelopeAltByPrio(
                        step.altMetaData,
                        step.minTerrainClearanceAlt,
                        leg.endAlt.minEnvelopeAlt,
                        leg.endAlt.maxEnvelopeAlt
                    );
                } else {
                    const nextStep = j < leg.steps.length - 1 ? leg.steps[j + 1] : null;

                    // calculate climb/descent performance backwards from step end to start
                    const stepMinClimbAlt = aircraft.calcClimbStartingAlt(nextStep.altMetaData.minEnvelopeAlt, nextStep.climbTime);
                    const stepMaxDecentAlt = aircraft.calcDescentStartingAlt(
                        nextStep.altMetaData.maxEnvelopeAlt,
                        nextStep.flightTime,
                        Aircraft.DEFAULT_DESCENT_RATE
                    );
                    const stepMinEnvAlt = stepMinClimbAlt.isLessThan(step.altMetaData.minEnvelopeAlt)
                        ? step.altMetaData.minEnvelopeAlt
                        : stepMinClimbAlt;
                    const stepMaxEnvAlt = stepMaxDecentAlt.isGreaterThan(step.altMetaData.maxEnvelopeAlt)
                        ? step.altMetaData.maxEnvelopeAlt
                        : stepMaxDecentAlt;

                    this.determineEnvelopeAltByPrio(
                        step.altMetaData,
                        step.minTerrainClearanceAlt,
                        stepMinEnvAlt,
                        stepMaxEnvAlt
                    );
                }

                if (j === 0) {
                    // set leg start altitudes from first step
                    leg.startAlt.minEnvelopeAlt = step.altMetaData.minEnvelopeAlt;
                    leg.startAlt.maxEnvelopeAlt = step.altMetaData.maxEnvelopeAlt;
                }
            }
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

                if (currentAlt.isLessThan(step.altMetaData.minEnvelopeAlt) || !hasCruiseAltitudeBeenReached) {
                    nextAlt = step.altMetaData.minEnvelopeAlt;
                } else if (currentAlt.isGreaterThan(step.altMetaData.maxEnvelopeAlt)) {
                    nextAlt = step.altMetaData.maxEnvelopeAlt;
                } else {
                    nextAlt = currentAlt;
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
                    Aircraft.DEFAULT_DESCENT_RATE
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


    private determineEnvelopeAltByPrio(
        alt: AltitudeMetadata,
        minTerrainAlt: Length,
        propagatedMinAlt: Length,
        propagatedMaxAlt: Length
    ) {
        // prio 3: propagate previous values
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


    private calcLegAndStepDisplayAltitudesAndWarnings(legs: LegAltitudeMetadata[], cruiseAltitude: Length, aircraft: Aircraft): void {
        let hasCruiseAltitudeBeenReached = cruiseAltitude ? !cruiseAltitude : true;
        let currentAlt = legs[0].startAlt.minEnvelopeAlt;
        let nextAlt: Length;

        for (let i = 0; i < legs.length; i++) {
            const leg = legs[i];

            // determine leg start display alt
            const legStartAlt = this.getLegDisplayAlt(currentAlt, leg.startAlt, leg.minTerrainClearanceAlt);
            leg.startAlt.displayAlt = legStartAlt;
            leg.steps[0].altMetaData.displayAlt = legStartAlt;
            currentAlt = legStartAlt;

            for (let j = 0; j < leg.steps.length; j++) {
                const step = leg.steps[j];
                const isLastStep = j === leg.steps.length - 1;

                if (currentAlt.isLessThan(leg.endAlt.minEnvelopeAlt) || !hasCruiseAltitudeBeenReached) {
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

                    if (isLastStep && (
                        nextAlt.isLessThan(leg.endAlt.minUserAlt) || nextAlt.isLessThan(leg.minTerrainClearanceAlt)
                    )) {
                        leg.warning = 'Climb performance may be insufficient to reach the altitude before the end of the leg!';
                        nextAlt = leg.endAlt.minEnvelopeAlt;
                    }
                } else if (currentAlt.isGreaterThan(step.altMetaData.maxEnvelopeAlt)) {
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

            const legEndAlt = this.getLegDisplayAlt(currentAlt, leg.endAlt, leg.minTerrainClearanceAlt);
            leg.endAlt.displayAlt = legEndAlt;
            currentAlt = legEndAlt;
        }
    }


    private getLegDisplayAlt(currentAlt: Length, altMetaData: AltitudeMetadata, minTerrainClearanceAlt: Length): Length {
        let resultingAlt = currentAlt;

        if (resultingAlt.isLessThan(minTerrainClearanceAlt)) {
            resultingAlt = minTerrainClearanceAlt;
        }

        if (resultingAlt.isGreaterThan(altMetaData.maxUserAlt)) {
            resultingAlt = altMetaData.maxUserAlt;
        }

        if (resultingAlt.isLessThan(altMetaData.minUserAlt)) {
            resultingAlt = altMetaData.minUserAlt;
        }

        return resultingAlt;
    }
}
