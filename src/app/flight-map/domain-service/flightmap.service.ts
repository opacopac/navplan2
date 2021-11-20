import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Extent2d} from '../../common/geo-math/domain-model/geometry/extent2d';
import {IFlightmapService} from './i-flightmap.service';
import {AirportState} from '../../aerodrome/domain-model/airport-state';


@Injectable()
export class FlightmapService implements IFlightmapService {
    constructor() {
    }


    public readByExtent(extent: Extent2d, zoom: number): Observable<AirportState> {
        return of(undefined);
    }
}
