import {Observable} from 'rxjs';
import {Position2d} from '../../common/geo-math/domain-model/geometry/position2d';
import {Extent2d} from '../../common/geo-math/domain-model/geometry/extent2d';
import {Notam} from '../domain-model/notam';


export abstract class INotamService {
    public abstract readByExtent(extent: Extent2d, zoom: number, starttimestamp: number, endtimestamp: number): Observable<Notam[]>;

    public abstract readByPosition(position: Position2d, starttimestamp: number, endtimestamp: number): Observable<Notam[]>;

    public abstract readByIcao(airportIcao: string, starttimestamp: number, endtimestamp: number): Observable<Notam[]>;
}
