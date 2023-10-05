import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Observable, of, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {LoggingService} from '../../../system/domain/service/logging/logging.service';
import {Position2d} from '../../../geo-physics/domain/model/geometry/position2d';
import {IMeteoGramService} from '../../domain/service/i-meteo-gram.service';
import {ForecastRun} from '../../../meteo-dwd/domain/model/forecast-run';
import {CloudMeteogram} from '../../domain/model/cloud-meteogram';
import {IRestCloudMeteogram} from '../model/i-rest-cloud-meteogram';
import {RestCloudMeteogramConverter} from '../model/rest-cloud-meteogram-converter';


@Injectable()
export class RestMeteoGramService implements IMeteoGramService {
    constructor(private http: HttpClient) {
    }


    readCloudMeteoGram(forecast: ForecastRun, position: Position2d): Observable<CloudMeteogram> {
        if (!forecast) {
            return of(undefined);
        }

        const url = environment.cloudMeteogramServiceUrl
            + '?forecastrun=' + forecast.getName()
            + '&minstep=' + forecast.model.minStep
            + '&maxstep=' + forecast.model.maxStep
            + '&lon=' + position.longitude
            + '&lat=' + position.latitude;

        return this.http.get<IRestCloudMeteogram>(url).pipe(
            map(response => RestCloudMeteogramConverter.fromRest(response)),
            catchError(error => {
                LoggingService.logResponseError('ERROR reading cloud meteogram!', error);
                return throwError(error);
            }),
        );
    }
}
