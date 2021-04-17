import {LocationServiceStatus} from './domain-service/location.service';
import {Position4d} from '../geo-math/domain-model/geometry/position4d';


export interface LocationState {
    status: LocationServiceStatus;
    isWatching: boolean;
    lastPositions: Position4d[];
    startTime: Date;
    interimTime: Date;
}
