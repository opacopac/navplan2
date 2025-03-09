import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {catchError, map} from 'rxjs/operators';
import {LoggingService} from '../../../system/domain/service/logging/logging.service';
import {IAircraftTypeDesignatorRepoService} from '../../domain/service/i-aircraft-type-designator-repo.service';
import {AircraftTypeDesignator} from '../../domain/model/aircraft-type-designator';
import {IRestAircraftTypeDesignatorListResponse} from './i-rest-aircraft-type-designator-list-response';
import {
    RestAircraftTypeDesignatorListResponseConverter
} from '../converter/rest-aircraft-type-designator-list-response-converter';


@Injectable()
export class RestAircraftTypeDesignatorRepoService implements IAircraftTypeDesignatorRepoService {
    constructor(
        private http: HttpClient) {
    }


    public searchTypeDesignatorByText(searchText: string): Observable<AircraftTypeDesignator[]> {
        const params = new HttpParams().set('query', searchText);
        const url: string = environment.aircraftTypeDesignatorApiBaseUrl;

        return this.http
            .get<IRestAircraftTypeDesignatorListResponse>(url, {params})
            .pipe(
                map((response) => RestAircraftTypeDesignatorListResponseConverter.fromRest(response)),
                catchError(err => {
                    LoggingService.logResponseError('ERROR searching aircraft type designators', err);
                    return throwError(err);
                })
            );
    }
}
