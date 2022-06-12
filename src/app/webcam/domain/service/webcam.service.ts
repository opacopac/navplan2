import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Extent2d} from '../../../geo-physics/domain/model/geometry/extent2d';
import {IWebcamService} from './i-webcam.service';
import {IWebcamRepoService} from './i-webcam-repo.service';
import {Webcam} from '../model/webcam';


@Injectable()
export class WebcamService implements IWebcamService {
    constructor(private webcamRepo: IWebcamRepoService) {
    }


    public readWebcamsByExtent(extent: Extent2d): Observable<Webcam[]> {
        return this.webcamRepo.readWebcamsByExtent(extent);
    }
}
