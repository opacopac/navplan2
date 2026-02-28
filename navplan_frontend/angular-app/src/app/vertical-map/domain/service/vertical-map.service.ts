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
            })
        );
    }


    public calcLegAltitudeMetadata(
        waypointSteps: VerticalMapWaypointStep[],
        terrainSteps: VerticalMapTerrainStep[],
        aircraft: Aircraft
    ): LegAltitudeMetadata[] {
        const legs = this.initLegs(waypointSteps, terrainSteps, aircraft);
        this.getMinTerrainClearanceForLegs(legs);
        this.getUserAltitudesForLegs(legs);
        this.clampLegsToFromAirportToGround(legs, terrainSteps);
        this.calculateAltitudeEnvelopeFromEndToStart(legs, aircraft);
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


    private calculateAltitudeEnvelopeFromEndToStart(legs: LegAltitudeMetadata[], aircraft: Aircraft): void {
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
                nextAlt = leg.endAlt.minAlt.isLessThan(maxClimbAlt) ?  leg.endAlt.minAlt : maxClimbAlt;
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
                } else if (leg.isFirstLegFromAirport && nextAlt.isLessThan( minTerrainAltFtForWarning)) {
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
}
