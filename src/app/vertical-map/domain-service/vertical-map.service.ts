import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {VerticalMap} from '../domain-model/vertical-map';
import {RestVerticalMapService} from '../rest-service/rest-vertical-map.service';
import {Flightroute} from '../../flightroute/domain-model/flightroute';
import {tap} from 'rxjs/operators';
import {IVerticalMapService} from './i-vertical-map.service';


@Injectable({
    providedIn: 'root'
})
export class VerticalMapService implements IVerticalMapService {
    constructor(private restService: RestVerticalMapService) {
    }


    readVerticalMap(flightroute: Flightroute): Observable<VerticalMap> {
        return this.restService.readVerticalMap(
            flightroute.waypoints.map(wp => wp.position.toArray())
        ).pipe(
            // additionally link to waypoints
            tap(vm => {
                for (let i = 0; i < flightroute.waypoints.length; i++) {
                    vm.waypointSteps[i].waypoint = flightroute.waypoints[i];
                    // TODO: height
                }
            })
        );
    }
}
