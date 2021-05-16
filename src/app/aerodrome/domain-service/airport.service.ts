import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Extent2d} from '../../common/geo-math/domain-model/geometry/extent2d';
import {ShortAirport} from '../domain-model/short-airport';
import {Airport} from '../domain-model/airport';
import {AirportRestService} from '../rest-service/airport-rest.service';
import {AirportState} from '../domain-model/airport-state';
import {map} from 'rxjs/operators';


@Injectable()
export class AirportService {
    constructor(private airportRestService: AirportRestService) {
    }


    public readByExtent(extent: Extent2d, zoom: number): Observable<AirportState> {
        return this.airportRestService.readAirportsByExtent(extent, zoom).pipe(
            map(shortAirports => ({
                extent: extent,
                zoom: zoom,
                airports: shortAirports,
            }))
        );
    }


    public readAirportById(id: number): Observable<Airport> {
        return this.airportRestService.readAirportById(id);
    }


    public isReloadRequired(
        requestedState: { extent: Extent2d, zoom: number },
        currentState: { extent: Extent2d, zoom: number }
    ): boolean {
        return !currentState.extent || !requestedState.extent ||
            currentState.zoom !== requestedState.zoom ||
            !currentState.extent.containsExtent2d(requestedState.extent);
    }


    public findAirportInState(icao: string, airportState: AirportState): ShortAirport {
        if (!icao) {
            return undefined;
        }

        const results = airportState.airports
            .filter(airport => airport.icao === icao);

        return results.length > 0 ? results[0] : undefined;
    }
}
