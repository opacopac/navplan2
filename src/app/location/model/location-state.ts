import {LocationServiceStatus} from '../services/location/location.service';
import {Position4d} from '../../shared/model/geometry/position4d';
import {Track} from './track';


export interface LocationState {
    status: LocationServiceStatus;
    isWatching: boolean;
    lastPositions: Position4d[];
    startTime: Date;
    interimTime: Date;
    trackList: Track[];
    showTrack: Track;
}
