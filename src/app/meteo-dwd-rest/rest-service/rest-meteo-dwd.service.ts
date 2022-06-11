import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {IMeteoDwdService} from '../../meteo-dwd/domain-service/i-meteo-dwd.service';
import {ValueGrid} from '../../meteo-dwd/domain-model/value-grid';
import {WindSpeedDir} from '../../meteo-dwd/domain-model/wind-speed-dir';
import {Observable, throwError} from 'rxjs';
import {IRestWindSpeedDirGrid} from '../rest-model/i-rest-value-grid';
import {RestWindSpeedDirGridConverter} from '../rest-model/rest-wind-speed-dir-grid-converter';
import {catchError, map} from 'rxjs/operators';
import {LoggingService} from '../../system/domain-service/logging/logging.service';
import {GridDefinition} from '../../meteo-dwd/domain-model/grid-definition';


@Injectable()
export class RestMeteoDwdService implements IMeteoDwdService {
    constructor(private http: HttpClient) {
    }


    public readWindGrid(grid: GridDefinition): Observable<ValueGrid<WindSpeedDir>> {
        const url = environment.meteoDwdBaseUrl
            + '?action=readWindGrid'
            + '&width=' + grid.width
            + '&height=' + grid.height
            + '&minlon=' + grid.minPos.longitude
            + '&minlat=' + grid.minPos.latitude
            + '&steplon=' + grid.stepLon
            + '&steplat=' + grid.stepLat;

        return this.http.get<IRestWindSpeedDirGrid>(url)
            .pipe(
                map(response => RestWindSpeedDirGridConverter.fromRest(response)),
                catchError(error => {
                    LoggingService.logResponseError('ERROR reading wind speed/dir grid!', error);
                    return throwError(error);
                }),
            );
    }
}
