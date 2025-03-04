import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {environment} from '../../../../environments/environment';
import {LoggingService} from '../../../system/domain/service/logging/logging.service';
import {Extent2d} from '../../../geo-physics/domain/model/geometry/extent2d';
import {ShortAirport} from '../../domain/model/short-airport';
import {IRestShortAirport} from '../model/i-rest-short-airport';
import {RestShortAirportConverter} from '../converter/rest-short-airport-converter';
import {Airport} from '../../domain/model/airport';
import {IRestAirport} from '../model/i-rest-airport';
import {RestAirportConverter} from '../converter/rest-airport-converter';
import {IAirportRepoService} from '../../domain/service/i-airport-repo.service';
import {HttpHelper} from '../../../system/domain/service/http/http-helper';


@Injectable()
export class AirportRestAdapterService implements IAirportRepoService {
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
            .get<IRestShortAirport[]>(url, HttpHelper.HTTP_OPTIONS_NO_CREDENTIALS)
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
            .get<IRestAirport>(url, HttpHelper.HTTP_OPTIONS_NO_CREDENTIALS)
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
            .get<IRestAirport>(url, HttpHelper.HTTP_OPTIONS_NO_CREDENTIALS)
            .pipe(
                map((response) => RestAirportConverter.fromRest(response.body)),
                catchError(err => {
                    LoggingService.logResponseError('ERROR reading airport by icao', err);
                    return throwError(err);
                })
            );
    }
}
