import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, shareReplay, throwError} from 'rxjs';
import {IMeteoRadarImageService} from '../../domain/service/i-meteo-radar-image.service';
import {RadarImage} from '../../domain/model/radar-image';
import {environment} from '../../../../environments/environment';
import {catchError, map} from 'rxjs/operators';
import {LoggingService} from '../../../system/domain/service/logging/logging.service';
import {IRestRadarImage} from '../model/i-rest-radar-image';
import {RestRadarImageConverter} from '../model/rest-radar-image-converter';


@Injectable()
export class RestRadarImageService implements IMeteoRadarImageService {
    private availableRadarImagesCache$: Observable<RadarImage[]>;


    constructor(private http: HttpClient) {
    }


    public readAvailableRadarImages(): Observable<RadarImage[]> {
        const url = environment.meteoRadarApiBaseUrl;

        // TODO: expire cache
        if (!this.availableRadarImagesCache$) {
            this.availableRadarImagesCache$ = this.http.get<IRestRadarImage[]>(url)
                .pipe(
                    map(response => RestRadarImageConverter.fromRestList(response)),
                    shareReplay(1),
                    catchError(error => {
                        LoggingService.logResponseError('ERROR reading available radar images!', error);
                        return throwError(error);
                    }),
                );
        }

        return this.availableRadarImagesCache$;
    }

    public getRadarImageMapTilesUrl(radarImage: RadarImage): string {
        const date = radarImage.endTime;
        const timestampStr =
            date.getUTCFullYear().toString() +
            String(date.getUTCMonth() + 1).padStart(2, '0') +
            String(date.getUTCDate()).padStart(2, '0') +
            String(date.getUTCHours()).padStart(2, '0') +
            String(date.getUTCMinutes()).padStart(2, '0');

        return environment.meteoRadarMapTilesUrl + timestampStr + '/{z}/{x}/{y}.png';
    }
}
