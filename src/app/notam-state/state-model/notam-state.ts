import {Extent2d} from '../../geo-physics/domain-model/geometry/extent2d';
import {Notam} from '../../notam/domain-model/notam';


export interface NotamState {
    extent: Extent2d;
    zoom: number;
    notamList: Notam[];
    timestampMs: number;
}
