import {Observable} from 'rxjs';
import {Extent2d} from '../../geo-physics/domain-model/geometry/extent2d';
import {Webcam} from '../domain-model/webcam';


export abstract class IWebcamService {
    public abstract readWebcamsByExtent(extent: Extent2d): Observable<Webcam[]>;
}
