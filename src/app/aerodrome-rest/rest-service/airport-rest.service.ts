import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {LoggingService} from '../../system/domain-service/logging/logging.service';
import {Extent2d} from '../../common/geo-math/domain-model/geometry/extent2d';
import {ShortAirport} from '../../aerodrome/domain-model/short-airport';
import {IRestShortAirport} from '../rest-model/i-rest-short-airport';
import {RestShortAirportConverter} from '../rest-model/rest-short-airport-converter';
import {Airport} from '../../aerodrome/domain-model/airport';
import {IRestAirport} from '../rest-model/i-rest-airport';
import {RestAirportConverter} from '../rest-model/rest-airport-converter';
import {IAirportRepoService} from '../../aerodrome/domain-service/i-airport-repo.service';


@Injectable()
export class AirportRestService implements IAirportRepoService {
    constructor(private http: HttpClient) {
    }


    public readAirportsByExtent(extent: Extent2d, zoom: number): Observable<ShortAirport[]> {
        const url: string = environment.airportServiceUrl + '?action=getShortAdByExtent'
            + '&minlon=' + extent.minLon
            + '&minlat=' + extent.minLat
            + '&maxlon=' + extent.maxLon
            + '&maxlat=' + extent.maxLat
            + '&zoom=' + zoom;

        return this.http
            .get<IRestShortAirport[]>(url, {observe: 'response'})
            .pipe(
                map((response) => RestShortAirportConverter.fromRestList(response.body)),
                catchError(err => {
                    LoggingService.logResponseError('ERROR reading airport list by extent', err);
                    return throwError(err);
                })
            );
    }


    public readAirportById(id: number): Observable<Airport> {
        const url: string = environment.airportServiceUrl + '?action=getAdById&id=' + id;

        return this.http
            .get<IRestAirport>(url, {observe: 'response'})
            .pipe(
                map((response) => RestAirportConverter.fromRest(response.body)),
                catchError(err => {
                    LoggingService.logResponseError('ERROR reading airport by id', err);
                    return throwError(err);
                })
            );
    }


    public readAirportByIcao(icao: string): Observable<Airport> {
        const url: string = environment.airportServiceUrl + '?action=getAdByIcao&icao=' + icao;

        return this.http
            .get<IRestAirport>(url, {observe: 'response'})
            .pipe(
                map((response) => RestAirportConverter.fromRest(response.body)),
                catchError(err => {
                    LoggingService.logResponseError('ERROR reading airport by icao', err);
                    return throwError(err);
                })
            );
    }
}
