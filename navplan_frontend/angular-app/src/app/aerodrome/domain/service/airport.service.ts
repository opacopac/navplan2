import {Observable} from 'rxjs';
import {Extent2d} from '../../../geo-physics/domain/model/geometry/extent2d';
import {ShortAirport} from '../model/short-airport';
import {Airport} from '../model/airport';
import {IAirportService} from './i-airport.service';
import {IAirportRepoService} from './i-airport-repo.service';
import {Injectable} from '@angular/core';


@Injectable()
export class AirportService implements IAirportService {
    public constructor(private airportRepo: IAirportRepoService) {
    }


    public readAirportsByExtent(extent: Extent2d, zoom: number): Observable<ShortAirport[]> {
        return this.airportRepo.readAirportsByExtent(extent, zoom);
    }


    public readAirportById(id: number): Observable<Airport> {
        return this.airportRepo.readAirportById(id);
    }


    public readAirportByIcao(icao: string): Observable<Airport> {
        return this.airportRepo.readAirportByIcao(icao);
    }
}
