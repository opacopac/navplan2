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
import {RestReadByExtentService} from '../../../common/rest/service/rest-read-by-extent.service';


@Injectable()
export class AirportRestAdapterService extends RestReadByExtentService<ShortAirport, IRestShortAirport> implements IAirportRepoService {
    constructor(http: HttpClient) {
        super(http, environment.airportApiBaseUrl, 'ERROR reading airport list by extent');
    }


    public readAirportsByExtent(extent: Extent2d, zoom: number): Observable<ShortAirport[]> {
        return this.readByExtent(extent, zoom);
    }


    protected convertList(restItems: IRestShortAirport[]): ShortAirport[] {
        return RestShortAirportConverter.fromRestList(restItems);
    }


    public readAirportById(id: number): Observable<Airport> {
        const url: string = environment.airportApiBaseUrl + '/' + id;

        return this.http
            .get<IRestAirport>(
                url,
                HttpHelper.HTTP_OPTIONS_WITH_CREDENTIALS
            )
            .pipe(
                map((response) => RestAirportConverter.fromRest(response)),
                catchError(err => {
                    LoggingService.logResponseError('ERROR reading airport by id', err);
                    return throwError(err);
                })
            );
    }


    public readAirportByIcao(icao: string): Observable<Airport> {
        const url: string = environment.airportApiBaseUrl + '?icao=' + icao;

        return this.http
            .get<IRestAirport>(
                url,
                HttpHelper.HTTP_OPTIONS_WITH_CREDENTIALS
            )
            .pipe(
                map((response) => RestAirportConverter.fromRest(response)),
                catchError(err => {
                    LoggingService.logResponseError('ERROR reading airport by icao', err);
                    return throwError(err);
                })
            );
    }
}
