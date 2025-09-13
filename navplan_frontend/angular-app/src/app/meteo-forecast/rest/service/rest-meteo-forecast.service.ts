import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {IMeteoForecastService} from '../../domain/service/i-meteo-forecast.service';
import {WindInfo} from '../../domain/model/wind-info';
import {Observable, shareReplay, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {LoggingService} from '../../../system/domain/service/logging/logging.service';
import {GridDefinition} from '../../domain/model/grid-definition';
import {WeatherInfo} from '../../domain/model/weather-info';
import {ForecastRun} from '../../domain/model/forecast-run';
import {IRestForecastRun} from '../model/i-rest-forecast-run';
import {RestForecastRunConverter} from '../model/rest-forecast-run-converter';
import {WeatherModelType} from '../../domain/model/weather-model-type';
import {IRestWindInfo} from '../model/i-rest-wind-info';
import {RestWindInfoConverter} from '../model/rest-wind-info-converter';
import {RestWeatherInfoConverter} from '../model/rest-weather-info-converter';
import {IRestWeatherInfo} from '../model/i-rest-weather-info';
import {RestForecastStepConverter} from '../model/rest-forecast-step-converter';


@Injectable()
export class RestMeteoForecastService implements IMeteoForecastService {
    private availableForecastsCache$: Observable<ForecastRun[]>;


    constructor(private http: HttpClient) {
    }


    public readAvailableForecasts(): Observable<ForecastRun[]> {
        const url = environment.meteoForecastApiBaseUrl;

        // TODO: expire cache
        if (!this.availableForecastsCache$) {
            this.availableForecastsCache$ = this.http.get<IRestForecastRun[]>(url)
                .pipe(
                    map(response => RestForecastRunConverter.fromRestList(response)),
                    shareReplay(1),
                    catchError(error => {
                        LoggingService.logResponseError('ERROR reading available forecast runs!', error);
                        return throwError(error);
                    }),
                );
        }

        return this.availableForecastsCache$;
    }


    public readWeatherGrid(forecast: ForecastRun, step: number, grid: GridDefinition): Observable<WeatherInfo[]> {
        const params = this.getRestServiceParams(grid);
        const url = this.getRestServiceUrl('ww', forecast, step);

        return this.http.get<IRestWeatherInfo[]>(url, {params}).pipe(
            map(response => RestWeatherInfoConverter.fromRestList(response)),
            catchError(error => {
                LoggingService.logResponseError('ERROR reading ww values!', error);
                return throwError(error);
            }),
        );
    }


    public readWindGrid(forecast: ForecastRun, step: number, grid: GridDefinition): Observable<WindInfo[]> {
        const params = this.getRestServiceParams(grid);
        const url = this.getRestServiceUrl('wind', forecast, step);

        return this.http.get<IRestWindInfo[]>(url, {params}).pipe(
            map(response => RestWindInfoConverter.fromRestList(response)),
            catchError(error => {
                LoggingService.logResponseError('ERROR reading wind speed/dir values!', error);
                return throwError(error);
            }),
        );
    }


    public getWeatherMapTilesUrl(forecast: ForecastRun, step: number): string {
        const modelStr = this.getUrlPartByModel(forecast.model.modelType);
        const stepStr = RestForecastStepConverter.toRest(step);
        const fcStr = forecast.getName();

        return environment.meteoForecastMapTilesUrl + modelStr + '/' + fcStr + '/' + stepStr + '/clct_precip/{z}/{x}/{y}.png';
    }


    public getWindMapTilesUrl(forecast: ForecastRun, step: number): string {
        const modelStr = this.getUrlPartByModel(forecast.model.modelType);
        const stepStr = RestForecastStepConverter.toRest(step);
        const fcStr = forecast.getName();

        return environment.meteoForecastMapTilesUrl + modelStr + '/' + fcStr + '/' + stepStr + '/wind/{z}/{x}/{y}.png';
    }


    private getUrlPartByModel(model: WeatherModelType): string {
        switch (model) {
            case WeatherModelType.ICON_D2:
                return 'icon-d2';
            case WeatherModelType.ICON_EU:
                return 'icon-eu';
            case WeatherModelType.ICON:
                return 'icon';
            default:
                throw new Error('unknown model type');
        }
    }


    private getRestServiceUrl(param: string, forecast: ForecastRun, step: number): string {
        return environment.meteoForecastApiBaseUrl
            + '/' + forecast.getName()
            + '/' + RestForecastStepConverter.toRest(step)
            + '/' + param;
    }


    private getRestServiceParams(grid: GridDefinition): HttpParams {
        return new HttpParams()
            .set('width', grid.width.toString())
            .set('height', grid.height.toString())
            .set('minlon', grid.minPos.longitude.toString())
            .set('minlat', grid.minPos.latitude.toString())
            .set('steplon', grid.stepLon.toString())
            .set('steplat', grid.stepLat.toString())
            .set('oddRowOffset', grid.oddRowLonOffset.toString());
    }
}
