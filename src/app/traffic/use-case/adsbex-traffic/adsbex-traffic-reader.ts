import {Observable} from 'rxjs';
import {IAdsbexTrafficService} from './i-adsbex-traffic-service';
import {TrafficAdsbex} from '../../domain/traffic-adsbex';
import {Extent3d} from '../../../shared/model/geometry/extent3d';


export class AdsbexTrafficReader {
    public constructor(
        private readonly adsbexTrafficService: IAdsbexTrafficService
    ) {
    }


    public read(extent: Extent3d): Observable<TrafficAdsbex[]> {
        return this.adsbexTrafficService.readTraffic(extent);
    }
}
