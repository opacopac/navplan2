import {Extent2d} from '../../common/geo-math/domain-model/geometry/extent2d';
import {Observable, of} from 'rxjs';
import {Injectable} from '@angular/core';
import {filter, map, switchMap, withLatestFrom} from 'rxjs/operators';
import {NavaidState} from '../domain-model/navaid-state';
import {INavaidService} from './i-navaid.service';
import {INavaidStateProvider} from './i-navaid-state-provider';
import {INavaidRepo} from './i-navaid-repo';
import {environment} from '../../../environments/environment';


@Injectable()
export class NavaidService implements INavaidService {
    private readonly navaidState$: Observable<NavaidState> = this.navaidStateProvider.getStateObservable();


    constructor(
        private navaidRepo: INavaidRepo,
        private navaidStateProvider: INavaidStateProvider
    ) {
    }


    public readByExtent(extent: Extent2d, zoom: number): Observable<NavaidState> {
        return of({ extent: extent, zoom: zoom }).pipe(
            withLatestFrom(this.navaidState$),
            filter(([reqState, oldState]) => this.isReloadRequired(reqState, oldState)),
            switchMap(() => this.navaidRepo.readNavaidsByExtent(extent, zoom)),
            map(navaids => ({
                extent: extent.getOversizeExtent(environment.mapOversizeFactor),
                zoom: zoom,
                navaids: navaids,
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
