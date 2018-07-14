import {LocationServiceStatus} from '../services/location/location.service';
import {Position4d} from '../../shared/model/geometry/position4d';


export interface LocationState {
    status: LocationServiceStatus;
    isWatching: boolean;
    lastPositions: Position4d[];
    startTime: number; // TODO
    interimTime: number; // TODO
}
