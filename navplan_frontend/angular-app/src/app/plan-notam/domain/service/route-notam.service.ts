import {Flightroute} from '../../../flightroute/domain/model/flightroute';
import {IRouteNotamService} from './i-route-notam.service';
import {Length} from '../../../geo-physics/domain/model/quantities/length';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {IRouteNotamRepoService} from './i-route-notam-repo.service';
import {Notam} from '../../../notam/domain/model/notam';


@Injectable()
export class RouteNotamService implements IRouteNotamService {
    public constructor(private routeNotamRepoService: IRouteNotamRepoService) {
    }


    public getRouteNotams(flightroute: Flightroute, maxRadius: Length): Observable<Notam[]> {
        return this.routeNotamRepoService.getRouteNotams(flightroute, maxRadius);
    }
}
