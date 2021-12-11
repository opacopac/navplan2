import {Observable} from 'rxjs';
import {Extent2d} from '../../geo-physics/domain-model/geometry/extent2d';
import {AirportCircuit} from '../domain-model/airport-circuit';
import {IAirportCircuitService} from './i-airport-circuit.service';
import {IAirportCircuitRepoService} from './i-airport-circuit-repo.service';
import {Injectable} from '@angular/core';


@Injectable()
export class AirportCircuitService implements IAirportCircuitService {
    public constructor(private airportCircuitRepo: IAirportCircuitRepoService) {
    }


    public readAirportCircuitsByExtent(extent: Extent2d, zoom: number): Observable<AirportCircuit[]> {
        return this.airportCircuitRepo.readAirportCircuitsByExtent(extent, zoom);
    }
}
