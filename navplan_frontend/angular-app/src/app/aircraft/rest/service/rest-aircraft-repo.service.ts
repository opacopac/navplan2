import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {AircraftListEntry} from '../../domain/model/aircraft-list-entry';
import {Aircraft} from '../../domain/model/aircraft';
import {IAircraftRepoService} from '../../domain/service/i-aircraft-repo.service';
import {environment} from '../../../../environments/environment';
import {IRestAircraftListResponse} from './i-rest-aircraft-list-response';
import {catchError, map} from 'rxjs/operators';
import {RestAircraftListConverter} from '../converter/rest-aircraft-list-converter';
import {LoggingService} from '../../../system/domain/service/logging/logging.service';
import {IRestAircraftResponse} from './i-rest-aircraft-response';
import {RestAircraftResponseConverter} from '../converter/rest-aircraft-response-converter';
import {RestAircraftConverter} from '../converter/rest-aircraft-converter';
import {HttpHelper} from '../../../system/domain/service/http/http-helper';
import {RestCrudService} from '../../../common/rest/service/rest-crud.service';


@Injectable()
export class RestAircraftRepoService extends RestCrudService<Aircraft, IRestAircraftResponse> implements IAircraftRepoService {
    constructor(http: HttpClient) {
        super(http, environment.aircraftApiBaseUrl, 'aircraft');
    }


    protected convertFromRest(restItem: IRestAircraftResponse): Aircraft {
        return RestAircraftResponseConverter.fromRest(restItem);
    }


    protected convertToRest(aircraft: Aircraft): {aircraft: unknown} {
        return {aircraft: RestAircraftConverter.toRest(aircraft)};
    }


    // region aircraft list

    public readAircraftList(): Observable<AircraftListEntry[]> {
        const url: string = environment.aircraftApiBaseUrl;

        return this.http
            .get<IRestAircraftListResponse>(url, HttpHelper.HTTP_OPTIONS_WITH_CREDENTIALS)
            .pipe(
                map((response) => RestAircraftListConverter.fromRest(response)),
                catchError(err => {
                    LoggingService.logResponseError('ERROR reading aircraft list', err);
                    return throwError(err);
                })
            );
    }

    // endregion


    // region aircraft CRUD

    public readAircraft(aircraftId: number): Observable<Aircraft> {
        return this.read(aircraftId);
    }


    public saveAircraft(aircraft: Aircraft): Observable<Aircraft> {
        return this.save(aircraft, aircraft.id);
    }


    public duplicateAircraft(aircraftId: number): Observable<Aircraft> {
        return this.duplicate(aircraftId);
    }


    public deleteAircraft(aircraftId: number): Observable<boolean> {
        return this.delete(aircraftId);
    }

    // endregion
}
