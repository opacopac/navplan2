import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {LoggingService} from '../../../system/domain/service/logging/logging.service';
import {FlightrouteListEntry} from '../../domain/model/flightroute-list-entry';
import {Flightroute} from '../../domain/model/flightroute';
import {IRestFlightrouteListResponse} from '../model/i-rest-flightroute-list-response';
import {IRestFlightrouteResponse} from '../model/i-rest-flightroute-response';
import {RestFlightrouteResponseConverter} from '../converter/rest-flightroute-response-converter';
import {RestFlightrouteListConverter} from '../converter/rest-flightroute-list-converter';
import {IFlightrouteRepoService} from '../../domain/service/i-flightroute-repo.service';
import {RestFlightrouteConverter} from '../converter/rest-flightroute-converter';
import {HttpHelper} from '../../../system/domain/service/http/http-helper';
import {catchError, map} from 'rxjs/operators';
import {RestCrudService} from '../../../common/rest/service/rest-crud.service';


@Injectable()
export class RestFlightrouteRepoService extends RestCrudService<Flightroute, IRestFlightrouteResponse> implements IFlightrouteRepoService {
    constructor(http: HttpClient) {
        super(http, environment.flightrouteApiBaseUrl, 'flight route');
    }


    protected convertFromRest(restItem: IRestFlightrouteResponse): Flightroute {
        return RestFlightrouteResponseConverter.fromRest(restItem);
    }


    protected convertToRest(flightroute: Flightroute): {navplan: unknown} {
        return {navplan: RestFlightrouteConverter.toRest(flightroute)};
    }


    // region flightroute list

    public readFlightrouteList(): Observable<FlightrouteListEntry[]> {
        const url: string = environment.flightrouteApiBaseUrl;

        return this.http
            .get<IRestFlightrouteListResponse>(url, HttpHelper.HTTP_OPTIONS_WITH_CREDENTIALS)
            .pipe(
                map((response) => RestFlightrouteListConverter.fromRest(response)),
                catchError(err => {
                    LoggingService.logResponseError('ERROR reading flight route list', err);
                    return throwError(err);
                })
            );
    }

    // endregion


    // region flightroute CRUD

    public readFlightroute(flightrouteId: number): Observable<Flightroute> {
        return this.read(flightrouteId);
    }


    public saveFlightroute(flightroute: Flightroute): Observable<Flightroute> {
        return this.save(flightroute, flightroute.id);
    }


    public duplicateFlightroute(flightrouteId: number): Observable<Flightroute> {
        return this.duplicate(flightrouteId);
    }


    public deleteFlightroute(flightrouteId: number): Observable<boolean> {
        return this.delete(flightrouteId);
    }

    // endregion


    // region shared flightroute CRUD

    public createSharedFlightroute(flightroute: Flightroute): Observable<string> {
        // return $http.post(navplanBaseUrl, obj2json({ createShared: true, globalData: globalData }));
        return of(undefined);
    }


    public readSharedFlightroute(shareId: string): Observable<Flightroute> {
        // return $http.get(navplanBaseUrlGet + '&shareid=' + share_id);
        return of(undefined);
    }

    // endregion
}
