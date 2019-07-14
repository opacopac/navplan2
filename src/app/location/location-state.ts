import {LocationServiceStatus} from './services/location.service';
import {Position4d} from '../geo-math/domain/geometry/position4d';
import {Track} from '../track/domain/track';


export interface LocationState {
    status: LocationServiceStatus;
    isWatching: boolean;
    lastPositions: Position4d[];
    startTime: Date;
    interimTime: Date;
}
