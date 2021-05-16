import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Extent2d} from '../../common/geo-math/domain-model/geometry/extent2d';
import {RestAirspaceService} from '../rest-service/rest-airspace.service';
import {map} from 'rxjs/operators';
import {AirspaceState} from '../domain-model/airspace-state';


@Injectable()
export class AirspaceService {
    constructor(private restAirspaceService: RestAirspaceService) {
    }


    public readByExtent(extent: Extent2d, zoom: number): Observable<AirspaceState> {
        return this.restAirspaceService.readAirspacesByExtent(extent, zoom).pipe(
            map(airspaces => ({
                extent: extent,
                zoom: zoom,
                airspaces: airspaces,
            }))
        );
    }



    public isReloadRequired(
        requestedState: { extent: Extent2d, zoom: number },
        currentState: { extent: Extent2d, zoom: number }
    ): boolean {
        return !currentState.extent || !requestedState.extent ||
            currentState.zoom !== requestedState.zoom ||
            !currentState.extent.containsExtent2d(requestedState.extent);
    }
}
