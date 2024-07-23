import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {User} from '../../../user/domain/model/user';
import {AircraftListEntry} from '../../domain/model/aircraft-list-entry';
import {Aircraft} from '../../domain/model/aircraft';
import {IAircraftRepoService} from '../../domain/service/i-aircraft-repo.service';
import {environment} from '../../../../environments/environment';
import {IRestAircraftListResponse} from '../model/i-rest-aircraft-list-response';
import {catchError, map} from 'rxjs/operators';
import {RestAircraftListConverter} from '../converter/rest-aircraft-list-converter';
import {LoggingService} from '../../../system/domain/service/logging/logging.service';
import {IRestAircraftResponse} from '../model/i-rest-aircraft-response';
import {RestAircraftResponseConverter} from '../converter/rest-aircraft-response-converter';


@Injectable()
export class RestAircraftRepoService implements IAircraftRepoService {
    constructor(
        private http: HttpClient) {
    }


    // region aircraft list

    public readAircraftList(user: User): Observable<AircraftListEntry[]> {
        const url: string = environment.aircraftServiceUrl + '?token=' + user.token;

        return this.http
            .get<IRestAircraftListResponse>(url, {observe: 'response'})
            .pipe(
                map((response) => RestAircraftListConverter.fromRest(response.body)),
                catchError(err => {
                    LoggingService.logResponseError('ERROR reading aircraft list', err);
                    return throwError(err);
                })
            );
    }

    // endregion


    // region aircraft CRUD

    public readAircraft(aircraftId: number, user: User): Observable<Aircraft> {
        const url = environment.aircraftServiceUrl + '?id=' + aircraftId + '&token=' + user.token;

        return this.http
            .get<IRestAircraftResponse>(url, {observe: 'response'})
            .pipe(
                map((response) => RestAircraftResponseConverter.fromRest(response.body)),
                catchError(err => {
                    LoggingService.logResponseError('ERROR reading aircraft', err);
                    return throwError(err);
                })
            );
    }

    // endregion
}
