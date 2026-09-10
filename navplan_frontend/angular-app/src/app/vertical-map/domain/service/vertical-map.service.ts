import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {VerticalMap} from '../model/vertical-map';
import {Flightroute} from '../../../flightroute/domain/model/flightroute';
import {tap} from 'rxjs/operators';
import {IVerticalMapService} from './i-vertical-map.service';
import {IVerticalMapRepoService} from './i-vertical-map-repo.service';
import {ForecastSelection} from '../../../meteo-forecast/domain/model/forecast-selection';
import {Length} from '../../../geo-physics/domain/model/quantities/length';
import {MockAircraftBr23} from '../../../aircraft/domain/mock/mock-aircraft-br23';
import {IVerticalRouteService} from "./i-vertical-route.service";


@Injectable()
export class VerticalMapService implements IVerticalMapService {
    public static MIN_TERRAIN_CLEARANCE = Length.ofFt(1000); // TODO: duplicate in vertical route service


    constructor(
        private restService: IVerticalMapRepoService,
        private verticalRouteService: IVerticalRouteService
    ) {
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

                vm.legAltitudeMetadataList = this.verticalRouteService.calcLegAltitudeMetadata(
                    vm.waypointSteps,
                    vm.terrainSteps,
                    cruiseAlt,
                    aircraft
                );
            })
        );
    }
}
