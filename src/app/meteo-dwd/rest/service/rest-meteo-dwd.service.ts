import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {IMeteoDwdService} from '../../domain/service/i-meteo-dwd.service';
import {WindInfo} from '../../domain/model/wind-info';
import {Observable, shareReplay, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {LoggingService} from '../../../system/domain/service/logging/logging.service';
import {GridDefinition} from '../../domain/model/grid-definition';
import {WeatherInfo} from '../../domain/model/weather-info';
import {ForecastRun} from '../../domain/model/forecast-run';
import {IRestForecastRun} from '../model/i-rest-forecast-run';
import {RestForecastRunConverter} from '../model/rest-forecast-run-converter';
import {StringnumberHelper} from '../../../system/domain/service/stringnumber/stringnumber-helper';
import {WeatherModelType} from '../../domain/model/weather-model-type';
import {IRestWindInfo} from '../model/i-rest-wind-info';
import {RestWindInfoConverter} from '../model/rest-wind-info-converter';
import {RestWeatherInfoConverter} from '../model/rest-weather-info-converter';
import {IRestWeatherInfo} from '../model/i-rest-weather-info';


@Injectable()
export class RestMeteoDwdService implements IMeteoDwdService {
    private availableForecastsCache$: Observable<ForecastRun[]>;


    constructor(private http: HttpClient) {
    }


    public readAvailableForecasts(): Observable<ForecastRun[]> {
        const url = environment.meteoDwdServiceUrl
            + '?action=readAvailableForecasts';

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
        const url = this.getRestServiceUrl('readWwValues', forecast, grid, step);

        return this.http.get<IRestWeatherInfo[]>(url).pipe(
            map(response => RestWeatherInfoConverter.fromRestList(response)),
            catchError(error => {
                LoggingService.logResponseError('ERROR reading ww values!', error);
                return throwError(error);
            }),
        );
    }


    public readWindGrid(forecast: ForecastRun, step: number, grid: GridDefinition): Observable<WindInfo[]> {
        const url = this.getRestServiceUrl('readWindValues', forecast, grid, step);

        return this.http.get<IRestWindInfo[]>(url).pipe(
            map(response => RestWindInfoConverter.fromRestList(response)),
            catchError(error => {
                LoggingService.logResponseError('ERROR reading wind speed/dir values!', error);
                return throwError(error);
            }),
        );
    }


    public getWeatherMapTilesUrl(forecast: ForecastRun, step: number): string {
        const modelStr = this.getUrlPartByModel(forecast.model.modelType);
        const stepStr = this.getStepStrPart(step);
        const fcStr = this.getLatestForecastStrPart(forecast);

        return environment.meteoDwdMapTilesUrl + modelStr + '/' + fcStr + '/' + stepStr + '/clct_precip/{z}/{x}/{y}.png';
    }


    public getWindMapTilesUrl(forecast: ForecastRun, step: number): string {
        const modelStr = this.getUrlPartByModel(forecast.model.modelType);
        const stepStr = this.getStepStrPart(step);
        const fcStr = this.getLatestForecastStrPart(forecast);

        return environment.meteoDwdMapTilesUrl + modelStr + '/' + fcStr + '/' + stepStr + '/wind/{z}/{x}/{y}.png';
    }


    private getUrlPartByModel(model: WeatherModelType): string {
        switch (model) {
            case WeatherModelType.ICON_D2: return 'icon-d2';
            case WeatherModelType.ICON_EU: return 'icon-eu';
            case WeatherModelType.ICON: return 'icon';
            default: throw new Error('unknown model type');
        }
    }


    private getRestServiceUrl(action: string, forecast: ForecastRun, grid: GridDefinition, step: number): string {
        return environment.meteoDwdServiceUrl
            + '?action=' + action
            + '&width=' + grid.width
            + '&height=' + grid.height
            + '&minlon=' + grid.minPos.longitude
            + '&minlat=' + grid.minPos.latitude
            + '&steplon=' + grid.stepLon
            + '&steplat=' + grid.stepLat
            + '&step=' + this.getStepStrPart(step)
            + '&run=' + this.getLatestForecastStrPart(forecast);
    }


    private getLatestForecastStrPart(forecast: ForecastRun): string {
        return forecast.startTime.getUTCFullYear()
            + StringnumberHelper.zeroPad(forecast.startTime.getUTCMonth() + 1, 2)
            + StringnumberHelper.zeroPad(forecast.startTime.getUTCDate(), 2)
            + StringnumberHelper.zeroPad(forecast.startTime.getUTCHours(), 2);
    }


    private getStepStrPart(step: number): string {
        return StringnumberHelper.zeroPad(step, 3);
    }
}
