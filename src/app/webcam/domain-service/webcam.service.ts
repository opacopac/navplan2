import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Extent2d} from '../../common/geo-math/domain-model/geometry/extent2d';
import {RestWebcamService} from '../rest-service/rest-webcam.service';
import {map} from 'rxjs/operators';
import {WebcamState} from '../domain-model/webcam-state';


@Injectable()
export class WebcamService {
    private readonly WEBCAM_MIN_ZOOM = 10;


    constructor(private restWebcamService: RestWebcamService) {
    }


    public readWebcamsByExtent(extent: Extent2d, zoom: number): Observable<WebcamState> {
        if (zoom < this.WEBCAM_MIN_ZOOM) {
            return of({ extent: extent, zoom: zoom, webcams: [] });
        }


        return this.restWebcamService.readWebcamsByExtent(extent).pipe(
            map(webcams => ({
                extent: extent,
                zoom: zoom,
                webcams: webcams,
            }))
        );
    }


    public isWebcamReloadRequired(
        requestedState: { extent: Extent2d, zoom: number },
        currentState: { extent: Extent2d, zoom: number }
    ): boolean {
        return !currentState.extent || !requestedState.extent ||
            !currentState.extent.containsExtent2d(requestedState.extent) ||
            (currentState.zoom < this.WEBCAM_MIN_ZOOM && requestedState.zoom >= this.WEBCAM_MIN_ZOOM);
    }
}
