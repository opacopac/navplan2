import {Observable} from 'rxjs';
import {IOpenskyTrafficService} from './i-opensky-traffic-service';
import {TrafficOpensky} from '../../domain/traffic-opensky';
import {Extent3d} from '../../../shared/model/geometry/extent3d';


export class OpenskyTrafficReader {
    public constructor(
        private readonly openskyTrafficService: IOpenskyTrafficService
    ) {
    }


    public read(extent: Extent3d): Observable<TrafficOpensky[]> {
        return this.openskyTrafficService.readTraffic(extent);
    }
}
