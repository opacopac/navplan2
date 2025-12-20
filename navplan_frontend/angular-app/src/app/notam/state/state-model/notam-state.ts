import {Extent2d} from '../../../geo-physics/domain/model/geometry/extent2d';
import {Notam} from '../../domain/model/notam';
import {TimestampInterval} from '../../../geo-physics/domain/model/quantities/timestamp-interval';


export interface NotamState {
    extent: Extent2d;
    zoom: number;
    notamList: Notam[];
    lastLoadTimestampMs: number;
    interval: TimestampInterval;
}
