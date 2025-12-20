import {Extent2d} from '../../../geo-physics/domain/model/geometry/extent2d';
import {Notam} from '../../domain/model/notam';


export interface NotamState {
    extent: Extent2d;
    zoom: number;
    notamList: Notam[];
    lastLoadTimestampMs: number;
    minStartTimestamp: number;
    maxEndTimestamp: number;
}
