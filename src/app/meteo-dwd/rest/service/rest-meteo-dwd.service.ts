import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {IMeteoDwdService} from '../../domain/service/i-meteo-dwd.service';
import {ValueGrid} from '../../domain/model/value-grid';
import {WindInfo} from '../../domain/model/wind-info';
import {Observable, shareReplay, throwError} from 'rxjs';
import {IRestWindInfoGrid} from '../model/i-rest-wind-info-grid';
import {RestWindInfoGridConverter} from '../model/rest-wind-info-grid-converter';
import {catchError, map} from 'rxjs/operators';
import {LoggingService} from '../../../system/domain/service/logging/logging.service';
import {GridDefinition} from '../../domain/model/grid-definition';
import {IRestWeatherInfoGrid} from '../model/i-rest-weather-info-grid';
import {RestWeatherInfoGridConverter} from '../model/rest-weather-info-grid-converter';
import {WeatherInfo} from '../../domain/model/weather-info';
import {ForecastRun} from '../../domain/model/forecast-run';
import {IRestForecastRun} from '../model/i-rest-forecast-run';
import {RestForecastRunConverter} from '../model/rest-forecast-run-converter';
import {StringnumberHelper} from '../../../system/domain/service/stringnumber/stringnumber-helper';


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


    public readWeatherGrid(forecast: ForecastRun, step: number, grid: GridDefinition): Observable<ValueGrid<WeatherInfo>> {
        const url = this.getRestServiceUrl('readWwGrid', forecast, grid, step);

        return this.http.get<IRestWeatherInfoGrid>(url).pipe(
            map(response => RestWeatherInfoGridConverter.fromRest(response)),
            catchError(error => {
                LoggingService.logResponseError('ERROR reading ww grid!', error);
                return throwError(error);
            }),
        );
    }


    public readWindGrid(forecast: ForecastRun, step: number, grid: GridDefinition): Observable<ValueGrid<WindInfo>> {
        const url = this.getRestServiceUrl('readWindGrid', forecast, grid, step);

        return this.http.get<IRestWindInfoGrid>(url).pipe(
            map(response => RestWindInfoGridConverter.fromRest(response)),
            catchError(error => {
                LoggingService.logResponseError('ERROR reading wind speed/dir grid!', error);
                return throwError(error);
            }),
        );
    }


    public getWeatherMapTilesUrl(forecast: ForecastRun, step: number): string {
        const stepStr = this.getStepStrPart(step);
        const fcStr = this.getLatestForecastStrPart(forecast);

        return environment.meteoDwdMapTilesUrl + fcStr + '/' + stepStr + '/clct_precip/{z}/{x}/{y}.png';
    }


    public getWindMapTilesUrl(forecast: ForecastRun, step: number): string {
        const stepStr = this.getStepStrPart(step);
        const fcStr = this.getLatestForecastStrPart(forecast);

        return environment.meteoDwdMapTilesUrl + fcStr + '/' + stepStr + '/wind/{z}/{x}/{y}.png';
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
