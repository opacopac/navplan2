import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Extent2d} from '../../common/geo-math/domain-model/geometry/extent2d';
import {map} from 'rxjs/operators';
import {AirportCircuitState} from '../domain-model/airport-circuit-state';
import {IAirportCircuitService} from './i-airport-circuit.service';
import {IAirportCircuitRepo} from './i-airport-circuit-repo';


@Injectable()
export class AirportCircuitService implements IAirportCircuitService {
    private readonly AD_CIRCUIT_MIN_ZOOM = 12;


    constructor(private airportCircuitRepo: IAirportCircuitRepo) {
    }


    public readByExtent(extent: Extent2d, zoom: number): Observable<AirportCircuitState> {
        if (zoom < this.AD_CIRCUIT_MIN_ZOOM) {
            return of({ extent: extent, zoom: zoom, airportCircuits: [] });
        }

        return this.airportCircuitRepo.readAirportCircuitsByExtent(extent, zoom).pipe(
            map(circuits => ({
                extent: extent,
                zoom: zoom,
                airportCircuits: circuits
            }))
        );
    }


    public isReloadRequired(
        requestedState: { extent: Extent2d, zoom: number },
        currentState: { extent: Extent2d, zoom: number }
    ): boolean {
        return !currentState.extent || !requestedState.extent ||
            !currentState.extent.containsExtent2d(requestedState.extent) ||
            (currentState.zoom < this.AD_CIRCUIT_MIN_ZOOM && requestedState.zoom >= this.AD_CIRCUIT_MIN_ZOOM);
    }
}
