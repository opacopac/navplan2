import {Position4d} from '../../geo-physics/domain-model/geometry/position4d';
import {Observable} from 'rxjs';
import {LocationServiceStatus} from '../domain-model/location-service-status';


export abstract class ILocationService {
    public abstract get position$(): Observable<Position4d>;

    public abstract get status$(): Observable<LocationServiceStatus>;

    public abstract get isWatching$(): Observable<boolean>;

    public abstract getSinglePosition(): Observable<Position4d>;

    public abstract startWatching();

    public abstract stopWatching();
}
