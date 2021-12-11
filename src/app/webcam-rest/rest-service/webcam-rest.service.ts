import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {LoggingService} from '../../system/domain-service/logging/logging.service';
import {Extent2d} from '../../common/geo-math/domain-model/geometry/extent2d';
import {Webcam} from '../../webcam/domain-model/webcam';
import {IRestWebcam} from '../rest-model/i-rest-webcam';
import {RestWebcamConverter} from '../rest-model/rest-webcam-converter';
import {IWebcamRepoService} from '../../webcam/domain-service/i-webcam-repo.service';


@Injectable()
export class WebcamRestService implements IWebcamRepoService {
    constructor(private http: HttpClient) {
    }


    public readWebcamsByExtent(extent: Extent2d): Observable<Webcam[]> {
        const url: string = environment.webcamServiceUrl + '?action=getWebcamsByExtent'
            + '&minlon=' + extent.minLon
            + '&minlat=' + extent.minLat
            + '&maxlon=' + extent.maxLon
            + '&maxlat=' + extent.maxLat;

        return this.http
            .get<IRestWebcam[]>(url, {observe: 'response'})
            .pipe(
                map((response) => RestWebcamConverter.fromRestList(response.body)),
                catchError(err => {
                    LoggingService.logResponseError('ERROR reading webcam list by extent', err);
                    return throwError(err);
                })
            );
    }
}