import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Extent2d} from '../../common/geo-math/domain-model/geometry/extent2d';
import {filter, map, switchMap, withLatestFrom} from 'rxjs/operators';
import {AirspaceState} from '../domain-model/airspace-state';
import {IAirspaceRepo} from './i-airspace-repo';
import {IAirspaceService} from './i-airspace.service';
import {IAirspaceStateProvider} from './i-airspace-state-provider';
import {environment} from '../../../environments/environment';


@Injectable()
export class AirspaceService implements IAirspaceService {
    private readonly airspaceState$ = this.airspaceStateProvider.getStateObservable();


    constructor(
        private airspaceRepo: IAirspaceRepo,
        private airspaceStateProvider: IAirspaceStateProvider
    ) {
    }


    public readByExtent(extent: Extent2d, zoom: number): Observable<AirspaceState> {
        return of({ extent: extent, zoom: zoom }).pipe(
            withLatestFrom(this.airspaceState$),
            filter(([reqState, oldState]) => this.isReloadRequired(reqState, oldState)),
            switchMap(() => this.airspaceRepo.readAirspacesByExtent(extent, zoom)),
            map(airspaces => ({
                extent: extent.getOversizeExtent(environment.mapOversizeFactor),
                zoom: zoom,
                airspaces: airspaces,
            }))
        );
    }



    private isReloadRequired(
        requestedState: { extent: Extent2d, zoom: number },
        currentState: { extent: Extent2d, zoom: number }
    ): boolean {
        return !currentState.extent || !requestedState.extent ||
            currentState.zoom !== requestedState.zoom ||
            !currentState.extent.containsExtent2d(requestedState.extent);
    }
}
