import {Observable} from 'rxjs';
import {Position2d} from '../../../geo-physics/domain/model/geometry/position2d';
import {Extent2d} from '../../../geo-physics/domain/model/geometry/extent2d';
import {Notam} from '../model/notam';
import {TimestampInterval} from '../../../geo-physics/domain/model/quantities/timestamp-interval';


export abstract class INotamService {
    public abstract readByExtent(extent: Extent2d, zoom: number, interval: TimestampInterval): Observable<Notam[]>;

    public abstract readByPosition(position: Position2d, interval: TimestampInterval): Observable<Notam[]>;

    public abstract readByIcao(airportIcao: string, interval: TimestampInterval): Observable<Notam[]>;
}
