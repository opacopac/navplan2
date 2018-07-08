import {LocationServiceStatus} from '../services/location/location.service';
import {Position2d} from '../../shared/model/geometry/position2d';


export interface LocationState {
    status: LocationServiceStatus;
    isWatching: boolean;
    currentPosition: Position2d;
    lastPositions: Position2d[];
    startTime: number; // TODO
    interimTime: number; // TODO
}
