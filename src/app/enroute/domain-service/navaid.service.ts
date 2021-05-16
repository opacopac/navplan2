import {Extent2d} from '../../common/geo-math/domain-model/geometry/extent2d';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {NavaidState} from '../domain-model/navaid-state';
import {RestNavaidService} from '../rest-service/rest-navaid.service';


@Injectable()
export class NavaidService {
    constructor(private restNavaidService: RestNavaidService) {
    }


    public readByExtent(extent: Extent2d, zoom: number): Observable<NavaidState> {
        return this.restNavaidService.readNavaidsByExtent(extent, zoom).pipe(
            map(navaids => ({
                extent: extent,
                zoom: zoom,
                navaids: navaids,
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
