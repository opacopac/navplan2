import {Observable} from 'rxjs';
import {NotamList} from '../domain-model/notam-list';
import {Extent2d} from '../../common/geo-math/domain-model/geometry/extent2d';
import {NotamState} from '../domain-model/notam-state';
import {Position2d} from '../../common/geo-math/domain-model/geometry/position2d';


export abstract class INotamService {
    public abstract readByExtent(extent: Extent2d, zoom: number, state: NotamState): Observable<NotamState>;

    public abstract readByPosition(position: Position2d): Observable<NotamList>;

    public abstract readByIcao(airportIcao: string): Observable<NotamList>;
}
