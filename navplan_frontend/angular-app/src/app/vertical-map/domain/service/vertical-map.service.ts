import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {VerticalMap} from '../model/vertical-map';
import {Flightroute} from '../../../flightroute/domain/model/flightroute';
import {tap} from 'rxjs/operators';
import {IVerticalMapService} from './i-vertical-map.service';
import {IVerticalMapRepoService} from './i-vertical-map-repo.service';
import {ForecastSelection} from '../../../meteo-dwd/domain/model/forecast-selection';


@Injectable()
export class VerticalMapService implements IVerticalMapService {
    constructor(private restService: IVerticalMapRepoService) {
    }


    public readVerticalMap(flightroute: Flightroute, fcSelection: ForecastSelection): Observable<VerticalMap> {
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
            })
        );
    }
}
