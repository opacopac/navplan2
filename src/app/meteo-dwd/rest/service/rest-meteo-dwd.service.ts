import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {IMeteoDwdService} from '../../domain/service/i-meteo-dwd.service';
import {ValueGrid} from '../../domain/model/value-grid';
import {WindInfo} from '../../domain/model/wind-info';
import {Observable, throwError} from 'rxjs';
import {IRestWindInfoGrid} from '../model/i-rest-wind-info-grid';
import {RestWindInfoGridConverter} from '../model/rest-wind-info-grid-converter';
import {catchError, map} from 'rxjs/operators';
import {LoggingService} from '../../../system/domain/service/logging/logging.service';
import {GridDefinition} from '../../domain/model/grid-definition';
import {IRestWeatherInfoGrid} from '../model/i-rest-weather-info-grid';
import {RestWeatherInfoGridConverter} from '../model/rest-weather-info-grid-converter';
import {WeatherInfo} from '../../domain/model/weather-info';


@Injectable()
export class RestMeteoDwdService implements IMeteoDwdService {
    constructor(private http: HttpClient) {
    }


    public readWeatherGrid(grid: GridDefinition, interval: number): Observable<ValueGrid<WeatherInfo>> {
        const url = environment.meteoDwdBaseUrl
            + '?action=readWwGrid'
            + '&width=' + grid.width
            + '&height=' + grid.height
            + '&minlon=' + grid.minPos.longitude
            + '&minlat=' + grid.minPos.latitude
            + '&steplon=' + grid.stepLon
            + '&steplat=' + grid.stepLat
            + '&interval=' + (interval + 2);

        return this.http.get<IRestWeatherInfoGrid>(url)
            .pipe(
                map(response => RestWeatherInfoGridConverter.fromRest(response)),
                catchError(error => {
                    LoggingService.logResponseError('ERROR reading ww grid!', error);
                    return throwError(error);
                }),
            );
    }


    public readWindGrid(grid: GridDefinition, interval: number): Observable<ValueGrid<WindInfo>> {
        const url = environment.meteoDwdBaseUrl
            + '?action=readWindGrid'
            + '&width=' + grid.width
            + '&height=' + grid.height
            + '&minlon=' + grid.minPos.longitude
            + '&minlat=' + grid.minPos.latitude
            + '&steplon=' + grid.stepLon
            + '&steplat=' + grid.stepLat
            + '&interval=' + (interval + 2);

        return this.http.get<IRestWindInfoGrid>(url)
            .pipe(
                map(response => RestWindInfoGridConverter.fromRest(response)),
                catchError(error => {
                    LoggingService.logResponseError('ERROR reading wind speed/dir grid!', error);
                    return throwError(error);
                }),
            );
    }
}
