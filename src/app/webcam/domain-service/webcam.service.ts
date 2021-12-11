import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Extent2d} from '../../common/geo-math/domain-model/geometry/extent2d';
import {IWebcamService} from './i-webcam-service';
import {IWebcamRepo} from './i-webcam-repo';
import {Webcam} from '../domain-model/webcam';


@Injectable()
export class WebcamService implements IWebcamService {
    constructor(private webcamRepo: IWebcamRepo) {
    }


    public readWebcamsByExtent(extent: Extent2d): Observable<Webcam[]> {
        return this.webcamRepo.readWebcamsByExtent(extent);
    }
}
