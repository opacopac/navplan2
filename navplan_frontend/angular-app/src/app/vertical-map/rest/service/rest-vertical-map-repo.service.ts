import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {catchError, map} from 'rxjs/operators';
import {VerticalMap} from '../../domain/model/vertical-map';
import {RestVerticalMapConverter} from '../model/rest-vertical-map-converter';
import {LoggingService} from '../../../system/domain/service/logging/logging.service';
import {IRestVerticalMapResponse} from '../model/i-rest-vertical-map-response';
import {IVerticalMapRepoService} from '../../domain/service/i-vertical-map-repo.service';
import {ForecastSelection} from '../../../meteo-forecast/domain/model/forecast-selection';
import {RestForecastStepConverter} from '../../../meteo-forecast/rest/model/rest-forecast-step-converter';
import {RestMeteoForecastLayerConverter} from '../../../meteo-forecast/rest/model/rest-meteo-forecast-layer-converter';
import {WeatherModelType} from '../../../meteo-forecast/domain/model/weather-model-type';


@Injectable()
export class RestVerticalMapRepoService implements IVerticalMapRepoService {
    constructor(private http: HttpClient) {
    }


    readVerticalMap(wpPositions: [number, number][], fcSelection: ForecastSelection): Observable<VerticalMap> {
        const requestBody = {
            positions: wpPositions,
            model: fcSelection ? WeatherModelType[fcSelection.forecastRun.model.modelType] : null,
            run: fcSelection ? fcSelection.forecastRun.getName() : null,
            step: fcSelection ? RestForecastStepConverter.toRest(fcSelection.forecastStep) : null,
            layer: fcSelection ? RestMeteoForecastLayerConverter.toRest(fcSelection.layer) : null
        };
        return this.http
            .post<IRestVerticalMapResponse>(
                environment.verticalMapApiBaseUrl,
                requestBody
            )
            .pipe(
                map(response => RestVerticalMapConverter.fromRest(response.verticalMap)),
                catchError(err => {
                    LoggingService.logResponseError('ERROR reading vertical map', err);
                    return throwError(err);
                })
            );
    }
}
