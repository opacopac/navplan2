import {Position4d} from '../../../geo-physics/domain/model/geometry/position4d';
import {LocationServiceStatus} from '../../location-domain/model/location-service-status';


export interface LocationState {
    status: LocationServiceStatus;
    isWatching: boolean;
    lastPositions: Position4d[];
    startTime: Date;
    interimTime: Date;
}
