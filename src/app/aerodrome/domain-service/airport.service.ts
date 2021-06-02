import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Extent2d} from '../../common/geo-math/domain-model/geometry/extent2d';
import {Airport} from '../domain-model/airport';
import {AirportState} from '../domain-model/airport-state';
import {filter, map, switchMap, withLatestFrom} from 'rxjs/operators';
import {IAirportService} from './i-airport.service';
import {IAirportRepo} from './i-airport-repo';
import {IAirportStateProvider} from './i-airport-state-provider';
import {environment} from '../../../environments/environment';


@Injectable()
export class AirportService implements IAirportService {
    private readonly airportState$: Observable<AirportState> = this.airportStateProvider.getStateObservable();


    constructor(
        private airportRepo: IAirportRepo,
        private airportStateProvider: IAirportStateProvider
    ) {
    }


    public readByExtent(extent: Extent2d, zoom: number): Observable<AirportState> {
        return of({ extent: extent, zoom: zoom }).pipe(
            withLatestFrom(this.airportState$),
            filter(([reqState, oldState]) => this.isReloadRequired(reqState, oldState)),
            switchMap(() => this.airportRepo.readAirportsByExtent(extent, zoom)),
            map(airports => ({
                extent: extent.getOversizeExtent(environment.mapOversizeFactor),
                zoom: zoom,
                airports: airports,
            }))
        );
    }


    public readById(id: number): Observable<Airport> {
        return this.airportRepo.readAirportById(id);
    }


    public readByIcao(icao: string): Observable<Airport> {
        if (!icao) {
            return of(undefined);
        }

        return this.airportRepo.readAirportByIcao(icao);
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
