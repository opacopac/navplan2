import {LocationServiceStatus} from './services/location.service';
import {Position4d} from '../shared/model/geometry/position4d';
import {Track} from '../track/model/track';


export interface LocationState {
    status: LocationServiceStatus;
    isWatching: boolean;
    lastPositions: Position4d[];
    startTime: Date;
    interimTime: Date;
}
