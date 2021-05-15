import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Extent2d} from '../../common/geo-math/domain-model/geometry/extent2d';
import {of} from 'rxjs/internal/observable/of';
import {map} from 'rxjs/operators';
import {AirportCircuitState} from '../domain-model/airport-circuit-state';
import {AirportCircuitRestService} from '../rest-service/airport-circuit-rest.service';


@Injectable()
export class AirportCircuitService {
    private readonly AD_CIRCUIT_MIN_ZOOM = 12;


    constructor(private airportCircuitRestService: AirportCircuitRestService) {
    }


    public readAirportCircuitsByExtent(extent: Extent2d, zoom: number): Observable<AirportCircuitState> {
        if (zoom < this.AD_CIRCUIT_MIN_ZOOM) {
            return of({ extent: extent, zoom: zoom, airportCircuits: [] });
        }

        return this.airportCircuitRestService.readAirportCircuitsByExtent(extent, zoom).pipe(
            map(circuits => ({
                extent: extent,
                zoom: zoom,
                airportCircuits: circuits
            }))
        );
    }


    public isAirportCircuitReloadRequired(
        requestedState: { extent: Extent2d, zoom: number },
        currentState: { extent: Extent2d, zoom: number }
    ): boolean {
        return !currentState.extent || !requestedState.extent ||
            !currentState.extent.containsExtent2d(requestedState.extent) ||
            (currentState.zoom < this.AD_CIRCUIT_MIN_ZOOM && requestedState.zoom >= this.AD_CIRCUIT_MIN_ZOOM);
    }
}
