import {Extent2d} from '../../common/geo-math/domain-model/geometry/extent2d';
import {Observable} from 'rxjs';
import {Navaid} from '../domain-model/navaid';
import {Injectable} from '@angular/core';


@Injectable()
export abstract class NavaidService {
    public abstract readNavaidsByExtent(extent: Extent2d, zoom: number): Observable<Navaid[]>;
}
